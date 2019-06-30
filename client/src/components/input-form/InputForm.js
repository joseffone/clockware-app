import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Message, Icon, Confirm } from 'semantic-ui-react';
import InputField from '../input-form/input-field';
import { refreshInpFormState, changeInpFormState, loginRequest, fetchDataRequest, createDataRequest, updateDataRequest } from '../../store/actions';
import { transformSelectOptions } from '../../util';

class InputForm extends Component {

    state = {
        isModalOpen: false,
        isFormDataValid: true,
        isFormSubmited: false,
        update: this.props.update,
        lastRequestType: null,
        deleteRequest: false ///
    }

    componentDidMount () {
        if (this.props.update) {
            for (const key in this.props.update) {
                this.props.onInputChangeHandler({target: {value: null}}, this.props.model, key, {value: this.props.update[key]});
            }
        }
    }

    componentDidUpdate (prevProps) {
        if (this.state.isFormSubmited) {
            let updateFlag = false;
            let createFlag = false;
            if (this.state.update) {
                if (this.props.models[this.props.model].updatedItem && !this.props.models[this.props.model].loading.isUpdating) {
                    for (const key in this.props.models[this.props.model].updatedItem) {
                        if (!prevProps.models[this.props.model].updatedItem) {
                            updateFlag = true;
                            this.props.onInputChangeHandler({target: {value: null}}, this.props.model, key, {value: this.props.models[this.props.model].updatedItem[key]});
                            continue;
                        }
                        if (!!prevProps.models[this.props.model].updatedItem[key] &&
                            !!this.props.models[this.props.model].updatedItem[key] &&
                            (prevProps.models[this.props.model].updatedItem[key] !== this.props.models[this.props.model].updatedItem[key])) {
                            updateFlag = true;
                            this.props.onInputChangeHandler(null, this.props.model, key, {value: this.props.models[this.props.model].updatedItem[key]});
                        }
                    }
                }
            } else {
                if (this.props.models[this.props.model].createdItem && !this.props.models[this.props.model].loading.isCreating) {
                    for (const key in this.props.models[this.props.model].createdItem) {
                        if (!prevProps.models[this.props.model].createdItem) {
                            createFlag = true;
                            this.props.onInputChangeHandler({target: {value: null}}, this.props.model, key, {value: this.props.models[this.props.model].createdItem[key]});
                            continue;
                        }
                        if (!!prevProps.models[this.props.model].createdItem[key] &&
                            !!this.props.models[this.props.model].createdItem[key] &&
                            (prevProps.models[this.props.model].createdItem[key] !== this.props.models[this.props.model].createdItem[key])) {
                            createFlag = true;
                            this.props.onInputChangeHandler(null, this.props.model, key, {value: this.props.models[this.props.model].createdItem[key]});
                        }
                    }
                }
            }
            if (createFlag) {
                this.setState({update: true, lastRequestType: 'add', isFormSubmited: false});
            }
            if (updateFlag) {
                this.setState({lastRequestType: 'update', isFormSubmited: false});
            }
        }
    }

    onModalOpenHandler = () => {
        this.setState({
            isModalOpen: true,
            isFormSubmited: false,
            isFormDataValid: true,
            update: this.props.update,
            lastRequestType: null,
            deleteRequest: false ///
        });
    }

    onModalCloseHandler = () => {
        this.setState({
            isModalOpen: false
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
            let  formDataObj = {};
            for (const key in this.props.forms[this.props.model]) {
                if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'deleted_at') {
                    formDataObj[key] = this.props.forms[this.props.model][key].value;
                }
            }
            if (this.state.update) {
                return this.props.onUpdateDataHandler(this.props.auth.accessToken, this.props.model, this.props.forms[this.props.model].id.value, formDataObj);
            }
            return this.props.onCreateDataHandler(this.props.auth.accessToken, this.props.model, formDataObj);
        }
    }

