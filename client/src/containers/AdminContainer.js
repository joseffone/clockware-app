import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Message } from 'semantic-ui-react';
import SideBarWrapper from '../hoc/sidebar-wrapper';
import { AdminSideBar } from '../components/sidebar';
import List from '../components/list';

class AdminContainer extends Component {
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
                    style={{
                        margin: 0,
                        paddingLeft: this.props.global.ui.mobile ? 0 : this.props.global.ui.isSideBarOpen ? '10.714em' : 0,
                        transition: this.props.global.ui.mobile ? 'none' : 'padding-left 0.5s'
                    }}
                >
                    <Grid.Row
                        style={{padding: 0}}
                    >
                        {this.props.admin.ui.errorDataCounter.length > 0 && !this.props.admin.models[this.props.admin.ui.currentModel].loading.isFetching ? 
                            <Message
                                info={emptyDataFlag}
                                warning={noAccessFlag}
                                error={!emptyDataFlag && !noAccessFlag}
                                header={messageHeader}
                                content={messageContent}
                                style={{border: 'none', margin: '1em 1em 0 1em', width: '100%'}}
                            />
                        : null}
                    </Grid.Row>
                    <Grid.Row
                        style={{padding: 0}}
                    >
                        <Grid.Column 
                            as={Segment}
                            loading={this.props.admin.models[this.props.admin.ui.currentModel].loading.isFetching}
                            style={{padding: 0, margin: '1em'}}
                        >
                            <List />
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