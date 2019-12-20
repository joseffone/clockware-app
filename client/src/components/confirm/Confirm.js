import React, {Component} from 'react';
import {Segment, Header, Icon, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {clientActionCreator} from '../../store/actions';
import styles from './styles.module.css';

class Confirm extends Component {

    componentDidMount() {
        this.props.confirmReservation(this.props.match.params.token);
    }

    render() {
        return (
            <Segment 
                placeholder 
                className={styles.confirm}
            >
                <Header icon>
                    {!this.props.confirmation && !this.props.error
                        ? <Icon name='spinner' loading />
                        : <Icon name={this.props.error ? 'frown outline' : 'smile outline'} />
                    }
                    {this.props.confirmation 
                        ? 'Resrvation confirmed!' 
                        : this.props.error 
                            ? 'Confirming failed!'
                            : ''
                    }
                </Header>
                <Segment.Inline>
                    {!this.props.confirmation && !this.props.error
                        ? 'Confirming...'
                        : <Button.Group>
                            {this.props.error && 
                                [
                                    <Button 
                                        key={0}
                                        positive
                                        onClick={() => this.props.confirmReservation(this.props.match.params.token)}
                                    >
                                        Try again
                                    </Button>,
                                    <Button.Or key={1} />
                                ]
                            }
                            <Button
                                onClick={() => this.props.history.replace(this.props.auth.pathToAutoRedirect)}
                            >
                                Go to start page
                            </Button>
                        </Button.Group>
                    }
                </Segment.Inline>
            </Segment>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        confirmation: state.client.data.confirmation,
        loading: state.client.data.loading.isConfirming,
        error: state.client.data.error.confirmError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        confirmReservation: (token) => dispatch(clientActionCreator.confirmReservationRequest(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);