import React, {Component} from 'react';
import {Button, Form, Grid, Header, Message, Icon} from 'semantic-ui-react';
import InputField from '../input-field';
import {connect} from 'react-redux';
import {transformSelectOptions} from '../../util';
import {adminActionCreator, clientActionCreator, globalActionCreator} from '../../store/actions';
import moment from 'moment';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

class StartForm extends Component {

    state = {
        isFormSubmited: this.props.sidebarView ? true : false,
        isFormDataValid: false,
        isTouchedAfterSubmited: false
    }

    componentDidMount () {
        this.onReloadFieldsDataHandler();
    }

    componentDidUpdate (prevProps) {
        if (!this.props.sidebarView && this.props.fetchErrorsCounter.length > 0) {
            this.onReloadFieldsDataHandler(this.props.fetchErrorsCounter);
        }
        if (prevProps.fetchRequestsCounter.length > 0 &&
            this.props.fetchRequestsCounter.length === 0 &&
            this.props.fetchErrorsCounter.length === 0) {
            for (const key in this.props.form) {
                if (this.props.form[key].config.defaultOptions) {
                    let options = transformSelectOptions(
                        this.props.form[key].config.source, 
                        this.props.models, {}, 
                        this.props.form[key].config.defaultOptions
                    );
                    new Promise(handle => handle())
                        .then(() => this.props.changeFormFieldConfig('clientStartForm', key, {
                            defaultOptions: options
                        }));
                }
            }
        }
        if (prevProps.form.city_id.value !== this.props.form.city_id.value ||
            prevProps.form.clock_id.value !== this.props.form.clock_id.value ||
            prevProps.form.start_date.value !== this.props.form.start_date.value) {
            this.setState({isTouchedAfterSubmited: true});
        }
    }

    checkFetchSuccessByKey = (key) => {
        let result = true;
        if (this.props.form[key].config.source) {
            this.props.form[key].config.source.forEach(src => {
                result = result && !this.props.fetchErrorsCounter.includes(src);
            });
        }
        return result;
    }

    checkOptionsLoading = (key) => {
        let result = true;
        if (this.props.form[key].config.source) {
            this.props.form[key].config.source.forEach(src => {
                result = result && !this.props.fetchRequestsCounter.includes(src);
            });
        }
        return !result;
    }

    onReloadFieldsDataHandler = (source) => {
        if (source) {
            source.forEach(src => this.props.fetchData(null, src));
            return;
        }
        for (const key in this.props.form) {
            if (this.props.form[key].config.source) {
                this.props.form[key].config.source.forEach(src => {
                    this.props.fetchData(null, src);
                });
            }
        }
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid) {
            this.props.hideStartForm();
            if (this.props.sidebarView) {
                this.props.setReloadDataTrigger(true);
            }
        }
    }

    onDatePickerCloseHandler = () => {
        if (this.props.global.ui.mobile && this.props.sidebarView) {
            this.props.toggleSideBar();
            this.props.toggleSideBarButtonPress();
        }
    }

    render() {
        const formFieldsArray = [];
        let isFormDataValid = true;
        let messageContent = 'You must specify a city, a type of clock and date/time before search running.';

        for (const key in this.props.form) {
            formFieldsArray.push({
                key: key,
                ...this.props.form[key]
            });
            isFormDataValid = isFormDataValid && this.props.form[key].isValid;
            if (key === 'start_date' && this.props.form[key].value !== '') {
                let currentDate = moment();
                let startDate = moment(this.props.form[key].value, 'DD-MM-YYYY HH:mm');
                if (startDate < currentDate) {
                    isFormDataValid = false;
                    messageContent = 'Reserving date and time can not be erlier than the current one.'
                }
            }
        }

        return (
            <Grid 
                className={styles.startForm}
                textAlign={this.props.sidebarView ? 'left' : 'center'}
                verticalAlign='middle'
            >
                <Grid.Column>
                    <Message 
                        className={`${this.props.sidebarView ? 'sidebarView' : ''}`}
                        hidden={this.state.isFormSubmited ? isFormDataValid : true}
                        error
                        header='Warning!'
                        content={messageContent}
                    />
                    <Message 
                        className={'sidebarView'}
                        hidden={!(this.props.sidebarView && this.state.isTouchedAfterSubmited)}
                        info
                        header='Be aware!'
                        content='Search params are changed, but displayed data is not updated. To fix this, click the <Find!> button below.'
                    />
                    {!this.props.sidebarView &&
                        <Header 
                            as='h2'
                            textAlign='center'
                        >
                            Start searching for watchmakers
                        </Header>
                    }
                    <Form
                        className={!this.props.sidebarView ? 'large' : ''}
                        onSubmit={this.onFormSubmitHandler}
                    >
                        {formFieldsArray.map(formField => {
                            let loading = this.checkOptionsLoading(formField.key) || !this.checkFetchSuccessByKey(formField.key);
                            let options = formField.config.defaultOptions ? formField.config.defaultOptions : [];
                            let text = options.filter(opt => opt.key === formField.value)[0] ? options.filter(opt => opt.key === formField.value)[0].text : '';
                            return (
                                <Form.Field
                                    key={formField.key}
                                    onFocus={() => this.setState({isFormSubmited: false})}
                                >
                                    {this.props.sidebarView && <label>{formField.config.label}</label>}
                                    <InputField 
                                        className={`${formField.value !== '' ? 'notempty' : ''} ${this.props.sidebarView ? 'sidebarView' : ''}`}
                                        elementType={formField.elementType}
                                        inputType={formField.config.type}
                                        icon={formField.config.icon}
                                        iconPosition={formField.config.iconPosition}
                                        loading={loading}
                                        mobile={this.props.global.ui.mobile}
                                        options={options}
                                        placeholder={formField.config.placeholder}
                                        text={text}
                                        value={formField.value}
                                        onChange={(event, {value}) => this.props.changeFormFieldValue('clientStartForm', formField.key, {value})}
                                        onClose={this.onDatePickerCloseHandler}
                                    />
                                </Form.Field>
                            );
                        })}
                        <Form.Field>
                            <Button 
                                floated='right'
                                size={this.props.sidebarView ? null : 'large'}
                                fluid={!this.props.sidebarView}
                                secondary={!this.props.sidebarView}
                                circular={!this.props.sidebarView}
                                onClick={() => this.setState({isFormSubmited: true, isFormDataValid, isTouchedAfterSubmited: false})}
                            >
                                Find
                                <Icon name='right chevron' />
                            </Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global,
        form: state.client.forms.clientStartForm,
        models: state.admin.models,
        fetchRequestsCounter: state.admin.ui.fetchRequestsCounter,
        fetchErrorsCounter: state.admin.ui.fetchErrorsCounter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeFormFieldValue: (formKey, formFieldKey, {value}, touched) => dispatch(clientActionCreator.changeFormFieldValue(formKey, formFieldKey, value, touched)),
        changeFormFieldConfig: (formKey, formFieldKey, newConfig) => dispatch(clientActionCreator.changeFormFieldConfig(formKey, formFieldKey, newConfig)), 
        fetchData: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model)),
        setReloadDataTrigger: (flag) => dispatch(clientActionCreator.setReloadDataTrigger(flag)),
        hideStartForm: () => dispatch(clientActionCreator.hideStartForm()),
        toggleSideBar: () => dispatch(globalActionCreator.toggleSidebar()),
        toggleSideBarButtonPress: () => dispatch(globalActionCreator.toggleSidebarButtonPress())
    };
};

StartForm.propTypes = {
    sidebarView: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(StartForm);