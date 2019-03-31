import React, { Component } from 'react';
import { Modal, Form, Segment, Button } from 'semantic-ui-react';
import InputField from '../input-form/input-field/InputField';
import { getFormConfig } from '../../util/util';

class InputForm extends Component {

    state = {
        fields: {
            ...getFormConfig(this.props.model)
        }
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
            >
                <Segment>
                    <Form>
                        {formFieldsArray.map(formField => (
                            <Form.Field>
                                <label>{formField.config.label}</label> 
                                <InputField 
                                    key={formField.key}
                                    elementType={formField.elementType}
                                    inputType={formField.config.type}
                                    disabled={formField.config.restrictions.disabled}
                                    icon={formField.config.icon}
                                    iconPosition={formField.config.iconPosition}
                                    placeholder={formField.config.placeholder}
                                    value={formField.value}
                                    error={formField.isValid}
                                    mobile={this.state.isMobile}
                                />
                            </Form.Field>
                        ))}
                    </Form>
                </Segment>
            </Modal>
        );
    }
}

export default InputForm;

