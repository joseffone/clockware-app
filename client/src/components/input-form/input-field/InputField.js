import React from 'react';
import {Input, TextArea, Select} from 'semantic-ui-react';
import DatePicker from '../../date-picker';

const InputField = (props) => {
    switch (props.elementType) {
        case 'input':
            return (
                <Input 
                    type={props.inputType} 
                    fluid 
                    disabled={props.disabled}
                    readOnly={props.readOnly}
                    icon={props.icon}
                    iconPosition={props.iconPosition}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'textarea':
            return (
                <TextArea
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'select':
            return (
                <Select
                    fluid
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    options={props.options}
                    value={props.value}
                    onChange={props.changed}
                 />
            );
            break;
        case 'datetime':
            return (
                <DatePicker 
                    fluid
                    mobile={props.mobile}
                    disabled={props.disabled}
                    changed={props.changed}
                />
            );
            break;
        default:
            return null;
    }
};

export default InputField;