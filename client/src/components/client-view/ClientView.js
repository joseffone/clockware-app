import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment, Grid} from 'semantic-ui-react';
import SideBarWrapper from '../../hoc/sidebar-wrapper';
import StartForm from '../start-form';
import ClientDataGrid from '../client-data-grid';
import Footer from '../footer';
import styles from './styles.module.css';

class ClientView extends Component {

    clientContent = ({sidebar, mobile}) => {
        const ClientSideBar = sidebar;
        const content = (
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
                            <ClientSideBar />
                        </Grid.Column>
                    : null}
                    <Grid.Column 
                        width={mobile ? 16 : 8}
                    >
                        <ClientDataGrid />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
        const mobileContent = (
            <SideBarWrapper 
                sidebar={sidebar}
            >
                {content}
            </SideBarWrapper>
        );
        return mobile ? mobileContent : content;
    };

    render () {
        const ClientContent = this.clientContent;
        return (
            <React.Fragment>
                <Segment 
                    className={styles.header}
                >
                    {this.props.client.ui.isStartPageShown ?
                        <StartForm />
                    :
                        <ClientContent 
                            sidebar={() => null}
                            mobile={this.props.global.ui.mobile}
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
        client: state.client
    };
};

export default connect(mapStateToProps, null)(ClientView);