import moment from 'moment';
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
        isValid = value.toString().trim() !== '' && isValid;
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

export const transformSelectOptions = (source = [], data, defaultOptions = []) => {
    switch (source[0]) {

        case 'marks':
            return data[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.mark_name} (${item.mark_value})`,
                    value: item.id
                };
            });
        
        case 'cities':
            return data[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: item.city_name,
                    value: item.id
                };
            });

        case 'clocks':
            return data[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.clock_type} [${item.hours_of_repair}h of repair]`,
                    value: item.id
                };
            });
        
        case 'agents':
            return data[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.nickname} [${item.last_name} ${item.first_name}, raiting: ${data[source[1]].items.filter(obj => obj.id === item.mark_id).map(obj => obj.mark_name)}]`,
                    value: item.id
                };
            });
        
        case 'users':
            return data[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.email} [${item.last_name} ${item.first_name}, role: ${data[source[1]].items.filter(obj => obj.id === item.role_id).map(obj => obj.role)}]`,
                    value: item.id
                };
            });

        case 'roles':
            return data[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: item.role,
                    value: item.id
                };
            });
        
        default:
            return defaultOptions;
    }
};

export const sortByKey = (dataSet, key, reverse) => {
    const compareByKey = (key, isDesc = false) => {
        let orderFlag = isDesc ? -1 : 1;
        return (a, b) => {
            let valA = a[key].toUpperCase();
            let valB = b[key].toUpperCase();
            let result = (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
            return result * orderFlag;
        };
    };
    return dataSet.sort(compareByKey(key, reverse));
};

export const transformDataSet = (model, forms, data, sort = null) => {
    let markName, markValue, userEmail, userLastName, userFirstName, role, agentNickName, agentLastName, agentFirstName, clockType, cityName;
    let dataSet = data[model].items.map((item) => {
        let transformedItem = rewriteObjectProps(item, {
            created_at: item.created_at !== null ? moment(item.created_at).format('DD-MM-YYYY HH:mm') : item.created_at,
            updated_at: item.updated_at !== null ? moment(item.updated_at).format('DD-MM-YYYY HH:mm') : item.updated_at,
            deleted_at: item.deleted_at !== null ? moment(item.deleted_at).format('DD-MM-YYYY HH:mm') : item.deleted_at
        });
        switch (model) {
            case 'agents':
                markName = data[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0] ? data[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0].mark_name : false;
                markValue = data[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0] ? data[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0].mark_value : false;
                return rewriteObjectProps(transformedItem, {
                    raiting: markName === false || markValue === false ? false : `${markName} (${markValue})`
                });
            
            case 'coverage':
                agentNickName = data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].nickname : false;
                agentLastName = data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].last_name : false;
                agentFirstName = data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].first_name : false;
                markName = data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_name : false;
                markValue = data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_value : false;
                cityName = data[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0] ? data[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0].city_name : false;
                return rewriteObjectProps(transformedItem, {
                    agent_nickname: agentNickName,
                    agent_fullname: agentLastName === false || agentFirstName === false ? false : `${agentLastName} ${agentFirstName}`,
                    agent_raiting: markName === false || markValue === false ? false : `${markName} (${markValue})`,
                    city_name: cityName
                });

            case 'users':
                role = data[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0] ? data[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0].role : false;
                return rewriteObjectProps(transformedItem, {
                    role: role
                });

            case 'permissions':
                role = data[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0] ? data[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0].role : false;
                return rewriteObjectProps(transformedItem, {
                    role: role
                });

            case 'orders':
                userEmail = data[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0] ? data[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0].email : false;
                userLastName = data[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0] ? data[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0].last_name : false;
                userFirstName = data[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0] ? data[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0].first_name : false;
                agentNickName = data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].nickname : false;
                agentLastName = data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].last_name : false;
                agentFirstName = data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].first_name : false;
                markName = data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_name : false;
                markValue = data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    data[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === data[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_value : false;
                clockType = data[forms[model].clock_id.config.source[0]].items.filter(({ id }) => id === item.clock_id)[0] ? data[forms[model].clock_id.config.source[0]].items.filter(({ id }) => id === item.clock_id)[0].clock_type : false;
                cityName = data[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0] ? data[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0].city_name : false;
                return rewriteObjectProps(transformedItem, {
                    user_email: userEmail,
                    user_fullname: userLastName === false || userFirstName === false ? false : `${userLastName} ${userFirstName}`,
                    clock_type: clockType,
                    city_name: cityName,
                    agent_nickname: agentNickName,
                    agent_fullname: agentLastName === false || agentFirstName === false ? false : `${agentLastName} ${agentFirstName}`,
                    agent_raiting: markName === false || markValue === false ? false : `${markName} (${markValue})`,
                    start_date: item.start_date !== null ? moment(item.start_date).format('DD-MM-YYYY HH:mm') : item.start_date,
                    eхpiration_date: item.eхpiration_date !== null ? moment(item.eхpiration_date).format('DD-MM-YYYY HH:mm') : item.eхpiration_date
                }); 

            default:
                return transformedItem;
        }
    });
    if (sort !== null) {
        if (sort.target === null) {
            return dataSet;
        }
        sortByKey(dataSet, sort.target, sort.reverse);
    }
    return dataSet;
};

export const debounce = (callback, delaytime) => {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), delaytime);
    };
};

export const search = (text, dataSet, key) => {
    if (text.length < 1) {
        return dataSet.map((item) => item.id);
    }
    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    const re = new RegExp(escapeRegExp(text, 'i'));
    let source = [...dataSet];
    if (!key) {
        source = dataSet.map(item => {
            return {
                id: item.id,
                payload: Object.keys(item).filter(key => key !== 'id').map(key => {
                    return item[key];
                }).join(' ')
            };
        });
    }
    const isMatch = key ? (result) => re.test(result[key]) : (result) => re.test(result.payload);
    return source.filter(isMatch).map((item) => item.id);
};