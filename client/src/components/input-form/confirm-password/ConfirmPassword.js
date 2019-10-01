import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.css';

class ConfirmPassword extends Component {

    state = {
        passwordToConfirm: '',
        isPasswordValid: true
    }

    passInput = React.createRef();

    onConfirmButtonClickHandler = () => {
        if (this.state.passwordToConfirm === this.props.forms['users'].password.value) {
            return this.setState({isPasswordValid: true}, () => this.props.onConfirm());
        }
        return this.setState({isPasswordValid: false});
    }

    render () {
        return(
            <Modal
                basic
                size='small'
                {...this.props}
                onMount={() => this.passInput.current.focus()}
            >
                <Modal.Header>
                    <Icon name='key' />
                    <span> Password confirmation</span>
                </Modal.Header>
                <Modal.Content>
                    <p>You are going to change user's password. To confirm this action enter the new password again.</p>
                    <p>
                        <span>Password:</span>
                        <Input
                            ref={this.passInput}
                            type='password'
                            inverted
                            transparent
                            className={styles.confirmPasswordInput}
                            onChange={(event, { value }) => this.setState({passwordToConfirm: value, isPasswordValid: true})}
                        />
                    </p>
                    {this.state.isPasswordValid ? null : <p className={styles.confirmPasswordErrorMessage}>Password is not valid!</p>}
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        basic 
                        color='red' 
                        inverted
                        onClick={this.props.onCancel}
                    >
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button 
                        color='green' 
                        inverted
                        onClick={this.onConfirmButtonClickHandler}
                    >
                        <Icon name='checkmark' /> Confirm
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        forms: state.forms
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);