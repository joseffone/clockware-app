import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Message, Button } from 'semantic-ui-react';
import SideBarWrapper from '../hoc/sidebar-wrapper';
import { AdminSideBar } from '../components/sidebar';
import List from '../components/list';
import InputForm from '../components/input-form';

class AdminContainer extends Component {
    render () {
        return (
           <SideBarWrapper sidebar={AdminSideBar}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle' 
                    style={{
                        margin: 0,
                        paddingLeft: this.props.global.ui.isSideBarOpen ? '10.714em' : 0,
                        transition: 'padding-left 0.5s'
                    }}
                >
                    <Grid.Row
                        style={{padding: 0}}
                    >
                        {this.props.admin.ui.errorDataCounter.length > 0 ? 
                            <Message
                                error 
                                header='Cannot fetch data from the server'
                                content='Something went wrong while receiving data so displayed info may be outdated and incomplete. Please, try to refresh the page. If it does not help, visit this resource later.'
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

            /*<Grid 
                textAlign='center'
                verticalAlign='middle' 
                style={{height: '100%', widtn: '100%', margin: 0}}
            >
                <Grid.Column>                        
                    <InputForm 
                        trigger={
                            (props) => 
                                <Button
                                    icon='edit'
                                    {...props}
                                />
                        }
                        model='cities'
                        mobile={false}
                    />
                </Grid.Column>
            </Grid> */
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