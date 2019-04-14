import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';
import InputField from '../input-form/input-field';
import { refreshInpFormState, changeInpFormState } from '../../store/actions';

class InputForm extends Component {

    render () {

        const formFieldsArray = [];
        for (const key in this.props.forms[this.props.model]) {
            formFieldsArray.push({
                key: key,
                ...this.props.forms[this.props.model][key]
            });
        }

        return (
            <Modal 
                trigger={<Button>Get Form!</Button>}
                size='tiny'
                onOpen={() => this.props.onFormOpenHandler(this.props.model)}
            >
                <Modal.Header>
                    {this.props.update ?
                        this.props.model.toUpperCase() + ': edit entry' :
                        this.props.model.toUpperCase() + ': add entry'}
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        {formFieldsArray.map(formField => (
                            <Form.Field
                                error={!formField.isValid && formField.touched}
                                onBlur={(event) => this.props.onInputChangeHandler(event, this.props.model, formField.key)}
                            >
                                <label>{formField.config.label}</label> 
                                <InputField 
                                    key={formField.key}
                                    elementType={formField.elementType}
                                    inputType={formField.config.type}
                                    disabled={formField.config.restrictions.disabled}
                                    readOnly={formField.config.restrictions.readOnly}
                                    icon={formField.config.icon}
                                    iconPosition={formField.config.iconPosition}
                                    placeholder={formField.config.placeholder}
                                    value={formField.value}
                                    mobile={this.props.mobile}
                                    changed={(event) => this.props.onInputChangeHandler(event, this.props.model, formField.key)}
                                />
                            </Form.Field>
                        ))}
                        <Form.Group widths='equal'>
                                <Form.Field>
                                <Button type='submit' fluid positive>{this.props.update ? 'UPDATE' : 'ADD'}</Button>
                                </Form.Field>
                                <Form.Field>
                                <Button as='a' basic fluid>Cancel</Button>
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
        onFormOpenHandler: (model) => dispatch(refreshInpFormState(model)),
        onInputChangeHandler: (event, model, formFieldKey) => dispatch(changeInpFormState(event, model, formFieldKey))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);

