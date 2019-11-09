import configElem from './inputElemTypesConfig';

const clientFormTypesConfig = {
    clientStartForm: {
        city_id: configElem.select({
            label: 'City',
            placeholder: 'Select your city',
            source: ['cities']
        }),
        clock_id: configElem.select({
            label: 'Clock type',
            placeholder: 'Select type of clock',
            source: ['clocks']
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
