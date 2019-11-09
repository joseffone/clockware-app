import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header, Message} from 'semantic-ui-react';
import InputField from '../input-field';
import {transformSelectOptions} from '../../util';
import {adminActionCreator, clientActionCreator} from '../../store/actions';
import moment from 'moment';
import styles from './styles.module.css';

class StartForm extends Component {

    state = {
        isFormSubmited: false,
        isFormDataValid: false
    }

    componentDidMount () {
        this.onReloadFieldsDataHandler();
    }

    componentDidUpdate () {
        if (this.props.fetchErrorsCounter.length > 0) {
            this.onReloadFieldsDataHandler(this.props.fetchErrorsCounter);
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
            source.forEach(src => this.props.onFetchDataHandler(null, src));
            return;
        }
        for (const key in this.props.form) {
            if (this.props.form[key].config.source) {
                this.props.form[key].config.source.forEach(src => {
                    this.props.onFetchDataHandler(null, src);
                });
            }
        }
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid) {
            this.props.onHideStartFormHandler();
        }
    }

    render() {
        const formFieldsArray = [];
        let isFormDataValid = true;
        let messageContent = 'You must specify a city, a type of clock and date/time before search running';

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
                    messageContent = 'Reserving date and time can not be erlier than the current one'
                }
            }
        }


        return (
            <Grid 
                className={styles.startForm}
                textAlign='center'
                verticalAlign='middle'
            >
                <Grid.Column>
                    <Message 
                        hidden={this.state.isFormSubmited ? isFormDataValid : true}
                        error
                        header='Warning!'
                        content={messageContent}
                    />
                    <Header 
                        as='h2'
                        icon='clock outline'
                        textAlign='center'
                    >
                        Start searching for watchmakers
                    </Header>
                    <Form 
                        size='large'
                        onSubmit={this.onFormSubmitHandler}
                    >
                        {formFieldsArray.map(formField => (
                            <Form.Field
                                onFocus={() => this.setState({isFormSubmited: false})}
                            >
                                <InputField 
                                    className={formField.value !== '' ? 'notempty' : null}
                                    key={formField.key}
                                    mobile={this.props.global.ui.mobile}
                                    elementType={formField.elementType}
                                    inputType={formField.config.type}
                                    icon={formField.config.icon}
                                    iconPosition={formField.config.iconPosition}
                                    placeholder={formField.config.placeholder}
                                    loading={this.checkOptionsLoading(formField.key) || !this.checkFetchSuccessByKey(formField.key)}
                                    options={transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions)}
                                    text={transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions).filter(opt => opt.key === formField.value)[0] ? transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions).filter(opt => opt.key === formField.value)[0].text : ''}
                                    value={formField.value}
                                    changed={(event, { value }) => this.props.onInputChangeHandler(event, 'clientStartForm', formField.key, { value })}
                                />
                            </Form.Field>
                        ))}
                        <Form.Field>
                            <Button 
                                size='large'
                                secondary 
                                fluid 
                                circular
                                onClick={() => this.setState({isFormSubmited: true, isFormDataValid})}
                            >
                                Go >>
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
        auth: state.auth,
        form: state.client.forms.clientStartForm,
        models: state.admin.models,
        fetchRequestsCounter: state.admin.ui.fetchRequestsCounter,
        fetchErrorsCounter: state.admin.ui.fetchErrorsCounter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormRefreshStateHandler: (formKey) => dispatch(clientActionCreator.refreshFormState(formKey)),
        onInputChangeHandler: (event, formKey, formFieldKey, { value }, touched) => dispatch(clientActionCreator.changeFormState(event, formKey, formFieldKey, value, touched)),
        onFetchDataHandler: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model)),
        onSetReloadDataTrigger: (flag) => dispatch(clientActionCreator.setReloadDataTrigger(flag)),
        onHideStartFormHandler: () => dispatch(clientActionCreator.hideStartForm())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartForm);