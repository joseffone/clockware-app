import React from 'react';
import { Input, TextArea, Select } from 'semantic-ui-react';
import DatePicker from '../../date-picker';
import PropTypes from 'prop-types';

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
        case 'select':
            return (
                <Select
                    fluid
                    search
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    loading={props.loading}
                    options={props.options}
                    text={props.text}
                    onChange={props.changed}
                    onBlur={props.blurred}
                 />
            );
        case 'datetime':
            return (
                <DatePicker 
                    fluid
                    mobile={props.mobile}
                    disabled={props.disabled}
                    changed={props.changed}
                />
            );
        default:
            return null;
    }
};

InputField.propTypes = {
    mobile: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType(PropTypes.number, PropTypes.string).isRequired,
            text: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        })
    ),
    changed: PropTypes.func,
    blurred: PropTypes.func
};

export default InputField;