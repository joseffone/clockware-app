import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataRequest, deleteDataRequest, setSelectAllTrigger } from '../../../store/actions';
import { Menu, Icon, Transition } from 'semantic-ui-react';
import InputForm from '../../input-form';
import ConfirmDelete from './confirm-delete';

class ActionMenu extends Component {

    state = {
        isConfirmDeleteOpen: false
    }

    onConfirmDeleteHandler = () => {
        let queryString = '?';
        this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.forEach((id) => {
            queryString += `id=${id}&`;
        });
        this.props.onDeleteDataHandler(this.props.auth.accessToken, this.props.admin.ui.currentModel, false, queryString);
    }

    onCommitDeleteHandler = () => {
        this.props.onFetchDataHandler(this.props.auth.accessToken, this.props.admin.ui.currentModel);
        this.props.onSetSelectAllTriggerHandler(this.props.admin.ui.currentModel, false);
    }

    render () {
        return (
            <React.Fragment>
                <Menu
                    secondary
                    stackable
                    style={{ margin: '1em'}}
                >
                    <Menu.Menu
                        position='right'
                        
                    >
                        <Transition.Group animation='fade left' duration={500}>
                            {this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.length > 0 ?
                                <Menu.Item 
                                    as='a'
                                    style={{margin: 0}}
                                    onClick={() => this.setState({isConfirmDeleteOpen: true})}
                                >
                                    <Icon name='delete' color='red' />
                                    Delete
                                </Menu.Item>
                            : null}
                            <InputForm
                                trigger={
                                    (props) =>
                                        <Menu.Item 
                                            as='a'
                                            style={{margin: 0}}
                                            {...props}
                                        >
                                            <Icon name='add' color='green' />
                                            Add
                                        </Menu.Item>
                                }
                                refreshAfterClose
                                model={this.props.admin.ui.currentModel}
                                mobile={this.props.global.ui.mobile}
                            />
                            <Menu.Item 
                                as='a'
                                style={{margin: 0}}
                            >
                                <Icon name='filter' />
                                Filter
                            </Menu.Item>
                        </Transition.Group>
                    </Menu.Menu>
                </Menu>
                <ConfirmDelete
                    open={this.state.isConfirmDeleteOpen}
                    onClose={() => this.setState({isConfirmDeleteOpen: false})}
                    onCancel={() => this.setState({isConfirmDeleteOpen: false})}
                    onConfirm={this.onConfirmDeleteHandler}
                    onCommit={() => this.setState({isConfirmDeleteOpen: false}, () => this.onCommitDeleteHandler())}
                />
            </React.Fragment>
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
        onFetchDataHandler: (accessToken, model) => dispatch(fetchDataRequest(accessToken, model)),
        onDeleteDataHandler: (accessToken, model, id, queryString) => dispatch(deleteDataRequest(accessToken, model, id, queryString)),
        onSetSelectAllTriggerHandler: (model, checked) => dispatch(setSelectAllTrigger(model, checked))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);