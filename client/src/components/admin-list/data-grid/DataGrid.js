import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Checkbox, Pagination, Dropdown, Button, Icon} from 'semantic-ui-react';
import {adminActionCreator} from '../../../store/actions';
import {transformDataSet} from '../../../util';
import AdminForm from '../../admin-form';
import FieldsCustomizer from './fields-customizer';
import styles from './styles.module.css';

class DataGrid extends Component {

    componentDidMount () {
        this.onRefreshDataListHandler();
    }

    componentDidUpdate (prevProps) {
        if (this.props.admin.ui.reloadDataTrigger) {
            if (prevProps.admin.ui.reloadDataTrigger !== this.props.admin.ui.reloadDataTrigger) {
                return this.onRefreshDataListHandler();
            }
            if (this.props.admin.ui.reloadDataCounter === 0) {
                this.props.onSetReloadDataTriggerHandler(this.props.admin.ui.currentModel, false);
                this.props.onSetTotalItemsHandler(this.props.admin.ui.currentModel, this.props.admin.lists[this.props.admin.ui.currentModel].ids.length);
                this.props.onSetListDataHandler(this.props.admin.ui.currentModel, transformDataSet(this.props.admin.ui.currentModel, this.props.admin.forms, this.props.admin.models));
                if (this.props.admin.lists[this.props.admin.ui.currentModel].params.search.value !== '') {
                    this.onSearchApplyHandler();
                }
                if (this.props.admin.lists[this.props.admin.ui.currentModel].params.filters.length !== 0) {
                    this.onFiltersApplyHandler();
                }
            }
        }
        if (prevProps.admin.lists[this.props.admin.ui.currentModel].ids.length !== this.props.admin.lists[this.props.admin.ui.currentModel].ids.length) {
            this.props.onSetTotalItemsHandler(this.props.admin.ui.currentModel, this.props.admin.lists[this.props.admin.ui.currentModel].ids.length);
        }
        if (prevProps.admin.lists[this.props.admin.ui.currentModel].params.sort !== this.props.admin.lists[this.props.admin.ui.currentModel].params.sort ||
            prevProps.admin.lists[this.props.admin.ui.currentModel].params.filters !== this.props.admin.lists[this.props.admin.ui.currentModel].params.filters) {
            this.onFiltersApplyHandler();
        }
        if (this.props.admin.lists[this.props.admin.ui.currentModel].dataSet.length !== this.props.admin.models[this.props.admin.ui.currentModel].items.length) {
            this.props.onSetListDataHandler(this.props.admin.ui.currentModel, transformDataSet(this.props.admin.ui.currentModel, this.props.admin.forms, this.props.admin.models));
        }
    }

    onRefreshDataListHandler = () => {
        for (const key in this.props.admin.forms[this.props.admin.ui.currentModel]) {
            if (this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source) {
                this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source.forEach(src => {
                    this.props.onFetchDataHandler(this.props.auth.accessToken, src);
                });
            }
        }
        this.props.onFetchDataHandler(this.props.auth.accessToken, this.props.admin.ui.currentModel);
    }

    onHeaderColumnClickHandler = (clickedColumnName) => {
        if (clickedColumnName !== this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.target) {
            return this.props.onChangeSortStateHandler(this.props.admin.ui.currentModel, clickedColumnName, 'ascending', false);
        }
        return this.props.onChangeSortStateHandler(
            this.props.admin.ui.currentModel,
            clickedColumnName,
            this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.order === 'ascending' ? 'descending' : 'ascending',
            this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.reverse === false ? true : false
        );
    }

    onFiltersApplyHandler = () => {
        this.props.onSetListItemsIdsHandler(
            this.props.admin.ui.currentModel,
            transformDataSet(
                this.props.admin.ui.currentModel,
                this.props.admin.forms, 
                this.props.admin.models, 
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters
            ).map(item => item.id)
        );
    }

