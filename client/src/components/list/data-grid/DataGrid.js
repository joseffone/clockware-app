import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { fetchDataRequest } from '../../../store/actions';

class DataGrid extends Component {

    componentDidMount () {
        this.onRefreshDataListHandler();
    }

    componentDidUpdate (prevProps) {
        if (this.props.admin.ui.reloadDataTrigger) {
            if (prevProps.admin.ui.reloadDataTrigger !== this.props.admin.ui.reloadDataTrigger) {
                if (!this.props.admin.models[this.props.admin.ui.currentModel].loading.isFetching) {
                    this.onRefreshDataListHandler();
                }
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

        this.props.admin.lists[this.props.admin.ui.currentModel].items.forEach(item => {
            bodyRows.push(
                <Table.Row key={item.id}>
                    {this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.map(({ name }) => {
                        return (
                            <Table.Cell key={item.id + name}>
                                {item[name]}
                            </Table.Cell>
                        );
                    })}
                </Table.Row>
            );
        });
        
        return (
            <Table
                sortable
                striped
                style={{ border: 0 }}
            >
                <Table.Header>
                    <Table.Row>
                        {headerFields}
                    </Table.Row>
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
        onFetchDataHandler: (accessToken, model) => dispatch(fetchDataRequest(accessToken, model))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);