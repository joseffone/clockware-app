import React, {Component} from 'react';
import {Table, Checkbox, Button, Icon} from 'semantic-ui-react';
import AdminForm from '../admin-form';
import FieldsCustomizer from './fields-customizer';
import Pagination from '../pagination';
import {connect} from 'react-redux';
import {adminActionCreator} from '../../store/actions';
import {transformDataSet, applyParams} from '../../util';
import styles from './styles.module.css';

class AdminDataGrid extends Component {

    tableRef = React.createRef();

    componentDidMount () {
        let promise = new Promise(handle => handle());
        promise.then(() => this.props.setReloadDataTrigger(this.props.admin.ui.currentModel, false));
        promise.then(() => this.props.setReloadDataTrigger(this.props.admin.ui.currentModel, true));
    }

    componentDidUpdate (prevProps) {
        if (this.props.admin.ui.reloadDataTrigger) {
            if (prevProps.admin.ui.reloadDataTrigger !== this.props.admin.ui.reloadDataTrigger) {
                this.tableRef.current.scrollIntoView({inline: 'start', block: 'center'});
                return this.onReloadDataHandler();
            }
            if (this.props.admin.ui.fetchRequestsCounter.length === 0) {
                this.props.setTotalItems(this.props.admin.ui.currentModel, this.props.admin.lists[this.props.admin.ui.currentModel].ids.length);
                this.props.setListData(this.props.admin.ui.currentModel, transformDataSet(this.props.admin.ui.currentModel, this.props.admin.forms, this.props.admin.models));
                if (this.props.admin.lists[this.props.admin.ui.currentModel].params.search.value !== '') {
                    this.onSearchApplyHandler();
                }
                if (this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.target ||
                    this.props.admin.lists[this.props.admin.ui.currentModel].params.filters.length > 0) {
                    new Promise(handle => handle()).then(() => {
                        this.onFiltersApplyHandler();
                        this.tableRef.current.scrollIntoView({block: 'end'});
                    });
                }
                this.props.setReloadDataTrigger(this.props.admin.ui.currentModel, false);
                this.tableRef.current.scrollIntoView({block: 'end'});
            }
        }
        if (prevProps.admin.lists[this.props.admin.ui.currentModel].ids.length !== this.props.admin.lists[this.props.admin.ui.currentModel].ids.length) {
            this.props.setTotalItems(this.props.admin.ui.currentModel, this.props.admin.lists[this.props.admin.ui.currentModel].ids.length);
        }
        if (prevProps.admin.lists[this.props.admin.ui.currentModel].params.sort !== this.props.admin.lists[this.props.admin.ui.currentModel].params.sort ||
            prevProps.admin.lists[this.props.admin.ui.currentModel].params.filters !== this.props.admin.lists[this.props.admin.ui.currentModel].params.filters) {
            this.onFiltersApplyHandler();
        }
        if (this.props.admin.lists[this.props.admin.ui.currentModel].dataSet.length !== this.props.admin.models[this.props.admin.ui.currentModel].items.length) {
            this.props.setListData(this.props.admin.ui.currentModel, transformDataSet(this.props.admin.ui.currentModel, this.props.admin.forms, this.props.admin.models));
        }
    }

    onReloadDataHandler = () => {
        for (const key in this.props.admin.forms[this.props.admin.ui.currentModel]) {
            if (this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source) {
                this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source.forEach(src => {
                    this.props.fetchData(this.props.auth.accessToken, src);
                });
            }
        }
        this.props.fetchData(this.props.auth.accessToken, this.props.admin.ui.currentModel);
    }

    onHeaderColumnClickHandler = (clickedColumnName) => {
        if (clickedColumnName !== this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.target) {
            return this.props.changeSortState(this.props.admin.ui.currentModel, clickedColumnName, 'ascending', false);
        }
        return this.props.changeSortState(
            this.props.admin.ui.currentModel,
            clickedColumnName,
            this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.order === 'ascending' ? 'descending' : 'ascending',
            this.props.admin.lists[this.props.admin.ui.currentModel].params.sort.reverse === false ? true : false
        );
    }

    onFiltersApplyHandler = () => {
        this.props.setListItemsIds(
            this.props.admin.ui.currentModel,
            applyParams(
                this.props.admin.lists[this.props.admin.ui.currentModel].dataSet,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters
            ).map(item => item.id)
        );
    }

    onSearchApplyHandler = () => {
        this.props.searchData(
            this.props.admin.ui.currentModel, 
            this.props.admin.lists[this.props.admin.ui.currentModel].params.search.value, 
            () => applyParams(
                this.props.admin.lists[this.props.admin.ui.currentModel].dataSet,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters
            )
        );
    }

    onCustomFieldsApplyHandler = (fields) => {
        this.props.setCustomFields(this.props.admin.ui.currentModel, fields);
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
                    onChange={(event, {checked}) => this.props.toggleAllItemsSelect(this.props.admin.ui.currentModel, checked)} 
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
                    onApply={this.onCustomFieldsApplyHandler}
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
                                    onChange={(event, {checked}) => this.props.toggleItemSelect(this.props.admin.ui.currentModel, event.target.id, checked)}
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
            <div ref={this.tableRef}>
                <Table
                    stackable
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
                                <Pagination 
                                    mobile={this.props.global.ui.mobile}
                                    totalItems={totalItems}
                                    startIndex={startIndex}
                                    endIndex={endIndex}
                                    itemsPerPage={itemsPerPage}
                                    itemsPerPageOptions={this.props.admin.ui.itemsPerPageOptions}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onItemsPerPageChange={(event, { value }) => this.props.setItemsPerPage(this.props.admin.ui.currentModel, value)}
                                    onCurrentPageChange={(event, { activePage }) => this.props.setCurrentPage(this.props.admin.ui.currentModel, activePage)}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
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
        fetchData: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model)),
        setReloadDataTrigger: (model, flag) => dispatch(adminActionCreator.setReloadDataTrigger(model, flag)),
        toggleAllItemsSelect: (model, checked) => dispatch(adminActionCreator.toggleAllItemsSelect(model, checked)),
        toggleItemSelect: (model, id, checked) => dispatch(adminActionCreator.toggleItemSelect(model, id, checked)),
        setCurrentPage: (model, activePage) => dispatch(adminActionCreator.setCurrentPage(model, activePage)),
        setItemsPerPage: (model, value) => dispatch(adminActionCreator.setItemsPerPage(model, value)),
        setTotalItems: (model, total) => dispatch(adminActionCreator.setTotalItems(model, total)),
        setListItemsIds: (model, ids) => dispatch(adminActionCreator.setListItemsIds(model, ids)),
        setListData: (model, dataSet) => dispatch(adminActionCreator.setListData(model, dataSet)),
        changeSortState: (model, target, order, reverse) => dispatch(adminActionCreator.changeSortState(model, target, order, reverse)),
        searchData: (model, text, dataSet, key) => dispatch(adminActionCreator.searchDataRequest(model, text, dataSet, key)),
        setCustomFields: (model, fields) => dispatch(adminActionCreator.setCustomFields(model, fields))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDataGrid);