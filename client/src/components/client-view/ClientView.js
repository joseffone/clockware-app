import React, {Component} from 'react';
import {Segment, Grid, Message} from 'semantic-ui-react';
import SideBarWrapper from '../../hoc/sidebar-wrapper';
import ClientActionMenu from '../client-action-menu';
import StartForm from '../start-form';
import ClientDataGrid from '../client-data-grid';
import Footer from '../footer';
import {connect} from 'react-redux';
import styles from './styles.module.css';

class ClientView extends Component {

    clientContent = ({mobile, sbOpen, error, empty}) => {
        return (
            <SideBarWrapper
                content={<ClientActionMenu />}
                dimmed={mobile && sbOpen}
                mobile={mobile} 
            >
                <Grid
                    centered 
                    divided
                >
                    <Grid.Row>
                        {!mobile && <Grid.Column className={'sideMenu'}><ClientActionMenu /></Grid.Column>}
                        <Grid.Column 
                            width={mobile ? 16 : 7}
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

    render() {
        const ClientContent = this.clientContent;
        return (
            <React.Fragment>
                <Segment 
                    className={`${styles.header} ${this.props.global.ui.isSideBarOpen ? 'sideBarOpen' : null}`}
                    loading={this.props.client.ui.reloadDataTrigger}
                >
                    {this.props.client.ui.isStartPageShown 
                        ? <StartForm />
                        : <ClientContent
                                empty={!this.props.client.ui.reloadDataTrigger && this.props.client.list.dataSet.length === 0}
                                error={
                                    !this.props.client.ui.reloadDataTrigger && 
                                    (this.props.client.data.error.fetchError || this.props.admin.ui.fetchErrorsCounter.length > 0)
                                }
                                mobile={this.props.global.ui.mobile}
                                sbOpen={this.props.global.ui.isSideBarOpen}
                        />
                    }
                </Segment>
                <Segment
                    className={styles.footer}
                    vertical
                    inverted
                >
                    <Footer inverted />
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