import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment, Grid, Message} from 'semantic-ui-react';
import SideBarWrapper from '../../hoc/sidebar-wrapper';
import StartForm from '../start-form';
import ClientDataGrid from '../client-data-grid';
import Footer from '../footer';
import styles from './styles.module.css';

class ClientView extends Component {

    clientContent = ({sidebar, mobile, error, empty}) => {
        const Sidebar = sidebar;
        return (
            <SideBarWrapper 
                sidebar={() => null}
            >
                <Grid 
                    centered 
                    divided
                >
                    <Grid.Row 
                        columns={mobile ? 1 : 2}
                    >
                        {!mobile ?
                            <Grid.Column 
                                width={4}
                            >
                                <Sidebar sidebarView />
                            </Grid.Column>
                        : null}
                        <Grid.Column 
                            width={mobile ? 16 : 8}
                        >
                            <Message
                                error
                                icon='warning sign'
                                size={mobile ? null : 'large'}
                                hidden={!error}
                                header='Cannot fetch data from the server'
                                content='Something went wrong while receiving data. Please, try to make request again. If it does not help, visit this resource later.'
                            />
                            <Message
                                info
                                icon='info'
                                size={mobile ? null : 'large'}
                                hidden={error || !empty}
                                header='No available agents found'
                                content='There are no agents who would match the given parameters. Please, try to make request with the other ones.'
                            />
                            <ClientDataGrid />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </SideBarWrapper>
        );
    };

    render () {
        const ClientContent = this.clientContent;
        return (
            <React.Fragment>
                <Segment 
                    className={styles.header}
                    loading={this.props.client.ui.reloadDataTrigger}
                >
                    {this.props.client.ui.isStartPageShown ?
                        <StartForm />
                    :
                        <ClientContent 
                            sidebar={StartForm}
                            mobile={this.props.global.ui.mobile}
                            error={!this.props.client.ui.reloadDataTrigger && (
                                    this.props.client.data.error.fetchError || this.props.admin.ui.fetchErrorsCounter.length > 0
                                )
                            }
                            empty={!this.props.client.ui.reloadDataTrigger && this.props.client.list.ids.length === 0}
                        />
                    }
                </Segment>
                <Segment
                    className={styles.footer}
                    vertical
                    inverted
                >
                    <Footer 
                        inverted 
                    />
                </Segment>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        client: state.client,
        admin: state.admin
    };
};

export default connect(mapStateToProps, null)(ClientView);