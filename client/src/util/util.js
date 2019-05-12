import formTypesConfig from './presets/formTypesConfig';

export const getFormConfig = (model) => {
    return formTypesConfig[model];
};

export const rewriteObjectProps = (prevObject, newPropsValues) => {
    return {
        ...prevObject,
        ...newPropsValues
    };
};

export const validateInput = (value, restrictions) => {
    let isValid = true;

    if (!restrictions) {
        isValid = true;
    }

    if (restrictions.requared) {
        isValid = value.trim() !== '' && isValid;
    }

    if (restrictions.minLength) {
        isValid = value.length >= restrictions.minLength && isValid;
    }

    if (restrictions.maxLength) {
        isValid = value.length <= restrictions.maxLength && isValid;
    }

    if (restrictions.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    if (restrictions.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};

export const transformSelectOptions = (model, options) => {
    switch (model) {

        case 'marks':
            return options.map((option) => {
                return {
                    key: option.id,
                    text: option.mark_name + ' (' + option.mark_value + ')',
                    value: option.id
                };
            });
        
        case 'cities':
            return options.map((option) => {
                return {
                    key: option.id,
                    text: option.city_name,
                    value: option.id
                };
            });

        case 'clocks':
            return options.map((option) => {
                return {
                    key: option.id,
                    text: option.clock_type + ' (' + option.hours_of_repair + 'h of repair)',
                    value: option.id
                };
            });

        

        default:
            return state;
    }
}