    render () {

        const Trigger = this.props.trigger;
        const formFieldsArray = [];
        let isFormDataValid = true;
        let formDataError = !this.state.isFormDataValid;
        let fetchError = false;
        let createError = !this.state.update && this.state.isFormSubmited && !!this.props.models[this.props.model].error.createError;
        let updateError = !!this.state.update && this.state.isFormSubmited && !!this.props.models[this.props.model].error.updateError;
        let deleteError = !!this.state.update && this.state.deleteRequest && !!this.props.models[this.props.model].error.deleteError;
        let authError = this.state.isFormSubmited && !!this.props.auth.error;
        let messageHeader = null;
        let messageContent = null;

        for (const key in this.props.forms[this.props.model]) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms[this.props.model][key]
            });
            isFormDataValid = isFormDataValid && this.props.forms[this.props.model][key].isValid;
        }

        for (const key in this.props.forms[this.props.model]) {
            if (this.props.forms[this.props.model][key].config.source) {
                fetchError = true;
                this.props.forms[this.props.model][key].config.source.forEach(src => {
                    fetchError = fetchError && !!this.props.models[src].error.fetchError;
                    if (fetchError) {
                        messageHeader = `${this.props.models[src].error.fetchError.response.status} ${this.props.models[src].error.fetchError.response.statusText}`;
                        messageContent = `${this.props.models[src].error.fetchError.response.data.error ? this.props.models[src].error.fetchError.response.data.error.message + '.' : 'Not able to get data.'}`;
                    }
                });
                if (fetchError) break;
            }
        }

        if (formDataError) {
            messageHeader = 'Form validation error!';
            messageContent = 'Some fields are empty or contain invalid data. Check your inputs before submiting.';
        }

        if (createError && !formDataError) {
            messageHeader = `${this.props.models[this.props.model].error.createError.response.status} ${this.props.models[this.props.model].error.createError.response.statusText}`;
            messageContent = `${this.props.models[this.props.model].error.createError.response.data.error ? this.props.models[this.props.model].error.createError.response.data.error.message + '.' : 'Not able to create entry.'}`;
        }

        if (updateError && !formDataError) {
            messageHeader = `${this.props.models[this.props.model].error.updateError.response.status} ${this.props.models[this.props.model].error.updateError.response.statusText}`;
            messageContent = `${this.props.models[this.props.model].error.updateError.response.data.error ? this.props.models[this.props.model].error.updateError.response.data.error.message + '.' : 'Not able to update entry.'}`;
        }

        if (authError && !formDataError) {
            messageHeader = `${this.props.auth.error.response.status} ${this.props.auth.error.response.statusText}`;
            messageContent = `${this.props.auth.error.response.data.error ? this.props.auth.error.response.data.error.message + '.' : 'Authentication failed.'}`;
        }

        ///
        if (deleteError) {
            messageHeader = `${this.props.models[this.props.model].error.deleteError.response.status} ${this.props.models[this.props.model].error.deleteError.response.statusText}`;
            messageContent = `${this.props.models[this.props.model].error.deleteError.response.data.error ? this.props.models[this.props.model].error.deleteError.response.data.error.message + '.' : 'Not able to delete entry.'}`;
        }

        if (this.state.lastRequestType === 'add') {
            messageHeader = 'Request completed!';
            messageContent = 'Entry created successfully.';
        }

        if (this.state.lastRequestType === 'update') {
            messageHeader = 'Request completed!';
            messageContent = 'Entry updated successfully.';
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
                    <Icon name={this.props.model === 'authentication' ? 'lock' : 'file alternate'} />
                    {this.props.model === 'authentication' ? 
                    this.props.model.split('')[0].toUpperCase() + this.props.model.split('').slice(1).join('') : 
                    this.state.update ? this.props.model.toUpperCase() + ': editing' : this.props.model.toUpperCase() + ': adding'}
                </Modal.Header>
                <Modal.Content>
                    <Form 
                        loading={this.props.auth.isLoading || this.props.models[this.props.model].loading.isCreating || this.props.models[this.props.model].loading.isUpdating || this.props.models[this.props.model].loading.isDeleting}
                        error={formDataError || fetchError || createError || updateError || deleteError || authError} ///
                        onSubmit={this.onFormSubmitHandler}
                    >
                        {formFieldsArray.map(formField => (
                            <Form.Field
                                key={formField.key}
                                error={!formField.isValid && formField.touched}
                                onChange={() => this.setState({isFormDataValid: true, isFormSubmited: false})}
                                onFocus={() => (formField.elementType === 'select' || formField.elementType === 'datetime') ? this.setState({isFormDataValid: true, isFormSubmited: false}) : null}
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
                                    loading={formField.config.source ? formField.config.source.length !== 0 ? this.props.models[formField.config.source[0]].loading.isFetching : false : false}
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
                            header={messageHeader}
                            content={messageContent}
                        />
                        <Message
                            positive
                            hidden={!this.state.lastRequestType}
                            header={messageHeader}
                            content={messageContent}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Button 
                                    type='submit'
                                    fluid 
                                    positive
                                    onClick={() => this.setState({isFormDataValid: isFormDataValid, isFormSubmited: true, lastRequestType: null, deleteRequest: false})}///
                                >
                                    <Icon name={this.props.model === 'authentication' ? 'unlock' : this.state.update ? 'save' : 'add'} />
                                    {this.props.model === 'authentication' ? 'LOGIN' : this.state.update ? 'SAVE' : 'ADD'}
                                </Button>
                            </Form.Field>
                            {this.state.update ?
                                <Form.Field>
                                    <Button
                                        fluid
                                        negative
                                    >
                                        <Icon name='trash alternate' />
                                        DELETE
                                    </Button>
                                </Form.Field>
                            : null}
                            <Form.Field>
                                <Button
                                    fluid
                                    onClick={this.onModalCloseHandler}
                                >
                                    <Icon name='close' />
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
        onCreateDataHandler: (accessToken, model, dataObj) => dispatch(createDataRequest(accessToken, model, dataObj)),
        onUpdateDataHandler: (accessToken, model, id, dataObj) => dispatch(updateDataRequest(accessToken, model, id, dataObj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

