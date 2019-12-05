import React from 'react';
import {Input, TextArea, Select} from 'semantic-ui-react';
import DatePicker from '../date-picker';
import PropTypes from 'prop-types';

const InputField = (props) => {
    switch (props.elementType) {
        case 'input':
            return (
                <Input 
                    {...props}
                    type={props.inputType} 
                    fluid 
                    disabled={props.disabled}
                    readOnly={props.readOnly}
                    icon={props.icon}
                    iconPosition={props.iconPosition}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            );
        case 'textarea':
            return (
                <TextArea
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            );
        case 'select':
            return (
                <Select
                    {...props}
                    fluid
                    search
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    loading={props.loading}
                    options={props.options}
                    text={props.text}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                 />
            );
        case 'datetime':
            return (
                <DatePicker 
                    {...props}
                    fluid
                    mobile={props.mobile}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    onClose={props.onClose}
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
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onClose: PropTypes.func
};

export default InputField;