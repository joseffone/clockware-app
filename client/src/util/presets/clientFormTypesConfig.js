import inputElemTypesConfig from './inputElemTypesConfig';

const clientFormTypesConfig = {
    clientStartForm: {
        city_id: inputElemTypesConfig.select({
            label: 'City',
            placeholder: 'Select your city',
            source: ['cities']
        }),
        clock_id: inputElemTypesConfig.select({
            label: 'Clock type',
            placeholder: 'Select type of clock',
            source: ['clocks']
        }),
        start_date: inputElemTypesConfig.dateTime({
            label: 'Pick the date and time',
            placeholder: 'Pick the date and time'
        })
    },
    clientOrderForm: {
        
    }
};

export default clientFormTypesConfig;