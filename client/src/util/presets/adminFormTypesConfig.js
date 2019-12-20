import inputElemTypesConfig from './inputElemTypesConfig';

const adminFormTypesConfig = {
    agents: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        nickname: inputElemTypesConfig.textField({
            label: 'Nickname',
            placeholder: 'Enter nickname',
            restrictions: {
                requared: true,
                maxLength: 20
            }
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
        mark_id: inputElemTypesConfig.select({
            label: 'Mark',
            placeholder: 'Select mark',
            source: ['marks']
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    cities: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        city_name: inputElemTypesConfig.textField({
            label: 'City Name',
            placeholder: 'Enter City Name',
            restrictions: {
                requared: true
            }
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    clocks: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        clock_type: inputElemTypesConfig.textField({
            label: 'Clock Type',
            placeholder: 'Enter Clock Type',
            restrictions: {
                requared: true
            }
        }),
        hours_of_repair: inputElemTypesConfig.textField({
            label: 'Repair Time (in hours)',
            placeholder: 'Enter Repair Time',
            restrictions: {
                requared: true,
                isNumeric: true,
                maxLength: 1
            }
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    coverage: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        agent_id: inputElemTypesConfig.select({
            label: 'Agent',
            placeholder: 'Select Agent',
            source: ['agents', 'marks']
        }),
        city_id: inputElemTypesConfig.select({
            label: 'City',
            placeholder: 'Select City',
            source: ['cities']
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    marks: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        mark_name: inputElemTypesConfig.textField({
            label: 'Mark Name',
            placeholder: 'Enter Mark Name',
            restrictions: {
                requared: true
            }
        }),
        mark_value: inputElemTypesConfig.textField({
            label: 'Mark Value',
            placeholder: 'Enter Mark Value',
            restrictions: {
                requared: true,
                isNumeric: true,
                maxLength: 3
            }
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    orders: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        user_id: inputElemTypesConfig.select({
            label: 'Client',
            placeholder: 'Select Client',
            source: ['users', 'roles']
        }),
        clock_id: inputElemTypesConfig.select({
            label: 'Clock Type',
            placeholder: 'Select Clock Type',
            source: ['clocks']
        }),
        city_id: inputElemTypesConfig.select({
            label: 'City',
            placeholder: 'Select City',
            source: ['cities', 'coverage']
        }),
        agent_id: inputElemTypesConfig.select({
            label: 'Agent',
            placeholder: 'Select Agent',
            source: ['agents', 'marks', 'coverage']
        }),
        start_date: inputElemTypesConfig.dateTime({
            label: 'Start Date'
        }),
        expiration_date: inputElemTypesConfig.dateTime({
            label: 'Expiration Date'
        }),
        confirmed: inputElemTypesConfig.select({
            label: 'Confirmed',
            placeholder: 'Set confirmation status',
            defaultOptions: [
                {
                    key: 'No',
                    text: 'No',
                    value: 'No'
                },
                {
                    key: 'Yes',
                    text: 'Yes',
                    value: 'Yes'
                }
            ]
        }),
        note: inputElemTypesConfig.textArea({
            label: 'Note',
            placeholder: 'Enter Notes'
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    roles: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        role: inputElemTypesConfig.textField({
            label: 'User Role',
            placeholder: 'Enter User Role',
            restrictions: {
                requared: true
            }
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    permissions: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        role_id: inputElemTypesConfig.select({
            label: 'User Role',
            placeholder: 'Select User Role',
            source: ['roles']
        }),
        model: inputElemTypesConfig.select({
            label: 'Register',
            placeholder: 'Select Register',
            defaultOptions: [
                {
                    key: 'users',
                    text: 'Users',
                    value: 'users'
                },
                {
                    key: 'roles',
                    text: 'Roles',
                    value: 'roles'
                },
                {
                    key: 'permissions',
                    text: 'Permissions',
                    value: 'permissions'
                },
                {
                    key: 'clocks',
                    text: 'Clocks',
                    value: 'clocks'
                },
                {
                    key: 'cities',
                    text: 'Cities',
                    value: 'cities'
                },
                {
                    key: 'marks',
                    text: 'Marks',
                    value: 'marks'
                },
                {
                    key: 'agents',
                    text: 'Agents',
                    value: 'agents'
                },
                {
                    key: 'coverage',
                    text: 'Coverage',
                    value: 'coverage'
                },
                {
                    key: 'orders',
                    text: 'Orders',
                    value: 'orders'
                }
            ]
        }),
        action: inputElemTypesConfig.select({
            label: 'Action Type',
            placeholder: 'Select Action Type',
            defaultOptions: [
                {
                    key: 'read',
                    text: 'READ',
                    value: 'read'
                },
                {
                    key: 'create',
                    text: 'CREATE',
                    value: 'create'
                },
                {
                    key: 'update',
                    text: 'UPDATE',
                    value: 'update'
                },
                {
                    key: 'delete',
                    text: 'DELETE',
                    value: 'delete'
                }
            ]
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    users: {
        id: inputElemTypesConfig.textField({
            label: 'ID',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
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
        role_id: inputElemTypesConfig.select({
            label: 'User Role',
            placeholder: 'Select User Role',
            source: ['roles']
        }),
        created_at: inputElemTypesConfig.textField({
            label: 'CREATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        updated_at: inputElemTypesConfig.textField({
            label: 'UPDATED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        }),
        deleted_at: inputElemTypesConfig.textField({
            label: 'DELETED AT',
            placeholder: 'Autocomplete data',
            restrictions: {
                readOnly: true
            }
        })
    },
    authentication: {
        email: inputElemTypesConfig.email({
            label: 'User E-Mail',
            placeholder: 'Enter E-Mail Address'
        }),
        password: inputElemTypesConfig.password({
            label: 'Password',
            placeholder: 'Enter Password (at least 5 symbols)'
        })
    }
};

export default adminFormTypesConfig;