import React, {Component} from 'react';
import {Item, Rating, Button, Icon, Label} from 'semantic-ui-react';
import SearchMenu from '../search-menu';
import Pagination from '../pagination';
import ClientForm from '../client-form';
import {connect} from 'react-redux';
import {adminActionCreator, clientActionCreator} from '../../store/actions';
import {transformDataSet, rewriteObjectProps, applyParams, getUniqueKeyValues} from '../../util';
import img from '../../images/secret-agent-icon.jpg';
import styles from './styles.module.css';
import moment from 'moment';

class ClientDataGrid extends Component {

    componentDidMount() {
        let promise = new Promise(handle => handle());
        promise.then(() => this.props.setReloadDataTrigger(false));
        promise.then(() => this.props.setReloadDataTrigger(true));
    }

    componentDidUpdate(prevProps) {
        if (this.props.client.ui.reloadDataTrigger) {
            if (prevProps.client.ui.reloadDataTrigger !== this.props.client.ui.reloadDataTrigger) {
                return this.onReloadAuxDataHandler();
            }
            if (this.props.admin.ui.fetchRequestsCounter.length === 0) {
                if (this.props.admin.ui.fetchErrorsCounter.length === 0) {
                    if (!this.props.client.data.loading.isFetching) {
                        return this.onReloadFreeAgentsHandler();
                    }
                }
                if (this.props.admin.ui.fetchErrorsCounter.length > 0) {
                    this.props.setListData([]);
                    this.props.setReloadDataTrigger(false);
                    return;
                }
            }
        }
        if (prevProps.client.ui.reloadDataTrigger !== this.props.client.ui.reloadDataTrigger) {
            if (this.props.admin.ui.fetchErrorsCounter.length === 0 && 
                !this.props.client.data.error.fetchError && 
                !this.props.client.ui.reloadDataTrigger) {
                let agentsDataSet = transformDataSet('agents', this.props.admin.forms, this.props.admin.models);
                let coverageDataSet = transformDataSet('coverage', this.props.admin.forms, this.props.admin.models);
                let mergedDataSet = this.props.client.data.freeAgents.map(({id}) => {
                    let agentDataItem = agentsDataSet.find(item => item.id === id);
                    return rewriteObjectProps(agentDataItem, {
                        cities: coverageDataSet
                            .filter(({agent_id}) => agent_id === id)
                            .map(({city_name}) => city_name)
                    });
                });
                this.props.setListData(mergedDataSet);
                this.props.setTotalItems(this.props.client.list.ids.length);
            }
        }
        if (prevProps.client.list.ids.length !== this.props.client.list.ids.length) {
            this.props.setTotalItems(this.props.client.list.ids.length);
        }
        if (prevProps.client.list.params.sort !== this.props.client.list.params.sort ||
            prevProps.client.list.params.filters !== this.props.client.list.params.filters) {
            this.onFiltersApplyHandler();
        }
    }

    onReloadFreeAgentsHandler = () => {
        let queryString = '?';
        for (const key in this.props.client.forms.clientStartForm) {
            let value = this.props.client.forms.clientStartForm[key].value;
            if (key === 'start_date') {
                let timeShift = this.props.admin.models.clocks.items.find(({id}) => id === this.props.client.forms.clientStartForm.clock_id.value).hours_of_repair;
                queryString += `${key}=${moment(value, 'DD-MM-YYYY HH:mm').utc().format()}&expiration_date=${moment(value, 'DD-MM-YYYY HH:mm').add(timeShift, 'h').utc().format()}&`;
                continue;
            }
            if (key === 'clock_id') {
                continue;
            }
            queryString += `${key}=${value}&`;
        }
        this.props.fetchFreeAgents(queryString);
    }
    
    onReloadAuxDataHandler = (source) => {
        if (source) {
            source.forEach(src => this.props.fetchData(null, src));
            return;
        }
        ['agents', 'marks', 'clocks', 'cities', 'coverage'].forEach(src => {
            this.props.fetchData(null, src);
        });
    }

