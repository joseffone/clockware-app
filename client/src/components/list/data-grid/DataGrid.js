import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Checkbox } from 'semantic-ui-react';
import { fetchDataRequest, setReloadDataTrigger, setSelectAllTrigger } from '../../../store/actions';
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
                this.props.onSetReloadDataTriggerHandler(false);
            }
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

        headerFields.unshift(<Table.HeaderCell><Checkbox onChange={(e, { checked }) => this.props.onSetSelectAllTriggerHandler(checked)} /></Table.HeaderCell>);

        if (this.props.admin.ui.reloadDataCounter === 0) {
            this.props.admin.lists[this.props.admin.ui.currentModel].ids.forEach(id => {
                bodyRows.push(
                    <Table.Row key={id}>
                        <Table.Cell>
                            <Checkbox id={id} checked={this.props.admin.ui.selectAllTrigger} />
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
            </Table>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        forms: state.forms,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataHandler: (accessToken, model) => dispatch(fetchDataRequest(accessToken, model)),
        onSetReloadDataTriggerHandler: (flag) => dispatch(setReloadDataTrigger(flag)),
        onSetSelectAllTriggerHandler: (checked) => dispatch(setSelectAllTrigger(checked))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);