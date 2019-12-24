import React from 'react';
import {Input, TextArea, Select} from 'semantic-ui-react';
import DatePicker from '../date-picker';
import PropTypes from 'prop-types';

const InputField = (props) => {
    switch (props.elementType) {
        case 'input':
            return (
                <Input 
                    fluid 
                    className={props.className}
                    disabled={props.disabled}
                    icon={props.icon}
                    iconPosition={props.iconPosition}
                    loading={props.loading}
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
                    type={props.inputType}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            );
        case 'textarea':
            return (
                <TextArea
                    className={props.className}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            );
        case 'select':
            return (
                <Select
                    fluid
                    search
                    className={props.className}
                    disabled={props.disabled}
                    icon={props.icon}
                    loading={props.loading}
                    options={props.options}
                    placeholder={props.placeholder}
                    text={props.text}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                 />
            );
        case 'datetime':
            return (
                <DatePicker 
                    fluid
                    className={props.className}
                    disabled={props.disabled}
                    icon={props.icon}
                    iconPosition={props.iconPosition}
                    loading={props.loading}
                    mobile={props.mobile}
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
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
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    loading: PropTypes.bool,
    mobile: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            text: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        })
    ),
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onClose: PropTypes.func
};

export default InputField;