    onSearchApplyHandler = () => {
        this.props.onSearchDataRequestHandler(
            this.props.admin.ui.currentModel, 
            this.props.admin.lists[this.props.admin.ui.currentModel].params.search.value, 
            () => transformDataSet(
                this.props.admin.ui.currentModel, 
                this.props.admin.forms, 
                this.props.admin.models, 
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters
            )
        );
    }

    onCustomFieldsApplyHandler = (fields) => {
        this.props.onSetCustomFieldsHandler(this.props.admin.ui.currentModel, fields);
    }

    render() {
        let headerFields = [], bodyRows = [];
        let dataSet = this.props.admin.lists[this.props.admin.ui.currentModel].dataSet;
        let totalPages = 0;
        let itemsPerPage = this.props.admin.lists[this.props.admin.ui.currentModel].params.pagination.itemsPerPage;
        let totalItems = this.props.admin.lists[this.props.admin.ui.currentModel].params.pagination.totalItems;
        let currentPage = this.props.admin.lists[this.props.admin.ui.currentModel].params.pagination.currentPage;
        let endIndex = itemsPerPage * currentPage - 1;
        let startIndex = endIndex - itemsPerPage + 1;

        this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.forEach(({name, alias, visible, sortable}) => {
            if (visible) {
                headerFields.push(
                    <Table.HeaderCell
                        key={name} 
                        disabled={!sortable}
                        sorted={name === this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.target ? this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.order : null}
                        onClick={(event) => sortable ? this.onHeaderColumnClickHandler(name) : event.preventDefault()}
                    >
                        {alias}
                    </Table.HeaderCell>
                );
            }
        });

        headerFields.unshift(
            <Table.HeaderCell
                key={'select'}
                collapsing
                textAlign='right'
            >
                <Checkbox 
                    checked={this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.length === this.props.admin.lists[this.props.admin.ui.currentModel].ids.length} 
                    onChange={(event, { checked }) => this.props.onSetSelectAllTriggerHandler(this.props.admin.ui.currentModel, checked)} 
                />
            </Table.HeaderCell>
        );
        
        headerFields.push(
            <Table.HeaderCell 
                key={'edit'} 
                disabled={true}
                textAlign={this.props.global.ui.mobile ? 'right' : 'center'}
            >
                <FieldsCustomizer 
                    trigger={
                        (props) =>
                            <Button
                                as='a'
                                basic
                                {...props}
                            >
                                <Icon name='setting' />
                                Fields
                            </Button>
                    }
                    mobile={this.props.global.ui.mobile}
                    fields={this.props.admin.lists[this.props.admin.ui.currentModel].params.fields}
                    applied={this.onCustomFieldsApplyHandler}
                />
            </Table.HeaderCell>
        );

        if (dataSet.length > 0) {
            totalPages = Math.ceil(totalItems/itemsPerPage);
            this.props.admin.lists[this.props.admin.ui.currentModel].ids.forEach((id, index) => {
                let dataSetItem = dataSet.filter(item => item.id === id)[0];
                if (index >= startIndex && index <= endIndex && dataSetItem) {
                    bodyRows.push(
                        <Table.Row 
                            key={id}
                            disabled={dataSetItem.deleted_at !== null}
                        >
                            <Table.Cell 
                                collapsing
                                textAlign='right'
                            >
                                <Checkbox 
                                    id={id}
                                    checked={this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.filter(selectedId => selectedId === id).length === 1}
                                    onChange={(event, { checked}) => this.props.onToggleListItemSelectHandler(this.props.admin.ui.currentModel, checked, event.target.id)}
                                />
                            </Table.Cell>
                            {this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.map(({name, alias, visible}) => {
                                let fieldValue = dataSetItem[name];
                                return visible && (
                                    <Table.Cell
                                        key={id + name}
                                        error={fieldValue === false}
                                        >
                                        {this.props.global.ui.mobile ? `${alias}: ` : null}
                                        {this.props.global.ui.mobile ? <i>{fieldValue === false ? 'Cannot pull data' : fieldValue}</i> : fieldValue === false ? 'Cannot pull data' : fieldValue}
                                    </Table.Cell>
                                );
                            })}
                            <Table.Cell 
                                collapsing 
                                textAlign={this.props.global.ui.mobile ? 'right' : 'center'}
                            >
                                <AdminForm 
                                    trigger={
                                        (props) =>
                                            <Button
                                                as='a'
                                                basic
                                                {...props}
                                             >
                                                 <Icon name='pencil' color={dataSetItem.deleted_at !== null ? null : 'blue'} /> Edit
                                            </Button>
                                    }
                                    refreshAfterClose
                                    model={this.props.admin.ui.currentModel}
                                    update={{...this.props.admin.models[this.props.admin.ui.currentModel].items.filter(item => item.id === id)[0]}}
                                />
                                
                            </Table.Cell>
                        </Table.Row>
                    );
                }
            });
        }
 
        return (
            <Table
                selectable
                sortable
                className={styles.dataGrid}
            >
                <Table.Header>
                    <Table.Row>{headerFields}</Table.Row>
                </Table.Header>
                <Table.Body>
                    {bodyRows}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell 
                            colSpan={this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.filter(({visible}) => visible).length + 2}
                        >   
                            {this.props.global.ui.mobile ? null : <span>Rows per page:</span>}
                            {this.props.global.ui.mobile ? null :
                                <Dropdown
                                    options={this.props.admin.ui.itemsPerPageOptions}
                                    defaultValue={itemsPerPage}
                                    text={'' + itemsPerPage}
                                    inline
                                    onChange={(event, { value }) => this.props.onSetItemsPerPageHandler(this.props.admin.ui.currentModel, value)}
                                />
                            }
                            {totalItems > 0 ? <span>{startIndex + 1}-{endIndex + 1 > totalItems ? totalItems : endIndex + 1} of {totalItems}</span> : <span>0-0 of 0</span>}
                            <Pagination
                                totalPages={totalPages}
                                activePage={currentPage}
                                pageItem={this.props.global.ui.mobile ? null : undefined}
                                ellipsisItem={this.props.global.ui.mobile ? null : undefined}
                                firstItem={totalPages > 2 ? this.props.global.ui.mobile ? null : undefined : null}
                                lastItem={totalPages > 2 ? this.props.global.ui.mobile ? null : undefined : null}
                                boundaryRange={1}
                                siblingRange={1}
                                floated='right'
                                onPageChange={(event, { activePage }) => this.props.onSetCurrentPageHandler(this.props.admin.ui.currentModel, activePage)}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        auth: state.auth,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataHandler: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model)),
        onSetReloadDataTriggerHandler: (model, flag) => dispatch(adminActionCreator.setReloadDataTrigger(model, flag)),
        onSetSelectAllTriggerHandler: (model, checked) => dispatch(adminActionCreator.setSelectAllTrigger(model, checked)),
        onToggleListItemSelectHandler: (model, checked, id) => dispatch(adminActionCreator.toggleListItemSelect(model, checked, id)),
        onSetCurrentPageHandler: (model, activePage) => dispatch(adminActionCreator.setCurrentPage(model, activePage)),
        onSetItemsPerPageHandler: (model, value) => dispatch(adminActionCreator.setItemsPerPage(model, value)),
        onSetTotalItemsHandler: (model, total) => dispatch(adminActionCreator.setTotalItems(model, total)),
        onSetListItemsIdsHandler: (model, ids) => dispatch(adminActionCreator.setListItemsIds(model, ids)),
        onSetListDataHandler: (model, dataSet) => dispatch(adminActionCreator.setListData(model, dataSet)),
        onChangeSortStateHandler: (model, target, order, reverse) => dispatch(adminActionCreator.changeSortState(model, target, order, reverse)),
        onSearchDataRequestHandler: (model, text, dataSet, key) => dispatch(adminActionCreator.searchDataRequest(model, text, dataSet, key)),
        onSetCustomFieldsHandler: (model, fields) => dispatch(adminActionCreator.setCustomFields(model, fields))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);