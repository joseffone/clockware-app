import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Checkbox, Pagination, Dropdown } from 'semantic-ui-react';
import { fetchDataRequest, setReloadDataTrigger, setSelectAllTrigger, toggleListItemSelect, setCurrentPage, setItemsPerPage, setTotalItems } from '../../../store/actions';
import { transformDataList } from '../../../util';

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

    render() {
        let headerFields = [], bodyRows = [];
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
                    //sorted={sortable ? 'ascending' : null}
                    style={{ borderLeft: 0, borderRight: 0 }}
                    onClick={null}
                >
                    {alias}
                </Table.HeaderCell>
            );
        });

        headerFields.unshift(
            <Table.HeaderCell>
                <Checkbox 
                    checked={this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.length === this.props.admin.lists[this.props.admin.ui.currentModel].ids.length} 
                    onChange={(e, { checked }) => this.props.onSetSelectAllTriggerHandler(this.props.admin.ui.currentModel, checked)} 
                />
            </Table.HeaderCell>
        );

        if (this.props.admin.ui.reloadDataCounter === 0) {
            totalPages = Math.ceil(totalItems/itemsPerPage);
            this.props.admin.lists[this.props.admin.ui.currentModel].ids.forEach((id, index) => {
                endIndex = itemsPerPage * currentPage - 1;
                startIndex = endIndex - itemsPerPage + 1;
                if (index >= startIndex && index <= endIndex) {
                    bodyRows.push(
                        <Table.Row key={id}>
                            <Table.Cell>
                                <Checkbox 
                                    id={id}
                                    checked={this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.filter(selectedId => selectedId === id).length === 1}
                                    onChange={(e, { checked}) => this.props.onToggleListItemSelectHandler(this.props.admin.ui.currentModel, checked, e.target.id)}
                                />
                            </Table.Cell>
                            {this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.map(({ name, isDate }) => {
                                let fieldValue = transformDataList(this.props.admin.ui.currentModel, this.props.forms, this.props.admin.models).filter(item => item.id === id)[0][name];
                                fieldValue = isDate && fieldValue !== null ? moment(fieldValue).format('DD-MM-YYYY HH:mm') : fieldValue;
                                return (
                                    <Table.Cell
                                        key={id + name}
                                        error={fieldValue === false}
                                        >
                                        {fieldValue === false ? 'Cannot pull data' : fieldValue}
                                    </Table.Cell>
                                );
                            })}
                        </Table.Row>
                    );
                }
            });
        }
 
        return (
            <Table
                selectable
                sortable
                style={{ border: 0, margin: 0 }}
            >
                <Table.Header>
                    <Table.Row>{headerFields}</Table.Row>
                </Table.Header>
                <Table.Body>
                    {bodyRows}
                </Table.Body>
                <Table.Footer 
                    style={{display: 'table-footer-group'}}
                >
                    <Table.HeaderCell 
                        colSpan={this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.length + 1}
                        style={{lineHeight: '3em', borderTop: this.props.global.ui.mobile ? 'none' : '1px solid rgba(34,36,38,.15)'}}
                    >   
                        {this.props.global.ui.mobile ? null : <span>Rows per page:</span>}
                        {this.props.global.ui.mobile ? null :
                            <Dropdown
                                options={this.props.admin.ui.itemsPerPageOptions}
                                defaultValue={itemsPerPage}
                                text={itemsPerPage}
                                inline
                                style={{marginLeft: '1em', marginRight: '1em'}}
                                onChange={(e, { value }) => this.props.onSetItemsPerPageHandler(this.props.admin.ui.currentModel, value)}
                            />
                        }
                        <span>{startIndex + 1}-{endIndex + 1 > totalItems ? totalItems : endIndex + 1} of {totalItems}</span>
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
                            style={{boxShadow: 'none'}}
                            onPageChange={(e, { activePage }) => this.props.onSetCurrentPageHandler(this.props.admin.ui.currentModel, activePage)}
                        />
                    </Table.HeaderCell>
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
        onSetTotalItemsHandler: (model, total) => dispatch(setTotalItems(model, total))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);