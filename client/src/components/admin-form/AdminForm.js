import React, {Component} from 'react';
import {Modal, Form, Button, Message, Icon, Confirm} from 'semantic-ui-react';
import InputField from '../input-field';
import ConfirmPassword from './confirm-password';
import {connect} from 'react-redux';
import {adminActionCreator, authActionCreator} from '../../store/actions';
import {transformSelectOptions, adminFormTypesConfig} from '../../util';
import moment from 'moment';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

class AdminForm extends Component {

    state = {
        isModalOpen: false,
        isFormDataValid: true,
        isFormSubmited: false,
        update: this.props.update,
        lastRequestType: null,
        isConfirmDeleteOpen: false,
        isConfirmPasswordOpen: false,
        dateKeys: ['start_date', 'expiration_date', 'created_at', 'updated_at', 'deleted_at']
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
                            this.props.changeFormFieldValue(
                                {target: {value: null}}, 
                                this.props.model, 
                                key, 
                                {value: this.state.dateKeys.includes(key) 
                                    ? moment(this.props.models[this.props.model].updatedItem[key]).format('DD-MM-YYYY HH:mm') 
                                    : this.props.models[this.props.model].updatedItem[key]
                                }
                            );
                            continue;
                        }
                        if (prevProps.models[this.props.model].updatedItem[key] &&
                            this.props.models[this.props.model].updatedItem[key] &&
                            (prevProps.models[this.props.model].updatedItem[key] !== this.props.models[this.props.model].updatedItem[key])) {
                            updateFlag = true;
                            this.props.changeFormFieldValue(
                                {target: {value: null}}, 
                                this.props.model, 
                                key, 
                                {value: this.state.dateKeys.includes(key) 
                                    ? moment(this.props.models[this.props.model].updatedItem[key]).format('DD-MM-YYYY HH:mm') 
                                    : this.props.models[this.props.model].updatedItem[key]
                                }
                            );
                        }
                    }
                }
            }
            if (!this.state.update) {
                if (this.props.models[this.props.model].createdItem.length !== 0 && !this.props.models[this.props.model].loading.isCreating) {
                    for (const key in this.props.models[this.props.model].createdItem[0]) {
                        if (prevProps.models[this.props.model].createdItem.length === 0) {
                            createFlag = true;
                            this.props.changeFormFieldValue(
                                {target: {value: null}}, 
                                this.props.model, 
                                key, 
                                {value: this.state.dateKeys.includes(key) 
                                    ? moment(this.props.models[this.props.model].createdItem[0][key]).format('DD-MM-YYYY HH:mm') 
                                    : this.props.models[this.props.model].createdItem[0][key]
                                }
                            );
                            continue;
                        }
                        if (prevProps.models[this.props.model].createdItem[0][key] &&
                            this.props.models[this.props.model].createdItem[0][key] &&
                            (prevProps.models[this.props.model].createdItem[0][key] !== this.props.models[this.props.model].createdItem[0][key])) {
                            createFlag = true;
                            this.props.changeFormFieldValue(
                                {target: {value: null}}, 
                                this.props.model, 
                                key, 
                                {value: this.state.dateKeys.includes(key) 
                                    ? moment(this.props.models[this.props.model].createdItem[0][key]).format('DD-MM-YYYY HH:mm') 
                                    : this.props.models[this.props.model].createdItem[0][key]
                                }
                            );
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
                    this.props.resetFormFields(this.props.model);
                });
            }
        }
        if (this.props.model === 'orders' && !this.state.isFormSubmited) {
            if (this.props.forms[this.props.model].clock_id.value !== '') {
                if ((prevProps.forms[this.props.model].start_date.value !== this.props.forms[this.props.model].start_date.value &&
                    this.props.forms[this.props.model].start_date.value !== '') ||
                    (prevProps.forms[this.props.model].clock_id.value !== this.props.forms[this.props.model].clock_id.value &&
                    this.props.forms[this.props.model].start_date.value !== '')
                ) {
                    this.props.changeFormFieldValue(
                        {target: {value: null}}, 
                        this.props.model, 
                        'expiration_date', 
                        {value: moment(this.props.forms[this.props.model].start_date.value, 'DD-MM-YYYY HH:mm')
                                .add(this.props.models.clocks.items.find(({id}) => id === this.props.forms[this.props.model].clock_id.value).hours_of_repair, 'h')
                                .format('DD-MM-YYYY HH:mm')
                        }
                    );
                }
                if ((prevProps.forms[this.props.model].expiration_date.value !== this.props.forms[this.props.model].expiration_date.value &&
                    this.props.forms[this.props.model].expiration_date.value !== '') ||
                    (prevProps.forms[this.props.model].clock_id.value !== this.props.forms[this.props.model].clock_id.value &&
                    this.props.forms[this.props.model].start_date.value === '' &&
                    this.props.forms[this.props.model].expiration_date.value !== '')
                ) {
                    this.props.changeFormFieldValue(
                        {target: {value: null}}, 
                        this.props.model, 
                        'start_date', 
                        {value: moment(this.props.forms[this.props.model].expiration_date.value, 'DD-MM-YYYY HH:mm')
                                .subtract(this.props.models.clocks.items.find(({id}) => id === this.props.forms[this.props.model].clock_id.value).hours_of_repair, 'h')
                                .format('DD-MM-YYYY HH:mm')
                        }
                    );
                }
            }
        }
    }

    checkFetchSuccessByKey = (key) => {
        let result = true;
        if (this.props.forms[this.props.model][key].config.source) {
            this.props.forms[this.props.model][key].config.source.forEach(src => {
                result = result && !this.props.fetchErrorsCounter.includes(src);
            });
        }
        return result;
    }

    checkOptionsLoading = (key) => {
        let result = true;
        if (this.props.forms[this.props.model][key].config.source) {
            this.props.forms[this.props.model][key].config.source.forEach(src => {
                result = result && !this.props.fetchRequestsCounter.includes(src);
            });
        }
        return !result;
    }

    onReloadFieldsDataHandler = (source) => {
        if (source) {
            source.forEach(src => this.props.fetchData(this.props.auth.accessToken, src));
            return;
        }
        for (const key in this.props.forms[this.props.model]) {
            if (this.props.forms[this.props.model][key].config.source) {
                this.props.forms[this.props.model][key].config.source.forEach(src => {
                    this.props.fetchData(this.props.auth.accessToken, src);
                });
            }
        }
    }

    onReloadFieldsDataButtonClickHandler = (event) => {
        event.preventDefault();
        this.onReloadFieldsDataHandler(this.props.fetchErrorsCounter);
    }

    onTriggerClickHandler = () => {
        this.setState({
            isModalOpen: true,
            isFormSubmited: false,
            isFormDataValid: true,
            update: this.props.update,
            lastRequestType: null
        });
    }

    onResetButtonClickHandler = () => {
        this.setState({
            isFormSubmited: false,
            isFormDataValid: true,
            update: this.props.update,
            lastRequestType: null
        }, () => this.onFormLoadHandler());
    }

    onClearFieldButtonClickHandler = (event, key) => {
        event.preventDefault();
        this.props.changeFormFieldValue({target: {value: ''}}, this.props.model, key, {value: null}, true);
    }

    onCloseButtonClickHandler = () => {
        this.setState({isModalOpen: false}, () => {
            this.props.resetFormFields(this.props.model);
            if (this.props.refreshAfterClose) {
                this.props.setReloadDataTrigger(this.props.model, true);
            }
        });
    }

    onFormLoadHandler = () => {
        this.props.resetFormFields(this.props.model);
        this.onReloadFieldsDataHandler();
        if (this.props.update) {
            for (const key in this.props.update) {
                let value = this.props.update[key];
                if (this.state.dateKeys.includes(key)) {
                    value = moment(this.props.update[key]).format('DD-MM-YYYY HH:mm');
                }
                this.props.changeFormFieldValue({target: {value: null}}, this.props.model, key, {value}, false);
            }
        }
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid && !this.state.isConfirmDeleteOpen) {
            if (this.props.model === 'authentication') {
                return this.props.loginUser({
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
                    if (key === 'start_date' || key === 'expiration_date') {
                        formDataObj[key] = moment(this.props.forms[this.props.model][key].value, 'DD-MM-YYYY HH:mm');
                        continue;
                    }
                    if (key === 'note') {
                        formDataObj[key] = this.props.forms[this.props.model][key].value === '' ? 'created by admin' : this.props.forms[this.props.model][key].value;
                        continue;
                    }
                    formDataObj[key] = this.props.forms[this.props.model][key].value;
                }
            }
            if (this.state.update) {
                return this.props.updateData(this.props.auth.accessToken, this.props.model, this.props.forms[this.props.model].id.value, formDataObj);
            }
            return this.props.createData(this.props.auth.accessToken, this.props.model, formDataObj);
        }
    }

    onDeleteRequestHandler = () => {
        this.setState({isFormSubmited: true, lastRequestType: 'delete', isConfirmDeleteOpen: false}, () => {
            this.props.deleteData(this.props.auth.accessToken, this.props.model, this.props.forms[this.props.model].id.value);
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
        let createError = !this.state.update && this.state.isFormSubmited && this.props.models[this.props.model].error.createError;
        let updateError = this.state.update && this.state.isFormSubmited && this.props.models[this.props.model].error.updateError;
        let deleteError = this.state.lastRequestType === 'delete' && this.state.isFormSubmited && this.props.models[this.props.model].error.deleteError;
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
                this.props.forms[this.props.model][key].config.source.forEach(src => {
                    if (this.props.fetchErrorsCounter.includes(src)) {
                        fetchError = true;
                        messageHeader = `${this.props.models[src].error.fetchError.response.status} ${this.props.models[src].error.fetchError.response.statusText}`;
                        messageContent = `${this.props.models[src].error.fetchError.response.data.error 
                            ? this.props.models[src].error.fetchError.response.data.error.message 
                            : 'Not able to get data.'}`;
                    }
                });
            }
        }

        if (formDataError) {
            messageHeader = 'Form validation error!';
            messageContent = 'Some fields are empty or contain invalid data. Check your inputs before submiting.';
        }

        if (createError && !formDataError) {
            messageHeader = `${this.props.models[this.props.model].error.createError.response.status} ${this.props.models[this.props.model].error.createError.response.statusText}`;
            messageContent = `${this.props.models[this.props.model].error.createError.response.data.error 
                ? this.props.models[this.props.model].error.createError.response.data.error.message 
                : 'Not able to create entry.'}`;
        }

        if (updateError && !formDataError) {
            messageHeader = `${this.props.models[this.props.model].error.updateError.response.status} ${this.props.models[this.props.model].error.updateError.response.statusText}`;
            messageContent = `${this.props.models[this.props.model].error.updateError.response.data.error 
                ? this.props.models[this.props.model].error.updateError.response.data.error.message 
                : 'Not able to update entry.'}`;
        }

        if (authError && !formDataError) {
            messageHeader = `${this.props.auth.error.response.status} ${this.props.auth.error.response.statusText}`;
            messageContent = `${this.props.auth.error.response.data.error 
                ? this.props.auth.error.response.data.error.message 
                : 'Authentication failed.'}`;
        }

        if (deleteError) {
            messageHeader = `${this.props.models[this.props.model].error.deleteError.response.status} ${this.props.models[this.props.model].error.deleteError.response.statusText}`;
            messageContent = `${this.props.models[this.props.model].error.deleteError.response.data.error 
                ? this.props.models[this.props.model].error.deleteError.response.data.error.message 
                : 'Not able to delete entry.'}`;
        }

        if (this.state.lastRequestType === 'add') {
            messageHeader = this.props.models[this.props.model].createdItem[1] ? 'Request completed!' : 'Request terminated';
            messageContent = this.props.models[this.props.model].createdItem[1] ? 'Entry created successfully.' : 'Entry already exists.';
        }

        if (this.state.lastRequestType === 'update') {
            messageHeader = 'Request completed!';
            messageContent = 'Entry updated successfully.';
        }

        return (
            <Modal 
                className={styles.adminForm}
                trigger={
                    <Trigger 
                        onClick={this.onTriggerClickHandler} 
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
                <Modal.Content
                    className={`${this.props.model === 'authentication' ? 'auth' : ''} ${this.props.global.ui.mobile ? 'mobile' : ''}`}
                >
                    <Form 
                        loading={
                            this.props.auth.isLoading || 
                            this.props.models[this.props.model].loading.isCreating || 
                            this.props.models[this.props.model].loading.isUpdating || 
                            this.props.models[this.props.model].loading.isDeleting
                        }
                        error={formDataError || fetchError || createError || updateError || deleteError || authError}
                        onSubmit={() => this.props.model === 'users' && isPasswordFieldTouched ? null : this.onFormSubmitHandler()}
                    >
                        {formFieldsArray.map(formField => {
                            let loading = this.checkOptionsLoading(formField.key);
                            let isLoadingFailed = !this.checkFetchSuccessByKey(formField.key);
                            let options = transformSelectOptions(formField.config.source, this.props.models, this.props.forms, formField.config.defaultOptions);
                            let option = options.filter(opt => opt.key === formField.value)[0] || {text: ''};
                            return (
                                <Form.Group 
                                    key={formField.key}
                                    widths={2} 
                                    unstackable
                                >
                                    <Form.Field
                                        error={!formField.isValid && formField.touched}
                                        onChange={() => this.setState({isFormDataValid: true, isFormSubmited: false})}
                                        onFocus={() => (formField.elementType === 'select' || formField.elementType === 'datetime') 
                                            ? this.setState({isFormDataValid: true, isFormSubmited: false}) 
                                            : null
                                        }
                                    >
                                        <label>{formField.config.label}</label> 
                                        <InputField
                                            disabled={formField.config.restrictions.disabled}
                                            elementType={formField.elementType}
                                            inputType={formField.config.type}
                                            icon={formField.elementType === 'select' && isLoadingFailed ? <Icon name='warning sign' className='warningICO'/> : formField.config.icon}
                                            iconPosition={formField.config.iconPosition}
                                            loading={loading}
                                            mobile={this.props.global.ui.mobile}
                                            options={options}
                                            placeholder={formField.config.placeholder}
                                            readOnly={formField.config.restrictions.readOnly}
                                            text={option.text}
                                            value={formField.value}
                                            onChange={(event, {value}) => this.props.changeFormFieldValue(event, this.props.model, formField.key, {value})}
                                            onBlur={(event) => this.props.changeFormFieldValue(event, this.props.model, formField.key, {
                                                value: formField.elementType === 'select' ? formField.value : null
                                            })}
                                        />
                                    </Form.Field>
                                     <Form.Field 
                                        disabled={formField.value === '' || formField.config.restrictions.readOnly}
                                    >
                                        <Button 
                                            as='a' 
                                            basic 
                                            circular 
                                            icon='eraser' 
                                            onClick={(event) => this.onClearFieldButtonClickHandler(event, formField.key)}
                                        />
                                    </Form.Field>
                                </Form.Group>
                            );
                         })}
                        <Message error icon>
                            <Message.Content>
                                <Message.Header>{messageHeader}</Message.Header>
                                {messageContent}
                            </Message.Content>
                            {fetchError && 
                                <Button 
                                    content={'Retry'} 
                                    onClick={this.onReloadFieldsDataButtonClickHandler} 
                                />
                            }
                        </Message>
                        <Message
                            positive
                            hidden={!this.state.lastRequestType || this.state.lastRequestType === 'delete' || !this.props.models[this.props.model].createdItem[1]}
                            header={messageHeader}
                            content={messageContent}
                        />
                        <Message
                            negative
                            hidden={!this.state.lastRequestType || this.state.lastRequestType === 'delete' || this.props.models[this.props.model].createdItem[1]}
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
                            currentPasswordValue={this.props.forms[this.props.model].password ? this.props.forms[this.props.model].password.value : ''}
                            onClose={() => this.setState({isConfirmPasswordOpen: false})}
                            onCancel={() => this.setState({isConfirmPasswordOpen: false})}
                            onConfirm={() => this.setState({
                                isFormDataValid: isFormDataValid, 
                                isFormSubmited: true, 
                                lastRequestType: null, 
                                isConfirmPasswordOpen: false
                            }, () => this.onFormSubmitHandler())}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field 
                                disabled={this.state.update && isFieldsNotTouched}
                            >
                                <Button 
                                    fluid 
                                    positive
                                    onClick={() => this.props.model === 'users' && isPasswordFieldTouched 
                                        ? this.setState({isConfirmPasswordOpen: true}) 
                                        : this.setState({isFormDataValid, isFormSubmited: true, lastRequestType: null})
                                    }
                                >
                                    <Icon name={this.props.model === 'authentication' ? 'unlock' : this.state.update ? 'save' : 'add'} />
                                    {this.props.model === 'authentication' ? 'Login' : this.state.update ? 'Save' : 'Add'}
                                </Button>
                            </Form.Field>
                            {this.state.update &&
                                <Form.Field>
                                    <Button
                                        fluid
                                        negative
                                        onClick={() => this.setState({isConfirmDeleteOpen: true})}
                                    >
                                        <Icon name='trash alternate' />
                                        Del
                                    </Button>
                                </Form.Field>
                            }
                            {!isFieldsNotTouched && this.props.model !== 'authentication' &&
                                <Form.Field>
                                    <Button
                                        fluid
                                        onClick={this.onResetButtonClickHandler}
                                    >
                                        <Icon name='recycle' />
                                        Reset
                                    </Button>
                                </Form.Field>
                            }
                            <Form.Field>
                                <Button
                                    fluid
                                    onClick={this.onCloseButtonClickHandler}
                                >
                                    <Icon name='close' />
                                    Close
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
        auth: state.auth,
        forms: state.admin.forms,
        models: state.admin.models,
        fetchRequestsCounter: state.admin.ui.fetchRequestsCounter,
        fetchErrorsCounter: state.admin.ui.fetchErrorsCounter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetFormFields: (model) => dispatch(adminActionCreator.resetFormFields(model)),
        changeFormFieldValue: (event, model, formFieldKey, { value }, touched) => dispatch(adminActionCreator.changeFormFieldValue(event, model, formFieldKey, value, touched)),
        loginUser: (loginData) => dispatch(authActionCreator.loginRequest(loginData)),
        fetchData: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model)),
        createData: (accessToken, model, dataObj) => dispatch(adminActionCreator.createDataRequest(accessToken, model, dataObj)),
        updateData: (accessToken, model, id, dataObj) => dispatch(adminActionCreator.updateDataRequest(accessToken, model, id, dataObj)),
        deleteData: (accessToken, model, id) => dispatch(adminActionCreator.deleteDataRequest(accessToken, model, id)),
        setReloadDataTrigger: (model, flag) => dispatch(adminActionCreator.setReloadDataTrigger(model, flag))
    };
};

AdminForm.propTypes = {
    refreshAfterClose: PropTypes.bool,
    model: PropTypes.oneOf(Object.keys(adminFormTypesConfig)).isRequired,
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]).isRequired,
    update: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);

