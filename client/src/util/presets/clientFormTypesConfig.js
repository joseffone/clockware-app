import configElem from './inputElemTypesConfig';

const clientFormTypesConfig = {
    clientStartForm: {
        city_id: configElem.select({
            label: 'City',
            placeholder: 'Select Your City',
            source: ['cities']
        }),
        start_date: configElem.dateTime({
            label: 'Pick the date and time',
            placeholder: 'Pick the date and time'
        })
    },
    clientOrderForm: {
        
    }
};

export default clientFormTypesConfig;
