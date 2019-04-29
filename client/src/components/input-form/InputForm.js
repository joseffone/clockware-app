import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';
import InputField from '../input-form/input-field';
import { refreshInpFormState, changeInpFormState } from '../../store/actions';

class InputForm extends Component {

    state = {
        isModalOpen: false
    }

    onModalOpenHandler = () => {
        this.setState({isModalOpen: true});
    }

    onModalCloseHandler = () => {
        this.setState({isModalOpen: false});
    }

    onFormSubmitHandler = () => {
        
    }

    render () {

        const Trigger = this.props.trigger;
        const formFieldsArray = [];

        for (const key in this.props.forms[this.props.model]) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms[this.props.model][key]
            });
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
                    <Form>
                        {formFieldsArray.map(formField => (
                            <Form.Field
                                key={formField.key}
                                error={!formField.isValid && formField.touched}
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
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Button 
                                    type='submit' 
                                    fluid 
                                    positive
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
        forms: state.forms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormLoadHandler: (model) => dispatch(refreshInpFormState(model)),
        onInputChangeHandler: (event, model, formFieldKey) => dispatch(changeInpFormState(event, model, formFieldKey))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

