import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

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
                <Modal.Header icon='key' content='Password confirmation' />
                <Modal.Content>
                    <p>You are going to change user's password. To confirm this action enter the new password again.</p>
                    <p>
                        Password:
                        <Input
                            ref={this.passInput}
                            type='password'
                            iconPosition='left'
                            inverted
                            transparent
                            onChange={(event, { value }) => this.setState({passwordToConfirm: value, isPasswordValid: true})}
                        />
                    </p>
                    {this.state.isPasswordValid ? null : <p style={{color: 'red'}}>Password is not valid!</p>}
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