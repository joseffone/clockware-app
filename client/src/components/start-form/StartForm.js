import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header, Message} from 'semantic-ui-react';
import InputField from '../input-field';
import {transformSelectOptions} from '../../util';
import {adminActionCreator, clientActionCreator} from '../../store/actions';
import styles from './styles.module.css';

class StartForm extends Component {

    state = {
        isFormSubmited: false,
        isFormDataValid: false
    }

    componentDidMount () {
        this.loadFieldsData();
    }

    componentDidUpdate () {
        if (this.props.reloadDataCounter === 0) {
            if (!this.checkFetchSuccessAll()) {
                this.loadFieldsData();
            }
        }
    }

    checkFetchSuccessAll = () => {
        let result = true;
        for (const key in this.props.form) {
            if (this.props.form[key].config.source) {
                this.props.form[key].config.source.forEach(src => {
                    result = result && this.props.models[src].error.fetchError === null;
                });
            }
        }
        return result;
    }

    checkFetchSuccessByKey = (key) => {
        let result = true;
        if (this.props.form[key].config.source) {
            this.props.form[key].config.source.forEach(src => {
                result = result && this.props.models[src].error.fetchError === null;
            });
        }
        return result;
    }

    checkOptionsLoading = (key) => {
        let result = true;
        if (this.props.form[key].config.source) {
            this.props.form[key].config.source.forEach(src => {
                result = result && this.props.models[src].loading.isFetching;
            });
            return result;
        }
        return false;
    }

    loadFieldsData = () => {
        for (const key in this.props.form) {
            if (this.props.form[key].config.source) {
                this.props.form[key].config.source.forEach(src => {
                    this.props.onFetchDataHandler(this.props.auth.accessToken, src);
                });
            }
        }
    }

    onFormSubmitHandler = () => {
        if (this.state.isFormDataValid) {
            alert('!!!');
        }
    }

    render() {
        const formFieldsArray = [];
        let isFormDataValid = true;

        for (const key in this.props.form) {
            formFieldsArray.push({
                key: key,
                ...this.props.form[key]
            });
            isFormDataValid = isFormDataValid && this.props.form[key].isValid;
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
                        content='You must specify a city, date and time before search running'
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
        reloadDataCounter: state.admin.ui.reloadDataCounter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormRefreshStateHandler: (formKey) => dispatch(clientActionCreator.refreshFormState(formKey)),
        onInputChangeHandler: (event, formKey, formFieldKey, { value }, touched) => dispatch(clientActionCreator.changeFormState(event, formKey, formFieldKey, value, touched)),
        onFetchDataHandler: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartForm);