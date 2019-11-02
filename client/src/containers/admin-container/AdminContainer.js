import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Segment, Message} from 'semantic-ui-react';
import SideBarWrapper from '../../hoc/sidebar-wrapper';
import {AdminSideBar} from '../../components/sidebars/admin-sidebar';
import AdminList from '../../components/admin-list';
import styles from './styles.module.css';

class AdminContainer extends Component {

    checkFetchSuccess = () => {
        let result = true;
        let mask = [this.props.admin.ui.currentModel];
        for (const key in this.props.admin.forms[this.props.admin.ui.currentModel]) {
            if (this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source) {
                this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source.forEach(src => mask.push(src));
            }
        }
        mask.forEach(src => result = result && !this.props.admin.ui.errorDataCounter.includes(src));
        return result;
    }

    render () {
        let emptyDataFlag = false, noAccessFlag = false;
        let messageHeader = 'Cannot fetch data from the server';
        let messageContent = 'Something went wrong while receiving data so displayed info may be outdated and incomplete. Please, try to refresh the page. If it does not help, visit this resource later.';
        if (this.props.admin.models[this.props.admin.ui.currentModel].error.fetchError) {
            if (this.props.admin.models[this.props.admin.ui.currentModel].error.fetchError.response.status === 403) {
                noAccessFlag = true;
                messageHeader = 'No access to read data';
                messageContent = 'There are restrictions for your account to read data from this register.';
            }
            if (this.props.admin.models[this.props.admin.ui.currentModel].error.fetchError.response.status === 404) {
                emptyDataFlag = true;
                messageHeader = 'Data is not found';
                messageContent = 'This register does not contain data yet.';
            }
        }
        return (
            <SideBarWrapper 
                sidebar={AdminSideBar}
                dimmed={this.props.global.ui.mobile && this.props.global.ui.isSideBarOpen}
            >
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className={this.props.global.ui.mobile ? styles.adminContainerMobile : this.props.global.ui.isSideBarOpen ? styles.adminContainerPCOpen : styles.adminContainerPCClose}
                >
                    <Grid.Row>
                        {!this.checkFetchSuccess() && !this.props.admin.models[this.props.admin.ui.currentModel].loading.isFetching ? 
                            <Message
                                info={emptyDataFlag}
                                warning={noAccessFlag}
                                error={!emptyDataFlag && !noAccessFlag}
                                header={messageHeader}
                                content={messageContent}
                            />
                        : null}
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column 
                            as={Segment}
                            loading={this.props.admin.models[this.props.admin.ui.currentModel].loading.isFetching}
                        >
                            <AdminList />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </SideBarWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);