import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Segment, Message} from 'semantic-ui-react';
import {AdminSideBar} from '../sidebars/admin-sidebar';
import SideBarWrapper from '../../hoc/sidebar-wrapper';
import AdminDataGrid from '../admin-data-grid';
import AdminActionMenu from '../admin-action-menu';
import styles from './styles.module.css';

class AdminView extends Component {

    checkFetchSuccess = () => {
        let result = true;
        let mask = [this.props.admin.ui.currentModel];
        for (const key in this.props.admin.forms[this.props.admin.ui.currentModel]) {
            if (this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source) {
                this.props.admin.forms[this.props.admin.ui.currentModel][key].config.source.forEach(src => mask.push(src));
            }
        }
        mask.forEach(src => result = result && !this.props.admin.ui.fetchErrorsCounter.includes(src));
        return result;
    }

    render () {
        let emptyDataFlag = false, noAccessFlag = false;
        let messageHeader = 'Cannot fetch data from the server';
        let messageContent = 'Something went wrong while receiving data so displayed info may be incomplete or be absent at all. Please, try to refresh the page. If it does not help, visit this resource later.';
        if (this.props.admin.ui.fetchErrorsCounter.includes(this.props.admin.ui.currentModel)) {
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
                    className={this.props.global.ui.mobile ? styles.adminViewMobile : this.props.global.ui.isSideBarOpen ? styles.adminViewPCOpen : styles.adminViewPCClose}
                >
                    <Grid.Row>
                        {!this.checkFetchSuccess() && !this.props.admin.ui.fetchRequestsCounter.includes(this.props.admin.ui.currentModel) ? 
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
                        >
                            <AdminActionMenu />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column 
                            as={Segment}
                            loading={this.props.admin.ui.fetchRequestsCounter.includes(this.props.admin.ui.currentModel)}
                        >
                            <AdminDataGrid />
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

export default connect(mapStateToProps, null)(AdminView);