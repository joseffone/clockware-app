import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment} from 'semantic-ui-react';
import StartForm from '../../components/start-form';
import ClientDataGrid from '../../components/client-data-grid';
import Footer from '../../components/footer';
import styles from './styles.module.css';

class ClientContainer extends Component {
    render () {
        return (
            <React.Fragment>
                <Segment 
                    className={styles.header}
                >
                    {this.props.client.ui.isStartPageShown ?
                        <StartForm />
                    :
                        <ClientDataGrid />
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
        client: state.client
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientContainer);