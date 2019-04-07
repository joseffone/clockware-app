import configElem from './inputElemTypesConfig';

const formTypesConfig = {
    agents: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        nickname: configElem.textField({
            label: 'Nickname',
            placeholder: 'Enter nickname',
            restrictions: {
                requared: true,
                maxLength: 20
            }
        }),
        first_name: configElem.textField({
            label: 'First Name',
            placeholder: 'Enter First Name',
            restrictions: {
                requared: true
            }
        }),
        last_name: configElem.textField({
            label: 'Last Name',
            placeholder: 'Enter Last Name',
            restrictions: {
                requared: true
            }
        }),
        mark_id: configElem.select({
            label: 'Mark',
            placeholder: 'Select mark'
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    cities: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        city_name: configElem.textField({
            label: 'City Name',
            placeholder: 'Enter City Name',
            restrictions: {
                requared: true
            }
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    clocks: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        clock_type: configElem.textField({
            label: 'Clock Type',
            placeholder: 'Enter Clock Type',
            restrictions: {
                requared: true
            }
        }),
        hours_of_repair: configElem.textField({
            label: 'Repair Time (in hours)',
            placeholder: 'Enter Repair Time',
            restrictions: {
                requared: true,
                isNumeric: true,
                maxLength: 1
            }
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    coverage: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        agent_id: configElem.select({
            label: 'Agent',
            placeholder: 'Select Agent'
        }),
        city_id: configElem.select({
            label: 'City',
            placeholder: 'Select City'
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    marks: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        mark_name: configElem.textField({
            label: 'Mark Name',
            placeholder: 'Enter Mark Name',
            restrictions: {
                requared: true
            }
        }),
        mark_value: configElem.textField({
            label: 'Mark Value',
            placeholder: 'Enter Mark Value',
            restrictions: {
                requared: true,
                isNumeric: true,
                maxLength: 3
            }
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    orders: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        user_id: configElem.select({
            label: 'Client',
            placeholder: 'Select Client'
        }),
        clock_id: configElem.select({
            label: 'Clock Type',
            placeholder: 'Select Clock Type'
        }),
        city_id: configElem.select({
            label: 'City',
            placeholder: 'Select City'
        }),
        agent_id: configElem.select({
            label: 'Agent',
            placeholder: 'Select Agent'
        }),
        start_date: configElem.dateTime({
            label: 'Start Date'
        }),
        expiration_date: configElem.dateTime({
            label: 'Expiration Date'
        }),
        note: configElem.textArea({
            label: 'Note',
            placeholder: 'Enter Notes'
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    roles: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        role: configElem.textField({
            label: 'User Role',
            placeholder: 'Enter User Role',
            restrictions: {
                requared: true
            }
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    permissions: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        role_id: configElem.select({
            label: 'User Role',
            placeholder: 'Select User Role'
        }),
        model: configElem.select({
            label: 'Register',
            placeholder: 'Select Register'
        }),
        action: configElem.select({
            label: 'Action Type',
            placeholder: 'Select Action Type'
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    },
    users: {
        id: configElem.textField({
            label: 'ID',
            restrictions: {
                readOnly: true
            }
        }),
        email: configElem.email({
            label: 'E-Mail',
            placeholder: 'Enter E-Mail Address'
        }),
        first_name: configElem.textField({
            label: 'First Name',
            placeholder: 'Enter First Name',
            restrictions: {
                requared: true
            }
        }),
        last_name: configElem.textField({
            label: 'Last Name',
            placeholder: 'Enter Last Name',
            restrictions: {
                requared: true
            }
        }),
        password: configElem.password({
            label: 'Password',
            placeholder: 'Enter Password'
        }),
        role_id: configElem.select({
            label: 'User Role',
            placeholder: 'Select User Role'
        }),
        created_at: configElem.textField({
            label: 'CREATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: configElem.textField({
            label: 'UPDATED AT',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: configElem.textField({
            label: 'DELETED AT',
            restrictions: {
                readOnly: true
            }
        })
    }
};

export default formTypesConfig;