    onFiltersApplyHandler = () => {
        this.props.setListItemsIds(
            applyParams(
                this.props.client.list.dataSet,
                this.props.client.list.params.sort,
                this.props.client.list.params.filters
            ).map(item => item.id)
        );
    }

    render() {
        let items = [];
        let dataSet = this.props.client.list.dataSet;
        let totalPages = 0;
        let itemsPerPage = this.props.client.list.params.pagination.itemsPerPage;
        let totalItems = this.props.client.list.params.pagination.totalItems;
        let currentPage = this.props.client.list.params.pagination.currentPage;
        let endIndex = itemsPerPage * currentPage - 1;
        let startIndex = endIndex - itemsPerPage + 1;

        if (this.props.client.data.freeAgents.length > 0) {
            totalPages = Math.ceil(totalItems/itemsPerPage);
            this.props.client.list.ids.forEach((id, index) => {
                let dataSetItem = dataSet.find(item => item.id === id);
                if (index >= startIndex && index <= endIndex && dataSetItem) {
                    items.push(
                        <Item 
                            key={index}
                        >
                            <Item.Image src={img} size='tiny' />
                            <Item.Content>
                                <Item.Header>
                                    <Rating 
                                        rating={dataSetItem.rating_value} 
                                        maxRating={
                                            Math.max(
                                                ...getUniqueKeyValues(
                                                    this.props.admin.models.marks.items.filter(({deleted_at}) => deleted_at === null),
                                                    'mark_value'
                                                )
                                            )
                                        } 
                                        disabled 
                                    />
                                </Item.Header>
                                <Item.Description>{`${dataSetItem.first_name} ${dataSetItem.last_name}`}</Item.Description>
                                <Item.Extra>
                                    <ClientForm 
                                        id={id}
                                        trigger={
                                            (props) =>
                                                <Button
                                                    floated='right'
                                                    {...props}
                                                >
                                                    Reserve
                                                    <Icon name='right chevron' />
                                                </Button>
                                        }
                                    />
                                    {dataSetItem.cities.map(city => <Label key={city}>{city}</Label>)}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    );
                }
            });
            items.unshift(
                <Item 
                    key={-1}
                >
                    <Item.Content>
                        <SearchMenu 
                            mobile={this.props.global.ui.mobile}
                            options={this.props.client.list.params.sort.options}
                            onTargetChange={this.props.changeSortTarget}
                            onOrderChange={this.props.changeSortOrder}
                        />
                    </Item.Content>
                </Item>
            );
            items.push(
                <Item 
                    key={this.props.client.list.ids.length}
                >
                    <Item.Content>
                        <Pagination 
                            mobile={this.props.global.ui.mobile}
                            totalItems={totalItems}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            itemsPerPage={itemsPerPage}
                            itemsPerPageOptions={this.props.client.ui.itemsPerPageOptions}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onItemsPerPageChange={(event, {value}) => this.props.setItemsPerPage(value)}
                            onCurrentPageChange={(event, {activePage}) => this.props.setCurrentPage(activePage)}
                        />
                    </Item.Content>
                </Item>
            );
        }

        return (
            <div 
                className={styles.clientDataGrid}
            >
                <Item.Group
                    divided
                >
                    {items}
                </Item.Group>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        client: state.client,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model)),
        fetchFreeAgents: (queryString) => dispatch(clientActionCreator.fetchFreeAgentsRequest(queryString)),
        setReloadDataTrigger: (flag) => dispatch(clientActionCreator.setReloadDataTrigger(flag)),
        setCurrentPage: (activePage) => dispatch(clientActionCreator.setCurrentPage(activePage)),
        setItemsPerPage: (value) => dispatch(clientActionCreator.setItemsPerPage(value)),
        setTotalItems: (total) => dispatch(clientActionCreator.setTotalItems(total)),
        setListItemsIds: (ids) => dispatch(clientActionCreator.setListItemsIds(ids)),
        setListData: (dataSet) => dispatch(clientActionCreator.setListData(dataSet)),
        changeSortTarget: (target) => dispatch(clientActionCreator.changeSortTarget(target)),
        changeSortOrder: (reverse) => dispatch(clientActionCreator.changeSortOrder(reverse))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDataGrid);