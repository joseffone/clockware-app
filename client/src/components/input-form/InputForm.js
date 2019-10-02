import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Message, Icon, Confirm } from 'semantic-ui-react';
import InputField from '../input-form/input-field';
import ConfirmPassword from './confirm-password';
import { refreshInpFormState, changeInpFormState, loginRequest, fetchDataRequest, createDataRequest, updateDataRequest, deleteDataRequest } from '../../store/actions';
import { transformSelectOptions } from '../../util';
import formTypesConfig from '../../util/presets/formTypesConfig';
import PropTypes from 'prop-types';

class InputForm extends Component {

    state = {
        isModalOpen: false,
        isFormDataValid: true,
        isFormSubmited: false,
        update: this.props.update,
        lastRequestType: null,
        isConfirmDeleteOpen: false,
        isConfirmPasswordOpen: false
    }

    componentDidUpdate (prevProps) {
        if (this.state.isFormSubmited) {
            let updateFlag = false;
            let createFlag = false;
            let deleteFlag = false;
            if (this.state.lastRequestType === 'delete') {
                if (this.props.models[this.props.model].deletedItemIds.length !== 0 && !this.props.models[this.props.model].loading.isDeleting) {
                    if (prevProps.models[this.props.model].deletedItemIds[0] !== this.props.models[this.props.model].deletedItemIds[0]) {
                        deleteFlag = true;
                    }
                }
            }
            if (this.state.update && !this.props.update && this.state.lastRequestType !== 'delete') {
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
            }
            if (!this.state.update) {
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
            if (deleteFlag) {
                this.setState({lastRequestType: null, isFormSubmited: false, update: false}, () => {
                    this.props.onFormRefreshStateHandler(this.props.model);
                });
            }
        }
    }

    onModalOpenHandler = () => {
        this.setState({
            isModalOpen: true,
            isFormSubmited: false,
            isFormDataValid: true,
            update: this.props.update,
            lastRequestType: null
        });
    }

    onModalCloseHandler = () => {
        this.setState({
            isModalOpen: false
        }, () => {
            if (this.props.refreshAfterClose) {
                for (const key in this.props.forms[this.props.model]) {
                    if (this.props.forms[this.props.model][key].config.source) {
                        this.props.forms[this.props.model][key].config.source.forEach(src => {
                            this.props.onFetchDataHandler(this.props.auth.accessToken, src);
                        });
                    }
                }
                this.props.onFetchDataHandler(this.props.auth.accessToken, this.props.model);
            }
        });
    }

    onFormLoadHandler = () => {
        this.props.onFormRefreshStateHandler(this.props.model);
        if (!this.props.refreshAfterClose) {
            for (const key in this.props.forms[this.props.model]) {
                if (this.props.forms[this.props.model][key].config.source) {
                    this.props.forms[this.props.model][key].config.source.forEach(src => {
                        this.props.onFetchDataHandler(this.props.auth.accessToken, src);
                    });
                }
            }
        }
        if (this.props.update) {
            for (const key in this.props.update) {
                this.props.onInputChangeHandler({target: {value: null}}, this.props.model, key, {value: this.props.update[key]}, false);
            }
        }
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid && !this.state.isConfirmDeleteOpen) {
            if (this.props.model === 'authentication') {
                return this.props.onUserLoginHandler({
                    email: this.props.forms.authentication.email.value,
                    password: this.props.forms.authentication.password.value
                });
            }
            let  formDataObj = {};
            for (const key in this.props.forms[this.props.model]) {
                if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'deleted_at') {
                    if (key === 'password' && !this.props.forms[this.props.model][key].touched) {
                        continue;
                    }
                    formDataObj[key] = this.props.forms[this.props.model][key].value;
                }
            }
            if (this.state.update) {
                return this.props.onUpdateDataHandler(this.props.auth.accessToken, this.props.model, this.props.forms[this.props.model].id.value, formDataObj);
            }
            return this.props.onCreateDataHandler(this.props.auth.accessToken, this.props.model, formDataObj);
        }
    }

    onDeleteRequestHandler = () => {
        this.setState({isFormSubmited: true, lastRequestType: 'delete', isConfirmDeleteOpen: false}, () => {
            this.props.onDeleteDataHandler(this.props.auth.accessToken, this.props.model, this.props.forms[this.props.model].id.value);
        });
    }

    render () {

        const Trigger = this.props.trigger;
        const formFieldsArray = [];
        let isFormDataValid = true;
        let isFieldsNotTouched = true;
        let isPasswordFieldTouched = false;
        let formDataError = !this.state.isFormDataValid;
        let fetchError = false;
        let createError = !this.state.update && this.state.isFormSubmited && !!this.props.models[this.props.model].error.createError;
        let updateError = !!this.state.update && this.state.isFormSubmited && !!this.props.models[this.props.model].error.updateError;
        let deleteError = this.state.lastRequestType === 'delete' && this.state.isFormSubmited && !!this.props.models[this.props.model].error.deleteError;
        let authError = this.state.isFormSubmited && !!this.props.auth.error;
        let messageHeader = null;
        let messageContent = null;

        for (const key in this.props.forms[this.props.model]) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms[this.props.model][key]
            });
            isFormDataValid = isFormDataValid && this.props.forms[this.props.model][key].isValid;
            isFieldsNotTouched = isFieldsNotTouched && !this.props.forms[this.props.model][key].touched;
            if (key === 'password') {
                isPasswordFieldTouched = this.props.forms[this.props.model][key].touched;
            }
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
                        error={formDataError || fetchError || createError || updateError || deleteError || authError}
                        onSubmit={() => this.props.model === 'users' && isPasswordFieldTouched ? null : this.onFormSubmitHandler()}
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
                                    mobile={this.props.global.ui.mobile}
                                    elementType={formField.elementType}
                                    inputType={formField.config.type}
                                    disabled={formField.config.restrictions.disabled}
                                    readOnly={formField.config.restrictions.readOnly}
                                    icon={formField.config.icon}
                                    iconPosition={formField.config.iconPosition}
                                    placeholder={formField.config.placeholder}
                                    loading={formField.config.source ? formField.config.source.length !== 0 ? this.props.models[formField.config.source[0]].loading.isFetching : false : false}
                                    options={transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions)}
                                    text={transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions).filter(opt => opt.key === formField.value)[0] ? transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions).filter(opt => opt.key === formField.value)[0].text : ''}
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
                            hidden={!this.state.lastRequestType || this.state.lastRequestType === 'delete'}
                            header={messageHeader}
                            content={messageContent}
                        />
                        <Confirm
                            open={this.state.isConfirmDeleteOpen}
                            content='You are going to delete the entry. Do you confirm this action?'
                            cancelButton='No'
                            confirmButton='Yes'
                            onConfirm={this.onDeleteRequestHandler}
                            onCancel={() => this.setState({isConfirmDeleteOpen: false})}
                        />
                        <ConfirmPassword
                            open={this.state.isConfirmPasswordOpen}
                            onClose={() => this.setState({isConfirmPasswordOpen: false})}
                            onCancel={() => this.setState({isConfirmPasswordOpen: false})}
                            onConfirm={() => this.setState({isFormDataValid: isFormDataValid, isFormSubmited: true, lastRequestType: null, isConfirmPasswordOpen: false}, () => this.onFormSubmitHandler())}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field 
                                disabled={this.state.update && isFieldsNotTouched}
                            >
                                <Button 
                                    fluid 
                                    positive
                                    onClick={() => this.props.model === 'users' && isPasswordFieldTouched ? this.setState({isConfirmPasswordOpen: true}) : this.setState({isFormDataValid: isFormDataValid, isFormSubmited: true, lastRequestType: null})}
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
                                        onClick={() => this.setState({isConfirmDeleteOpen: true})}
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
                                    CLOSE
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
        global: state.global,
        forms: state.forms,
        auth: state.auth,
        models: state.admin.models
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormRefreshStateHandler: (model) => dispatch(refreshInpFormState(model)),
        onInputChangeHandler: (event, model, formFieldKey, { value }, touched) => dispatch(changeInpFormState(event, model, formFieldKey, value, touched)),
        onUserLoginHandler: (loginData) => dispatch(loginRequest(loginData)),
        onFetchDataHandler: (accessToken, model) => dispatch(fetchDataRequest(accessToken, model)),
        onCreateDataHandler: (accessToken, model, dataObj) => dispatch(createDataRequest(accessToken, model, dataObj)),
        onUpdateDataHandler: (accessToken, model, id, dataObj) => dispatch(updateDataRequest(accessToken, model, id, dataObj)),
        onDeleteDataHandler: (accessToken, model, id) => dispatch(deleteDataRequest(accessToken, model, id))
    };
};

InputForm.propTypes = {
    refreshAfterClose: PropTypes.bool,
    model: PropTypes.oneOf(Object.keys(formTypesConfig)).isRequired,
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    update: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

