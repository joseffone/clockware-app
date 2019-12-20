import React, {Component} from 'react';
import {Modal, Input, Button, Icon} from 'semantic-ui-react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

class ConfirmPassword extends Component {

    state = {
        passwordToConfirm: '',
        isPasswordConfirmed: true
    }

    passInput = React.createRef();

    onConfirmButtonClickHandler = () => {
        if (this.state.passwordToConfirm === this.props.currentPasswordValue) {
            return this.setState({isPasswordConfirmed: true}, () => this.props.onConfirm());
        }
        return this.setState({isPasswordConfirmed: false});
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
                            onChange={(event, { value }) => this.setState({passwordToConfirm: value, isPasswordConfirmed: true})}
                        />
                    </p>
                    {this.state.isPasswordConfirmed ? null : <p className={styles.confirmPasswordErrorMessage}>Password is not valid!</p>}
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

ConfirmPassword.propTypes = {
    open: PropTypes.bool.isRequired,
    currentPasswordValue: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default ConfirmPassword;