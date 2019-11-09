import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Item, Rating} from 'semantic-ui-react';
import {adminActionCreator, clientActionCreator} from '../../store/actions';
import moment from 'moment';

class ClientDataGrid extends Component {
    componentDidMount() {
        let promise = new Promise(handle => handle());
        promise.then(() => this.props.onSetReloadDataTrigger(false));
        promise.then(() => this.props.onSetReloadDataTrigger(true));
    }

    componentDidUpdate(prevProps) {
        debugger;
        if (this.props.client.ui.reloadDataTrigger) {
            if (prevProps.client.ui.reloadDataTrigger !== this.props.client.ui.reloadDataTrigger) {
                return this.onReloadAuxDataHandler();
            }
            if (this.props.admin.ui.fetchRequestsCounter.length === 0) {
                if (this.props.admin.ui.fetchErrorsCounter.length === 0) {
                    return this.onReloadFreeAgentsHandler();
                }
                return this.onReloadAuxDataHandler(this.props.admin.ui.fetchErrorsCounter);
            }
        }
        if (!this.props.client.data.loading.isFetching) {
            if (this.props.client.data.error.fetchError) {
                //return this.props.onSetReloadDataTrigger(true);
            }
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
        this.props.onFetchFreeAgentsHandler(queryString);
    }
    
    onReloadAuxDataHandler = (source) => {
        if (source) {
            source.forEach(src => this.props.onFetchDataHandler(null, src));
            return;
        }
        ['agents', 'marks', 'clocks'].forEach(src => {
            this.props.onFetchDataHandler(null, src);
        });
    }

    render() {
        return <div></div>;
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
        onFetchDataHandler: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model)),
        onFetchFreeAgentsHandler: (queryString) => dispatch(clientActionCreator.fetchFreeAgentsRequest(queryString)),
        onSetReloadDataTrigger: (flag) => dispatch(clientActionCreator.setReloadDataTrigger(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDataGrid);