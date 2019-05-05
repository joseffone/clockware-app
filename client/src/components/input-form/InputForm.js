import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import InputField from '../input-form/input-field';
import { refreshInpFormState, changeInpFormState, loginRequest } from '../../store/actions';

class InputForm extends Component {

    state = {
        isModalOpen: false,
        isFormDataValid: true
    }

    onModalOpenHandler = () => {
        this.setState({isModalOpen: true});
    }

    onModalCloseHandler = () => {
        this.setState({
            isModalOpen: false,
            isFormDataValid: true
        });
    }

    onFormSubmitHandler = () => {
        if(this.state.isFormDataValid) {
            if (this.props.model === 'authentication') {
                return this.props.onUserLoginHandler({
                    email: this.props.forms.authentication.email.value,
                    password: this.props.forms.authentication.password.value
                });
            }
        }
    }

    render () {

        const Trigger = this.props.trigger;
        const formFieldsArray = [];
        let isFormDataValid = true;

        for (const key in this.props.forms[this.props.model]) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms[this.props.model][key]
            });
            isFormDataValid = isFormDataValid && this.props.forms[this.props.model][key].isValid;
        }

        return (
            <Modal 
                trigger={
                    <Trigger 
                        onClick={this.onModalOpenHandler} 
                    />
                }
                size={this.props.model === 'authentication' ? 'mini' : 'tiny'}
                open={this.state.isModalOpen}
                onOpen={() => this.props.onFormLoadHandler(this.props.model)}
            >
                <Modal.Header>
                    {this.props.model === 'authentication' ?
                        this.props.model.split('')[0].toUpperCase() + this.props.model.split('').slice(1).join('') :
                            this.props.update ?
                                this.props.model.toUpperCase() + ': edit entry' :
                                this.props.model.toUpperCase() + ': add entry'}
                </Modal.Header>
                <Modal.Content>
                    <Form 
                        loading={this.props.auth.isLoading}
                        error={!this.state.isFormDataValid}
                        onSubmit={this.onFormSubmitHandler}
                    >
                        {formFieldsArray.map(formField => (
                            <Form.Field
                                key={formField.key}
                                error={!formField.isValid && formField.touched}
                                onChange={() => this.setState({isFormDataValid: true})}
                                onBlur={(event) => this.props.onInputChangeHandler(event, this.props.model, formField.key)}
                            >
                                <label>{formField.config.label}</label> 
                                <InputField 
                                    key={formField.key}
                                    mobile={this.props.mobile}
                                    elementType={formField.elementType}
                                    inputType={formField.config.type}
                                    disabled={formField.config.restrictions.disabled}
                                    readOnly={formField.config.restrictions.readOnly}
                                    icon={formField.config.icon}
                                    iconPosition={formField.config.iconPosition}
                                    placeholder={formField.config.placeholder}
                                    options={formField.config.options}
                                    value={formField.value}
                                    changed={(event) => this.props.onInputChangeHandler(event, this.props.model, formField.key)}
                                />
                            </Form.Field>
                        ))}
                        <Message 
                            error
                            header={!this.state.isFormDataValid ? 'Validation error!' : null}
                            content={!this.state.isFormDataValid ? 'Some fields are empty or contain invalid data. Check your inputs before submiting.' : null}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Button 
                                    type='submit' 
                                    fluid 
                                    positive
                                    onClick={() => this.setState({isFormDataValid: isFormDataValid})}
                                >
                                    {this.props.model === 'authentication' ?
                                        'LOGIN' : this.props.update ? 'UPDATE' : 'ADD'}
                                </Button>
                            </Form.Field>
                            <Form.Field>
                                <Button 
                                    basic 
                                    fluid
                                    onClick={this.onModalCloseHandler}
                                >
                                    CANCEL
                                </Button>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        forms: state.forms,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormLoadHandler: (model) => dispatch(refreshInpFormState(model)),
        onInputChangeHandler: (event, model, formFieldKey) => dispatch(changeInpFormState(event, model, formFieldKey)),
        onUserLoginHandler: (loginDataObj) => dispatch(loginRequest(loginDataObj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

