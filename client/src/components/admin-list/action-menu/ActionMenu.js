import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Menu, Dropdown, Icon, Transition, Input} from 'semantic-ui-react';
import {deleteDataRequest, setSelectAllTrigger, changeSearchValue, searchDataRequest, addFilter, deleteFilter, loadFilterOptions, setFilterTargetValue, setReloadDataTrigger} from '../../../store/actions';
import {transformDataSet} from '../../../util';
import AdminForm from '../../admin-form';
import ConfirmDelete from './confirm-delete';
import DataFilter from './data-filter';
import styles from './styles.module.css';

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
        //this.props.onFetchDataHandler(this.props.auth.accessToken, this.props.admin.ui.currentModel);
        this.props.onSetReloadDataTriggerHandler(this.props.admin.ui.currentModel, true);
        this.props.onSetSelectAllTriggerHandler(this.props.admin.ui.currentModel, false);
    }

    onSearchInputChangeHandler = (event, {value}) => {
        this.props.onChangeSearchValueHandler(this.props.admin.ui.currentModel, value);
        this.props.onSearchDataRequestHandler(
            this.props.admin.ui.currentModel, 
            value, 
            () => transformDataSet(
                this.props.admin.ui.currentModel, 
                this.props.admin.forms, 
                this.props.admin.models, 
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters
            )
        );
    }

    onFilterMenuItemClickHandler = (event, {name}) => {
        this.props.onAddFilterHandler(this.props.admin.ui.currentModel, name);
    }

    onFilterCloseButtonClickHandler = (event, {id}) => {
        this.props.onDeleteFilterHandler(this.props.admin.ui.currentModel, id);
    }

    onFilterMountedHandler = (filterKey, dataKey, tailIndex) => {
        this.props.onLoadFilterOptionsHandler(
            filterKey,
            dataKey,
            this.props.admin.ui.currentModel, 
            () => transformDataSet(
                this.props.admin.ui.currentModel, 
                this.props.admin.forms, 
                this.props.admin.models, 
                this.props.admin.lists[this.props.admin.ui.currentModel].params.sort,
                this.props.admin.lists[this.props.admin.ui.currentModel].params.filters,
                tailIndex
            )
        );
    }

    onFilterChangeHandler = (filterKey, value) => {
        this.props.onSetFilterTargetValueHandler(this.props.admin.ui.currentModel, filterKey, value);
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
                        onClick={() => this.setState({isConfirmDeleteOpen: true})}
                    >
                        <Icon name='delete' color='red' />
                        Delete
                    </Item>
                : null}
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
                    {this.props.admin.lists[this.props.admin.ui.currentModel].params.fields.map(({ filterable, filterOperation }) => {
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
                            let {dataKey, isDate, options, targetValue} = Object.values(filter)[0];
                            return (
                                <Menu.Item>
                                    <DataFilter
                                        key={filterKey}
                                        id={filterKey}
                                        mobile={this.props.global.ui.mobile}
                                        date={isDate}
                                        loading={options.isLoading && !isDate}
                                        description={filter[filterKey].description}
                                        options={options.payload}
                                        text={targetValue}
                                        value={targetValue}
                                        closed={this.onFilterCloseButtonClickHandler}
                                        mounted={() => this.onFilterMountedHandler(filterKey, dataKey, index)}
                                        changed={(event, {value}) => this.onFilterChangeHandler(filterKey, value)}
                                    />
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                : null}
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
        onDeleteDataHandler: (accessToken, model, id, queryString) => dispatch(deleteDataRequest(accessToken, model, id, queryString)),
        onSetSelectAllTriggerHandler: (model, checked) => dispatch(setSelectAllTrigger(model, checked)),
        onChangeSearchValueHandler: (model, value) => dispatch(changeSearchValue(model, value)),
        onSearchDataRequestHandler: (model, text, dataSet, key) => dispatch(searchDataRequest(model, text, dataSet, key)),
        onAddFilterHandler: (model, filterKey) => dispatch(addFilter(model, filterKey)),
        onDeleteFilterHandler: (model, filterKey) => dispatch(deleteFilter(model, filterKey)),
        onSetFilterTargetValueHandler: (model, filterKey, value) => dispatch(setFilterTargetValue(model, filterKey, value)),
        onLoadFilterOptionsHandler: (filterKey, dataKey, model, getDataSet) => dispatch(loadFilterOptions(filterKey, dataKey, model, getDataSet)),
        onSetReloadDataTriggerHandler: (model, flag) => dispatch(setReloadDataTrigger(model, flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);