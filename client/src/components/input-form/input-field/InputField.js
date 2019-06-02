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
                    onBlur={props.blurred}
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
                    onBlur={props.blurred}
                />
            );
            break;
        case 'select':
            return (
                <Select
                    fluid
                    search
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    loading={props.loading}
                    options={props.options}
                    onChange={props.changed}
                    onBlur={props.blurred}
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