import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon, Transition, Input } from 'semantic-ui-react';
import { fetchDataRequest, deleteDataRequest, setSelectAllTrigger, changeSearchValue, searchDataRequest } from '../../../store/actions';
import { transformDataSet } from '../../../util';
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

    onSearchInputChangeHandler = (event, { value }) => {
        this.props.onChangeSearchValueHandler(this.props.admin.ui.currentModel, value);
        this.props.onSearchDataRequestHandler(
            this.props.admin.ui.currentModel, 
            value, 
            transformDataSet(
                this.props.admin.ui.currentModel, 
                this.props.forms, 
                this.props.admin.models, 
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort
            )
        );
    }

    actions = (props) => {
        const Item = props.itemType;
        return [
            <Transition.Group 
                key='del'
                animation='fade left' 
                duration={500}
            >
                {this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.length > 0 ?
                    <Item
                        as='a'
                        style={{margin: 0}}
                        onClick={() => this.setState({isConfirmDeleteOpen: true})}
                    >
                        <Icon name='delete' color='red' />
                        Delete
                    </Item>
                : null}
            </Transition.Group>,
            <InputForm
                key='add'
                trigger={
                    (props) =>
                        <Item
                            as='a'
                            style={{margin: 0}}
                            {...props}
                        >
                            <Icon name='add' color='green' />
                            Add
                        </Item>
                }
                refreshAfterClose
                model={this.props.admin.ui.currentModel}
            />,
            <Dropdown
                key='filter'
                item
                pointing
                floating
                simple={this.props.global.ui.mobile}
                icon={<span><Icon name='filter' />Filter</span>}
                style={{margin: 0}}
            >
                <Dropdown.Menu>
                    <Dropdown.Item>filter 111111111</Dropdown.Item>
                    <Dropdown.Item>filter 222222222</Dropdown.Item>
                    <Dropdown.Item>filter 333333333</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ];
    }

    render () {
        const Actions = this.actions;
    
        return (
            <React.Fragment>
                <Menu
                    secondary
                    style={{ margin: '1em'}}
                >
                    <Menu.Item
                        style={{margin: 0, padding: 0}}
                    >
                        <Input
                            icon='search'
                            iconPosition='left'
                            placeholder='Search...'
                            transparent
                            loading={this.props.admin.lists[this.props.admin.ui.currentModel].params.search.isLoading}
                            value={this.props.admin.lists[this.props.admin.ui.currentModel].params.search.value}
                            onChange={this.onSearchInputChangeHandler}
                        />
                    </Menu.Item>
                    <Menu.Menu
                        position='right'
                    >
                        {this.props.global.ui.mobile ? 
                            <Dropdown 
                                item
                                icon={
                                    <Icon 
                                        name='wrench'
                                        style={{margin: 0, padding: 0}}
                                    />
                                }
                                style={{margin: 0}}
                            >
                                <Dropdown.Menu>
                                    <Actions itemType={Dropdown.Item} />
                                </Dropdown.Menu>
                            </Dropdown>
                        :
                            <Actions itemType={Menu.Item} />
                        }                     
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
        forms: state.forms,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataHandler: (accessToken, model) => dispatch(fetchDataRequest(accessToken, model)),
        onDeleteDataHandler: (accessToken, model, id, queryString) => dispatch(deleteDataRequest(accessToken, model, id, queryString)),
        onSetSelectAllTriggerHandler: (model, checked) => dispatch(setSelectAllTrigger(model, checked)),
        onChangeSearchValueHandler: (model, value) => dispatch(changeSearchValue(model, value)),
        onSearchDataRequestHandler: (model, text, dataSet, key) => dispatch(searchDataRequest(model, text, dataSet, key))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);