import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import InputField from '../input-form/input-field';
import { getFormConfig, rewriteObjectProps, validateInput } from '../../util';

class InputForm extends Component {

    state = {}

    onFormOpenHandler = () => {
        this.setState({
            fields: {
                ...getFormConfig(this.props.model)
            }
        });
    }

    onInputChangeHandler = (event, formFieldKey) => {
        const updatedFields = rewriteObjectProps(this.state.fields, {
            [formFieldKey]: rewriteObjectProps(this.state.fields[formFieldKey], {
                value: event.target.value,
                isValid: validateInput(event.target.value || '', this.state.fields[formFieldKey].config.restrictions),
                touched: true
            })
        });
        this.setState({fields: updatedFields});
    }

    render () {

        const formFieldsArray = [];
        for (let key in this.state.fields) {
            formFieldsArray.push({
                key: key,
                ...this.state.fields[key]
            });
        }

        return (
            <Modal 
                trigger={<Button>Get Form!</Button>}
                size='tiny'
                onOpen={this.onFormOpenHandler}
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
                                onBlur={(event) => this.onInputChangeHandler(event, formField.key)}
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
                                    mobile={this.state.isMobile}
                                    changed={(event) => this.onInputChangeHandler(event, formField.key)}
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

export default InputForm;

