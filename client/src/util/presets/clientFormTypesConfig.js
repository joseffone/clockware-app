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
            label: 'Date/Time',
            placeholder: 'Pick the date and time'
        })
    },
    clientSignupForm: {
        email: inputElemTypesConfig.email({
            label: 'E-Mail',
            placeholder: 'Enter E-Mail Address'
        }),
        first_name: inputElemTypesConfig.textField({
            label: 'First Name',
            placeholder: 'Enter First Name',
            restrictions: {
                requared: true
            }
        }),
        last_name: inputElemTypesConfig.textField({
            label: 'Last Name',
            placeholder: 'Enter Last Name',
            restrictions: {
                requared: true
            }
        }),
        password: inputElemTypesConfig.password({
            label: 'Password',
            placeholder: 'Enter Password (at least 8 symbols)'
        }),
        duplicate: inputElemTypesConfig.password({
            label: 'Password Duplicate',
            placeholder: 'Enter Password Duplicate'
        })
    },
    clientLoginForm: {
        email: inputElemTypesConfig.email({
            label: 'E-Mail',
            placeholder: 'Enter E-Mail Address'
        }),
        password: inputElemTypesConfig.password({
            label: 'Password',
            placeholder: 'Enter Password (at least 8 symbols)'
        })
    }
};

export default clientFormTypesConfig;