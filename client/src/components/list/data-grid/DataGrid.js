import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Checkbox, Pagination, Dropdown, Button, Icon } from 'semantic-ui-react';
import { fetchDataRequest, setReloadDataTrigger, setSelectAllTrigger, toggleListItemSelect, setCurrentPage, setItemsPerPage, setTotalItems, setListItemsIds, changeSortState } from '../../../store/actions';
import { transformDataSet } from '../../../util';
import InputForm from '../../input-form';
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
            }
        }
        if (prevProps.admin.lists[this.props.admin.ui.currentModel].ids.length !== this.props.admin.lists[this.props.admin.ui.currentModel].ids.length) {
            this.props.onSetTotalItemsHandler(this.props.admin.ui.currentModel, this.props.admin.lists[this.props.admin.ui.currentModel].ids.length);
        }
        if (prevProps.admin.lists[this.props.admin.ui.currentModel].params.sort !== this.props.admin.lists[this.props.admin.ui.currentModel].params.sort) {
            this.props.onSetListItemsIdsHandler(
                this.props.admin.ui.currentModel,
                transformDataSet(
                    this.props.admin.ui.currentModel,
                    this.props.forms, 
                    this.props.admin.models, 
                    this.props.admin.lists[this.props.admin.ui.currentModel].params.sort
                ).map(item => item.id)
            );
        }
    }

    onRefreshDataListHandler = () => {
        for (const key in this.props.forms[this.props.admin.ui.currentModel]) {
            if (this.props.forms[this.props.admin.ui.currentModel][key].config.source) {
                this.props.forms[this.props.admin.ui.currentModel][key].config.source.forEach(src => {
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

    render() {
        let headerFields = [], bodyRows = [];
        let dataSet = transformDataSet(this.props.admin.ui.currentModel, this.props.forms, this.props.admin.models);
        let totalPages = 0;
        let itemsPerPage = this.props.admin.lists[this.props.admin.ui.currentModel].params.pagination.itemsPerPage;
        let totalItems = this.props.admin.lists[this.props.admin.ui.currentModel].params.pagination.totalItems;
        let currentPage = this.props.admin.lists[this.props.admin.ui.currentModel].params.pagination.currentPage;
        let startIndex, endIndex;

        this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.forEach(({ name, alias, sortable }) => {
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
            />
        );

        if (this.props.admin.ui.reloadDataCounter === 0) {
            totalPages = Math.ceil(totalItems/itemsPerPage);
            this.props.admin.lists[this.props.admin.ui.currentModel].ids.forEach((id, index) => {
                endIndex = itemsPerPage * currentPage - 1;
                startIndex = endIndex - itemsPerPage + 1;
                if (index >= startIndex && index <= endIndex) {
                    bodyRows.push(
                        <Table.Row 
                            key={id}
                            disabled={dataSet.filter(item => item.id === id)[0].deleted_at !== null}
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
                            {this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.map(({ name, alias }) => {
                                let fieldValue = dataSet.filter(item => item.id === id)[0][name];
                                return (
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
                                textAlign='right'
                            >
                                <InputForm 
                                    trigger={
                                        (props) =>
                                            <Button
                                                as='a'
                                                basic
                                                {...props}
                                             >
                                                 <Icon name='pencil' color={dataSet.filter(item => item.id === id)[0].deleted_at !== null ? null : 'blue'} /> Edit
                                            </Button>
                                    }
                                    refreshAfterClose
                                    model={this.props.admin.ui.currentModel}
                                    mobile={this.props.global.ui.mobile}
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
                            colSpan={this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.length + 2}
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
                            {totalItems > 0 ? <span>{startIndex + 1}-{endIndex + 1 > totalItems ? totalItems : endIndex + 1} of {totalItems}</span> : null}
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
        forms: state.forms,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataHandler: (accessToken, model) => dispatch(fetchDataRequest(accessToken, model)),
        onSetReloadDataTriggerHandler: (model, flag) => dispatch(setReloadDataTrigger(model, flag)),
        onSetSelectAllTriggerHandler: (model, checked) => dispatch(setSelectAllTrigger(model, checked)),
        onToggleListItemSelectHandler: (model, checked, id) => dispatch(toggleListItemSelect(model, checked, id)),
        onSetCurrentPageHandler: (model, activePage) => dispatch(setCurrentPage(model, activePage)),
        onSetItemsPerPageHandler: (model, value) => dispatch(setItemsPerPage(model, value)),
        onSetTotalItemsHandler: (model, total) => dispatch(setTotalItems(model, total)),
        onSetListItemsIdsHandler: (model, ids) => dispatch(setListItemsIds(model, ids)),
        onChangeSortStateHandler: (model, target, order, reverse) => dispatch(changeSortState(model, target, order, reverse))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);