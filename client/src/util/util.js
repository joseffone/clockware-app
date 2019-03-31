import formTypesConfig from './presets/formTypesConfig';

export const getFormConfig = (model) => {
    return formTypesConfig[model];
};