import moment from 'moment';

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

export const transformSelectOptions = (source = [], models, forms, defaultOptions = []) => {
    let result = [];

    switch (source[0]) {
        case 'marks':
            result = models[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.mark_name} (${item.mark_value})`,
                    value: item.id
                };
            });
            return result;
        
        case 'cities':
            result = models[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: item.city_name,
                    value: item.id
                };
            });
            if (forms.orders) {
                if (forms.orders.agent_id.value !== '') {
                    return models[source[1]].items.filter(({agent_id}) => agent_id === forms.orders.agent_id.value).map(({city_id}) => {
                        return result.find(({key}) => key === city_id);
                    });
                }
            }
            return result;

        case 'clocks':
            result = models[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.clock_type} [${item.hours_of_repair}h of repair]`,
                    value: item.id
                };
            });
            return result;
        
        case 'agents':
            result = models[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.nickname} [${item.last_name} ${item.first_name}, rating: ${models[source[1]].items.filter(obj => obj.id === item.mark_id).map(obj => obj.mark_name)}]`,
                    value: item.id
                };
            });
            if (forms.orders) {
                if (forms.orders.city_id.value !== '') {
                    return models[source[2]].items.filter(({city_id}) => city_id === forms.orders.city_id.value).map(({agent_id}) => {
                        return result.find(({key}) => key === agent_id);
                    });
                }
            }
            return result;
        
        case 'users':
            result = models[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: `${item.email} [${item.last_name} ${item.first_name}, role: ${models[source[1]].items.filter(obj => obj.id === item.role_id).map(obj => obj.role)}]`,
                    value: item.id
                };
            });
            return result;

        case 'roles':
            result = models[source[0]].items.map((item) => {
                return {
                    key: item.id,
                    text: item.role,
                    value: item.id
                };
            });
            return result;
        
        default:
            return defaultOptions;
    }
};

export const sortByKey = (data, config) => {
    let {target, isDate, reverse} = config;
    if (target === null) {
        return data;
    }
    const compareByKey = (key, isDate = false, isDesc = false) => {
        let orderFlag = isDesc ? -1 : 1;
        return (a, b) => {
            let valA = typeof a[key] === 'string' ? a[key].toLowerCase() : typeof a[key] ===  'number' ? a[key] : '';
            let valB = typeof b[key] === 'string' ? b[key].toLowerCase() : typeof b[key] ===  'number' ? b[key] : '';
            if (isDate) {
                valA = valA === '' ? moment(+valA) : moment(valA, 'DD-MM-YYYY HH:mm');
                valB = valB === '' ? moment(+valB) : moment(valB, 'DD-MM-YYYY HH:mm');
            }
            let result = (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
            return result * orderFlag;
        };
    };
    return data.sort(compareByKey(target, isDate, reverse));
};

export const configFilterPreset = (preset, tailIndex = null) => {
    let tIndex = isNaN(parseInt(tailIndex)) ? preset.length : parseInt(tailIndex);
    return preset
        .map(item => {
            let {operatorType, dataKey, isDate, target} = Object.values(item)[0];
            return {
                operatorType, 
                dataKey, 
                isDate,
                target
            };
        })
        .slice(0, tIndex)
        .filter(item => item.target !== null);
};

export const filterDataSet = (data, config) => {
    const operate = (type, value, target) => {
        switch (type) {
            case 'equal':
                return Array.isArray(value) ? value.includes(target) : value === target;
            case 'notEqual':
                return Array.isArray(value) ? !value.includes(target) : value !== target;
            case 'more':
                return Array.isArray(value) ? value.findIndex(elem => elem > target) !== -1 : value > target;
            case 'less':
                return Array.isArray(value) ? value.findIndex(elem => elem < target) !== -1 : value < target;
            case 'moreOrEqual':
                return Array.isArray(value) ? value.findIndex(elem => elem >= target) !== -1 : value >= target;
            case 'lessOrEqual':
                return Array.isArray(value) ? value.findIndex(elem => elem <= target) !== -1 : value <= target;
            default:
                return Array.isArray(value) ? value.includes(target) : value === target;
        }
    };
    const compare = (item, masks) => {
        let result = true;
        for (let mask of masks) {
            let {operatorType, dataKey, isDate, target} = mask;
            let xVal = typeof item[dataKey] === 'string' ? item[dataKey].toLowerCase() : typeof item[dataKey] ===  'number' || Array.isArray(target) ? item[dataKey] : '';
            let tVal = typeof target === 'string' ? target.toLowerCase() : typeof target ===  'number' || Array.isArray(target) ? target : '';
            if (isDate) {
                xVal = xVal === '' ? moment(+xVal) : moment(xVal, 'DD-MM-YYYY HH:mm');
                tVal = tVal === '' ? moment(+tVal) : moment(tVal, 'DD-MM-YYYY HH:mm');
            }
            if (Array.isArray(tVal)) {
                result = false;
                for (let elem of tVal) {
                    if (operate(operatorType, xVal, elem)) {
                        result = true;
                    }
                }
                if (!result) {
                    break;
                }
            } else {
                result = result && operate(operatorType, xVal, tVal);
            }
        }
        return result;
    };
    return data.filter(item => compare(item, config));
};

export const transformDataSet = (model, forms, models) => {
    let markName, markValue, userEmail, userLastName, userFirstName, role, agentNickName, agentLastName, agentFirstName, clockType, cityName;
    let dataSet = models[model].items.length > 0 ? models[model].items.map((item) => {
        let transformedItem = rewriteObjectProps(item, {
            created_at: item.created_at !== null ? moment(item.created_at).format('DD-MM-YYYY HH:mm') : item.created_at,
            updated_at: item.updated_at !== null ? moment(item.updated_at).format('DD-MM-YYYY HH:mm') : item.updated_at,
            deleted_at: item.deleted_at !== null ? moment(item.deleted_at).format('DD-MM-YYYY HH:mm') : item.deleted_at,
            status: item.deleted_at !== null ? 'deleted' : 'active'
        });
        switch (model) {
            case 'agents':
                markName = models[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0] ? models[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0].mark_name : false;
                markValue = models[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0] ? models[forms[model].mark_id.config.source[0]].items.filter(({ id }) => id === item.mark_id)[0].mark_value : false;
                return rewriteObjectProps(transformedItem, {
                    rating: markName === false || markValue === false ? false : `${markName} (${markValue})`,
                    ratingValue: markValue === false ? false : markValue
                });
            
            case 'coverage':
                agentNickName = models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].nickname : false;
                agentLastName = models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].last_name : false;
                agentFirstName = models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].first_name : false;
                markName = models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_name : false;
                markValue = models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_value : false;
                cityName = models[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0] ? models[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0].city_name : false;
                return rewriteObjectProps(transformedItem, {
                    agent_nickname: agentNickName,
                    agent_fullname: agentLastName === false || agentFirstName === false ? false : `${agentLastName} ${agentFirstName}`,
                    agent_rating: markName === false || markValue === false ? false : `${markName} (${markValue})`,
                    city_name: cityName
                });

            case 'users':
                role = models[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0] ? models[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0].role : false;
                return rewriteObjectProps(transformedItem, {
                    role: role
                });

            case 'permissions':
                role = models[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0] ? models[forms[model].role_id.config.source[0]].items.filter(({ id }) => id === item.role_id)[0].role : false;
                return rewriteObjectProps(transformedItem, {
                    role: role
                });

            case 'orders':
                userEmail = models[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0] ? models[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0].email : false;
                userLastName = models[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0] ? models[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0].last_name : false;
                userFirstName = models[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0] ? models[forms[model].user_id.config.source[0]].items.filter(({ id }) => id === item.user_id)[0].first_name : false;
                agentNickName = models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].nickname : false;
                agentLastName = models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].last_name : false;
                agentFirstName = models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0] ? models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].first_name : false;
                markName = models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_name : false;
                markValue = models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0] ? 
                    models[forms[model].agent_id.config.source[1]].items.filter(({ id }) => id === models[forms[model].agent_id.config.source[0]].items.filter(({ id }) => id === item.agent_id)[0].mark_id)[0].mark_value : false;
                clockType = models[forms[model].clock_id.config.source[0]].items.filter(({ id }) => id === item.clock_id)[0] ? models[forms[model].clock_id.config.source[0]].items.filter(({ id }) => id === item.clock_id)[0].clock_type : false;
                cityName = models[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0] ? models[forms[model].city_id.config.source[0]].items.filter(({ id }) => id === item.city_id)[0].city_name : false;
                return rewriteObjectProps(transformedItem, {
                    user_email: userEmail,
                    user_fullname: userLastName === false || userFirstName === false ? false : `${userLastName} ${userFirstName}`,
                    clock_type: clockType,
                    city_name: cityName,
                    agent_nickname: agentNickName,
                    agent_fullname: agentLastName === false || agentFirstName === false ? false : `${agentLastName} ${agentFirstName}`,
                    agent_rating: markName === false || markValue === false ? false : `${markName} (${markValue})`,
                    start_date: item.start_date !== null ? moment(item.start_date).format('DD-MM-YYYY HH:mm') : item.start_date,
                    expiration_date: item.expiration_date !== null ? moment(item.expiration_date).format('DD-MM-YYYY HH:mm') : item.expiration_date
                }); 

            default:
                return transformedItem;
        }
    }) : [];
    return dataSet;
};

export const applyParams = (dataSet, sort = null, filters = null, filterTailIndex = null) => {
    let resultSet = dataSet.slice();
    if (sort !== null) {
        sortByKey(resultSet, sort);
    }
    if (filters !== null) {
        return filterDataSet(resultSet, configFilterPreset(filters, filterTailIndex));
    }
    return resultSet;
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
    const re = new RegExp(escapeRegExp(text.toLowerCase(), 'i'));
    let source = [...dataSet];
    if (!key) {
        source = dataSet.map(item => {
            return {
                id: item.id,
                payload: Object.keys(item).filter(key => key !== 'id').map(key => {
                    return item[key];
                }).join(' ').toLowerCase()
            };
        });
    }
    const isMatch = key ? (result) => re.test(result[key]) : (result) => re.test(result.payload);
    return source.filter(isMatch).map((item) => item.id);
};

export const getUniqueKeyValues = (data, key) => {
    let result = [];
    let values = data.map(item => item[key]);
    for (let value of values) {
        if (Array.isArray(value)) {
            value.forEach(elem => {
                if (!result.includes(elem)) {
                    result.push(elem);
                }
            });
        } else {
            if (!result.includes(value)) {
                result.push(value);
            }
        }
    }
    return result;
};

export const promiseToGetUniqueKeyValues = (dataKey, getDataSet) => {
    return new Promise((resolve, reject) => {
        try {
            let uniqueKeyValues = getUniqueKeyValues(getDataSet(), dataKey);
            return resolve(uniqueKeyValues);
        } catch (e) {
            return reject(e);
        }
    });
};