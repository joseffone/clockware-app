import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header, Message} from 'semantic-ui-react';
import InputField from '../input-field';
import {transformSelectOptions} from '../../util';
import {adminActionCreator, clientActionCreator} from '../../store/actions';
import styles from './styles.module.css';

class StartForm extends Component {

    componentDidMount () {
        this.onFormLoadHandler();
    }

    onFormLoadHandler = () => {
        for (const key in this.props.form) {
            if (this.props.form[key].config.source) {
                this.props.form[key].config.source.forEach(src => {
                    this.props.onFetchDataHandler(this.props.auth.accessToken, src);
                });
            }
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
                        style={{borderRadius: '10rem'}}
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
                    >
                        {formFieldsArray.map(formField => (
                            <Form.Field>
                                <InputField 
                                    key={formField.key}
                                    mobile={this.props.global.ui.mobile}
                                    elementType={formField.elementType}
                                    inputType={formField.config.type}
                                    icon={formField.config.icon}
                                    iconPosition={formField.config.iconPosition}
                                    placeholder={formField.config.placeholder}
                                    loading={formField.config.source ? formField.config.source.length !== 0 ? this.props.models[formField.config.source[0]].loading.isFetching : false : false}
                                    options={transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions)}
                                    text={transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions).filter(opt => opt.key === formField.value)[0] ? transformSelectOptions(formField.config.source, this.props.models, formField.config.defaultOptions).filter(opt => opt.key === formField.value)[0].text : ''}
                                    value={formField.value}
                                    //changed={(event, { value }) => this.props.onInputChangeHandler(event, this.props.model, formField.key, { value })}
/*                                     blurred={(event) => this.props.onInputChangeHandler(event, this.props.model, formField.key, {
                                        value: formField.elementType === 'select' ? formField.value : null
                                    })} */
                                />
                            </Form.Field>
                        ))}
                        <Button 
                            as='a'
                            size='large'
                            secondary 
                            fluid 
                            circular
                            content='Go >>'
                        />

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
        models: state.admin.models
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataHandler: (accessToken, model) => dispatch(adminActionCreator.fetchDataRequest(accessToken, model))
    };
};

StartForm.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(StartForm);