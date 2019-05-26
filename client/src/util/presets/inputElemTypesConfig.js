const inputElemTypesConfig = {
    textField: (config) => {
        return {
            elementType: 'input',
            config: {
                type: 'text',
                label: config.label || 'Input Field',
                icon: config.icon ? config.icon.name : null,
                iconPosition: config.icon ? config.icon.position : null,
                placeholder: config.placeholder || 'Enter Data',
                restrictions: {
                    requared: config.restrictions ? config.restrictions.requared : false,
                    disabled: config.restrictions ? config.restrictions.disabled : false,
                    readOnly: config.restrictions ? config.restrictions.readOnly : false,
                    isNumeric: config.restrictions ? config.restrictions.isNumeric : false,
                    isEmail: config.restrictions ? config.restrictions.isEmail : false,
                    minLength: config.restrictions ? config.restrictions.minLenght : 1,
                    maxLength: config.restrictions ? config.restrictions.maxLenght : 255
                }
            },
            value: '',
            isValid: config.restrictions ? config.restrictions.disabled || config.restrictions.readOnly : false,
            touched: false
        };
    },
    textArea: (config) => {
        return {
            elementType: 'textarea',
            config: {
                label: config.label || 'Text',
                placeholder: config.placeholder || 'Text',
                restrictions: {
                    requared: config.restrictions ? config.restrictions.requared : false,
                    disabled: config.restrictions ? config.restrictions.disabled : false,
                    readOnly: config.restrictions ? config.restrictions.readOnly : false
                }
            },
            value: '',
            isValid: config.restrictions ? config.restrictions.disabled || config.restrictions.readOnly : false,
            touched: false
        };
    },
    password: (config) => {
        return {
            elementType: 'input',
            config: {
                type: 'password',
                label: config.label || 'Password',
                icon: 'lock',
                iconPosition: 'left',
                placeholder: config.placeholder || 'Password',
                restrictions: {
                    requared: true,
                    disabled: config.restrictions ? config.restrictions.disabled : false,
                    readOnly: config.restrictions ? config.restrictions.readOnly : false,
                    minLength: 5
                }
            },
            value: '',
            isValid: config.restrictions ? config.restrictions.disabled || config.restrictions.readOnly : false,
            touched: false
        };
    },
    email: (config) => {
        return {
            elementType: 'input',
            config: {
                type: 'email',
                label: config.label || 'E-Mail',
                icon: 'user',
                iconPosition: 'left',
                placeholder: config.placeholder || 'E-Mail',
                restrictions: {
                    requared: true,
                    disabled: config.restrictions ? config.restrictions.disabled : false,
                    readOnly: config.restrictions ? config.restrictions.readOnly : false,
                    maxLength: 255,
                    isEmail: true
                }
            },
            value: '',
            isValid: config.restrictions ? config.restrictions.disabled || config.restrictions.readOnly : false,
            touched: false
        };
    },
    select: (config) => {
        return {
            elementType: 'select',
            config: {
                label: config.label || 'Selection',
                placeholder: config.placeholder || "Select Item",
                restrictions: {
                    requared: true,
                    disabled: config.restrictions ? config.restrictions.disabled : false
                },
                source: config.source || [],
                options: config.options || []
            },
            value: '',
            isValid: config.restrictions ? config.restrictions.disabled || config.restrictions.readOnly : false,
            touched: false
        };
    },
    dateTime: (config) => {
        return {
            elementType: 'datetime',
            config: {
                label: config.label || 'Date-Time',
                restrictions: {
                    requared: true,
                    disabled: config.restrictions ? config.restrictions.disabled : false
                }
            },
            value: '',
            isValid: config.restrictions ? config.restrictions.disabled || config.restrictions.readOnly : false,
            touched: false
        };
    }
};

export default inputElemTypesConfig;