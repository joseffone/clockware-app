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

export const transformSelectOptions = (models, data) => {
    switch (models[0]) {

        case 'marks':
            return data[models[0]].map((item) => {
                return {
                    key: item.id,
                    text: `${item.mark_name} (${item.mark_value})`,
                    value: item.id
                };
            });
        
        case 'cities':
            return data[models[0]].map((item) => {
                return {
                    key: item.id,
                    text: item.city_name,
                    value: item.id
                };
            });

        case 'clocks':
            return data[models[0]].map((item) => {
                return {
                    key: item.id,
                    text: `${item.clock_type} (${item.hours_of_repair}h of repair)`,
                    value: item.id
                };
            });
        
        case 'agents':
            return data[models[0]].map((item) => {
                return {
                    key: item.id,
                    text: `${item.nickname} - fullname: ${item.last_name} ${item.first_name} - raiting: ${data[models[1]].filter(id => id === item.mark_id).mark_name}`,
                    value: item.id
                };
            });
        
        case 'users':
            return data[models[0]].map((item) => {
                return {
                    key: item.id,
                    text: `${item.email} - fullname: ${item.last_name} ${item.first_name} - role: ${data[models[1]].filter(id => id === item.role_id).role}`,
                    value: item.id
                };
            });

        case 'roles':
            return data[models[0]].map((item) => {
                return {
                    key: item.id,
                    text: item.role,
                    value: item.id
                };
            });
        
        default:
            return [];
    }
}