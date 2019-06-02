import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import InputField from '../input-form/input-field';
import { refreshInpFormState, changeInpFormState, loginRequest, fetchDataRequest, createDataRequest } from '../../store/actions';
import { transformSelectOptions } from '../../util';

class InputForm extends Component {

    state = {
        isModalOpen: false,
        isFormDataValid: true,
        isFormSubmited: false
    }

    onModalOpenHandler = () => {
        this.setState({
            isModalOpen: true,
            isFormSubmited: false
        });
    }

    onModalCloseHandler = () => {
        this.setState({
            isModalOpen: false,
            isFormDataValid: true
        });
    }

    onFormLoadHandler = () => {
        this.props.onFormRefreshStateHandler(this.props.model);
        for (const key in this.props.forms[this.props.model]) {
            if (this.props.forms[this.props.model][key].config.source) {
                this.props.forms[this.props.model][key].config.source.forEach(src => {
                    this.props.onFetchDataHandler(this.props.auth.accessToken, src);
                });
            }
        }
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid) {
            if (this.props.model === 'authentication') {
                return this.props.onUserLoginHandler({
                    email: this.props.forms.authentication.email.value,
                    password: this.props.forms.authentication.password.value
                });
            }
            if (this.props.update) {

            }
    
            let  formDataObj = {};
            for (const key in this.props.forms[this.props.model]) {
                if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'deleted_at') {
                    formDataObj[key] = this.props.forms[this.props.model][key].value;
                }
            }
            return this.props.onCreateDataHandler(this.props.auth.accessToken, this.props.model, formDataObj);
        }
    }

    render () {

        const Trigger = this.props.trigger;
        const formFieldsArray = [];
        let isFormDataValid = true;
        let fetchError = true;
        let createError = true;
        let updateError = true;
        let formDataError = true;
        let errorMessageHeader = null;
        let errorMessageContent = null;
        let successMessageHeader = null;
        let successMessageContent = null;

        for (const key in this.props.forms[this.props.model]) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms[this.props.model][key]
            });
            isFormDataValid = isFormDataValid && this.props.forms[this.props.model][key].isValid;
        }

        for (const key in this.props.forms[this.props.model]) {
            if (this.props.forms[this.props.model][key].config.source) {
                this.props.forms[this.props.model][key].config.source.forEach(src => {
                    fetchError = fetchError && !!this.props.models[src].error.fetchError;
                    if (fetchError) {
                        errorMessageHeader = `${this.props.models[src].error.fetchError.response.status} ${this.props.models[src].error.fetchError.response.statusText}`;
                        errorMessageContent = `${this.props.models[src].error.fetchError.response.data.error ? this.props.models[src].error.fetchError.response.data.error.message + '.' : 'Not able to get data.'}`;
                    }
                });
            }
        }

        createError = createError && this.state.isFormSubmited && !!this.props.models[this.props.model].error.createError;
        updateError = updateError && this.state.isFormSubmited && !!this.props.models[this.props.model].error.updateError;
        formDataError = !this.state.isFormDataValid;

        if (formDataError) {
            errorMessageHeader = 'Form validation error!';
            errorMessageContent = 'Some fields are empty or contain invalid data. Check your inputs before submiting.';
        }

        if (createError) {
            errorMessageHeader = `${this.props.models[this.props.model].error.createError.response.status} ${this.props.models[this.props.model].error.createError.response.statusText}`;
            errorMessageContent = `${this.props.models[this.props.model].error.createError.response.data.error ? this.props.models[this.props.model].error.createError.response.data.error.message + '.' : 'Not able to create entry.'}`;
        }

        if (updateError) {
            errorMessageHeader = `${this.props.models[this.props.model].error.updateError.response.status} ${this.props.models[this.props.model].error.updateError.response.statusText}`;
            errorMessageContent = `${this.props.models[this.props.model].error.updateError.response.data.error ? this.props.models[this.props.model].error.updateError.response.data.error.message + '.' : 'Not able to update entry.'}`;
        }

        if (this.state.isFormSubmited && (this.props.models[this.props.model].createdItem || this.props.models[this.props.model].updatedItem)) {
            successMessageHeader = 'Request completed!';
            successMessageContent = this.props.update ? 'Entry updated successfully.' : 'Entry created successfully.'
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
                onOpen={this.onFormLoadHandler}
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
                        loading={this.props.auth.isLoading || this.props.models[this.props.model].loading.isCreating || this.props.models[this.props.model].loading.isUpdating}
                        error={formDataError || fetchError || createError || updateError}
                        onSubmit={this.onFormSubmitHandler}
                    >
                        {formFieldsArray.map(formField => (
                            <Form.Field
                                key={formField.key}
                                error={!formField.isValid && formField.touched}
                                onChange={() => this.setState({isFormDataValid: true})}
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
                                    loading={formField.config.source ? 
                                        formField.config.source.length !== 0 ?
                                            this.props.models[formField.config.source[0]].loading.isFetching : false
                                            : false}
                                    options={transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions)}
                                    value={formField.value}
                                    changed={(event, { value }) => this.props.onInputChangeHandler(event, this.props.model, formField.key, { value })}
                                    blurred={(event) => this.props.onInputChangeHandler(event, this.props.model, formField.key, {
                                        value: formField.elementType === 'select' ? formField.value : null
                                    })}
                                />
                            </Form.Field>
                        ))}
                        <Message 
                            error
                            header={errorMessageHeader}
                            content={errorMessageContent}
                        />
                        <Message
                            positive
                            hidden={!successMessageHeader}
                            header={successMessageHeader}
                            content={successMessageContent}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Button 
                                    type='submit' 
                                    fluid 
                                    positive
                                    onClick={() => this.setState({isFormDataValid: isFormDataValid, isFormSubmited: true})}
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
        auth: state.auth,
        models: state.admin.models
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormRefreshStateHandler: (model) => dispatch(refreshInpFormState(model)),
        onInputChangeHandler: (event, model, formFieldKey, { value }) => dispatch(changeInpFormState(event, model, formFieldKey, value)),
        onUserLoginHandler: (loginData) => dispatch(loginRequest(loginData)),
        onFetchDataHandler: (accessToken, model) => dispatch(fetchDataRequest(accessToken, model)),
        onCreateDataHandler: (accessToken, model, dataObj) => dispatch(createDataRequest(accessToken, model, dataObj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

