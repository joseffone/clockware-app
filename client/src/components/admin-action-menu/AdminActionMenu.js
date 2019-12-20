import React, {Component} from 'react';
import {Menu, Dropdown, Icon, Transition, Input} from 'semantic-ui-react';
import AdminForm from '../admin-form';
import ConfirmAction from '../confirm-action';
import DropFilter from '../drop-filter';
import {connect} from 'react-redux';
import {adminActionCreator} from '../../store/actions';
import {applyParams} from '../../util';
import styles from './styles.module.css';

class AdminActionMenu extends Component {

    state = {
        isConfirmDeleteOpen: false
    }

    onConfirmDeleteHandler = () => {
        let queryString = '?';
        this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.forEach((id) => {
            queryString += `id=${id}&`;
        });
        this.props.deleteData(this.props.auth.accessToken, this.props.admin.ui.currentModel, false, queryString);
    }

    onCommitDeleteHandler = () => {
        this.props.setReloadDataTrigger(this.props.admin.ui.currentModel, true);
        this.props.toggleAllItemsSelect(this.props.admin.ui.currentModel, false);
    }

    onSearchInputChangeHandler = (event, {value}) => {
        this.props.changeSearchValue(this.props.admin.ui.currentModel, value);
        this.props.searchData(
            this.props.admin.ui.currentModel, 
            value, 
            () => applyParams(
                this.props.admin.lists[this.props.admin.ui.currentModel].dataSet,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters
            )
        );
    }

    onFilterMenuItemClickHandler = (event, {name}) => {
        this.props.addFilter(this.props.admin.ui.currentModel, name);
    }

    onFilterCloseButtonClickHandler = (event, {id}) => {
        this.props.deleteFilter(this.props.admin.ui.currentModel, id);
    }

    onFilterUpdatedHandler = (filterKey, dataKey, tailIndex) => {
        this.props.loadFilterOptions(
            filterKey,
            dataKey,
            this.props.admin.ui.currentModel, 
            () => applyParams(
                this.props.admin.lists[this.props.admin.ui.currentModel].dataSet,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters,
                tailIndex
            )
        );
    }

    onFilterChangeHandler = (filterKey, value) => {
        this.props.setFilterTarget(this.props.admin.ui.currentModel, filterKey, value);
    }

    actions = (props) => {
        const Item = props.itemType;
        return [
            <Transition.Group 
                key='del'
                animation='fade left' 
                duration={500}
            >
                {this.props.admin.lists[this.props.admin.ui.currentModel].selectedIds.length > 0 &&
                    <Item
                        as='a'
                        onClick={() => this.setState({isConfirmDeleteOpen: true})}
                    >
                        <Icon name='delete' color='red' />
                        Delete
                    </Item>
                }
            </Transition.Group>,
            <AdminForm
                key='add'
                trigger={
                    (props) =>
                        <Item
                            as='a'
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
            >
                <Dropdown.Menu>
                    {this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.map(({filterable, filterOperation}) => {
                        if (filterable) {
                            return filterOperation.map((filterItem) => (
                                <Dropdown.Item
                                    key={`triger_${filterItem.key}`}
                                    name={filterItem.key}
                                    onClick={this.onFilterMenuItemClickHandler}
                                >
                                    {filterItem.descriptor}
                                </Dropdown.Item>
                            ));
                        }
                        return null;
                    })}
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
                    className={styles.mainPanel}
                >
                    <Menu.Item
                        className={'search'}
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
                                icon={<Icon name='wrench' />}
                                className={'mobile'}
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
                {this.props.admin.lists[this.props.admin.ui.currentModel].params.filters.length > 0 ?
                    <Menu 
                        secondary
                        stackable
                        className={styles.filterPanel}
                    >
                        {this.props.admin.lists[this.props.admin.ui.currentModel].params.filters.map((filter, index) => {
                            let filterKey = Object.keys(filter)[0];
                            let {rank, dataKey, isDate, options, target} = Object.values(filter)[0];
                            return (
                                <Menu.Item
                                    key={filterKey}
                                >
                                    <DropFilter
                                        id={filterKey}
                                        date={isDate}
                                        description={filter[filterKey].description}
                                        loading={options.isLoading && !isDate}
                                        mobile={this.props.global.ui.mobile}
                                        options={options.payload}
                                        placeholder={filter[filterKey].description}
                                        rank={rank}
                                        text={target}
                                        value={target}
                                        onDelete={this.onFilterCloseButtonClickHandler}
                                        onUpdate={(tailIndex) => this.onFilterUpdatedHandler(filterKey, dataKey, tailIndex)}
                                        onChange={(event, {value}) => this.onFilterChangeHandler(filterKey, value)}
                                    />
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                : null}
                <ConfirmAction
                    open={this.state.isConfirmDeleteOpen}
                    error={this.props.admin.models[this.props.admin.ui.currentModel].error.deleteError}
                    acting={this.props.admin.models[this.props.admin.ui.currentModel].loading.isDeleting}
                    loaderText={'Deleting...'}
                    message={{
                        initial: {
                            header: 'Delete confirmation',
                            content: 'You are going to delete selected entries. Do you confirm this action?'
                        },
                        success: {
                            header: 'Delete action succeeded',
                            content: 'Entries were deleted successfully!'
                        },
                        failure: [
                            {
                                errCode: 'default',
                                header: 'Cannot delete data',
                                content: 'Something went wrong while acting data. The action cannot be completed successfully.'
                            },
                            {
                                errCode: 403,
                                header: 'No access to delete data',
                                content: 'There are restrictions for your account to delete data from this register.'
                            },
                            {
                                errCode: 404,
                                header: 'Data is not available',
                                content: 'Selected entries are not available. They might be deleted by other users.'
                            }
                        ]
                    }}
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
        deleteData: (accessToken, model, id, queryString) => dispatch(adminActionCreator.deleteDataRequest(accessToken, model, id, queryString)),
        toggleAllItemsSelect: (model, checked) => dispatch(adminActionCreator.toggleAllItemsSelect(model, checked)),
        changeSearchValue: (model, value) => dispatch(adminActionCreator.changeSearchValue(model, value)),
        searchData: (model, text, dataSet, key) => dispatch(adminActionCreator.searchDataRequest(model, text, dataSet, key)),
        addFilter: (model, filterKey) => dispatch(adminActionCreator.addFilter(model, filterKey)),
        deleteFilter: (model, filterKey) => dispatch(adminActionCreator.deleteFilter(model, filterKey)),
        setFilterTarget: (model, filterKey, value) => dispatch(adminActionCreator.setFilterTarget(model, filterKey, value)),
        loadFilterOptions: (filterKey, dataKey, model, getDataSet) => dispatch(adminActionCreator.loadFilterOptions(filterKey, dataKey, model, getDataSet)),
        setReloadDataTrigger: (model, flag) => dispatch(adminActionCreator.setReloadDataTrigger(model, flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminActionMenu);