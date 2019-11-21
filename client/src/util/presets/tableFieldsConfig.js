const tableFieldsConfig = {
    agents: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'nickname',
            alias: 'Nickname',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'nickname', type: 'equal', descriptor: 'Nickname'}
            ]
        },
        {
            name: 'first_name',
            alias: 'First name',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'first_name', type: 'equal', descriptor: 'First name'}
            ]
        },
        {
            name: 'last_name',
            alias: 'Last name',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'last_name', type: 'equal', descriptor: 'Last name'}
            ]
        },
        {
            name: 'rating',
            alias: 'Raiting',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'rating', type: 'equal', descriptor: 'Raiting'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    cities: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'city_name',
            alias: 'City',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'city_name', type: 'equal', descriptor: 'City'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    clocks: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'clock_type',
            alias: 'Clock type',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'clock_type', type: 'equal', descriptor: 'Clock type'}
            ]
        },
        {
            name: 'hours_of_repair',
            alias: 'Repair time (h)',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'hours_of_repair', type: 'equal', descriptor: 'Repair time (h)'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    coverage: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'agent_nickname',
            alias: 'Agent nickname',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'agent_nickname', type: 'equal', descriptor: 'Agent nickname'}
            ]
        },
        {
            name: 'agent_fullname',
            alias: 'Agent fullname',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'agent_fullname', type: 'equal', descriptor: 'Agent fullname'}
            ]
        },
        {
            name: 'agent_rating',
            alias: 'Agent rating',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'agent_rating', type: 'equal', descriptor: 'Agent rating'}
            ]
        },
        {
            name: 'city_name',
            alias: 'City',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'city_name', type: 'equal', descriptor: 'City'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    marks: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'mark_name',
            alias: 'Mark name',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'mark_name', type: 'equal', descriptor: 'Mark name'}
            ]
        },
        {
            name: 'mark_value',
            alias: 'Mark value',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'mark_value', type: 'equal', descriptor: 'Mark value'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    orders: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'user_email',
            alias: 'User e-mail',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'user_email', type: 'equal', descriptor: 'User e-mail'}
            ]
        },
        {
            name: 'user_fullname',
            alias: 'User fullname',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'user_fullname', type: 'equal', descriptor: 'User fullname'}
            ]
        },
        {
            name: 'clock_type',
            alias: 'Clock type',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'clock_type', type: 'equal', descriptor: 'Clock type'}
            ]
        },
        {
            name: 'city_name',
            alias: 'City',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'city_name', type: 'equal', descriptor: 'City'}
            ]
        },
        {
            name: 'agent_nickname',
            alias: 'Agent nickname',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'agent_nickname', type: 'equal', descriptor: 'Agent nickname'}
            ]
        },
        {
            name: 'agent_fullname',
            alias: 'Agent fullname',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'agent_fullname', type: 'equal', descriptor: 'Agent fullname'}
            ]
        },
        {
            name: 'agent_rating',
            alias: 'Agent rating',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'agent_rating', type: 'equal', descriptor: 'Agent rating'}
            ]
        },
        {
            name: 'start_date',
            alias: 'Start date',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: true,
            filterOperation: [
                {key: 'started_since', type: 'moreOrEqual', descriptor: 'Started since'},
                {key: 'started_before', type: 'less', descriptor: 'Started before'}
            ]
        },
        {
            name: 'expiration_date',
            alias: 'Exp date',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: true,
            filterOperation: [
                {key: 'expired_since', type: 'moreOrEqual', descriptor: 'Expired since'},
                {key: 'expired_before', type: 'less', descriptor: 'Expired before'}
            ]
        },
        {
            name: 'note',
            alias: 'Comment',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    roles: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'role',
            alias: 'Role',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'role', type: 'equal', descriptor: 'Role'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    permissions: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'role',
            alias: 'Role',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'role', type: 'equal', descriptor: 'Role'}
            ]
        },
        {
            name: 'model',
            alias: 'Register',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'model', type: 'equal', descriptor: 'Register'}
            ]
        },
        {
            name: 'action',
            alias: 'Action',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'action', type: 'equal', descriptor: 'Action'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ],
    users: [
        {
            name: 'id',
            alias: 'ID',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'email',
            alias: 'E-Mail',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'email', type: 'equal', descriptor: 'E-Mail'}
            ]
        },
        {
            name: 'first_name',
            alias: 'First name',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'first_name', type: 'equal', descriptor: 'First name'}
            ]
        },
        {
            name: 'last_name',
            alias: 'Last name',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'last_name', type: 'equal', descriptor: 'Last name'}
            ]
        },
        {
            name: 'password',
            alias: 'Password',
            visible: true,
            sortable: false,
            isDate: false,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'role',
            alias: 'Role',
            visible: true,
            sortable: true,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'role', type: 'equal', descriptor: 'Role'}
            ]
        },
        {
            name: 'created_at',
            alias: 'Created at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'updated_at',
            alias: 'Updated at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'deleted_at',
            alias: 'Deleted at',
            visible: true,
            sortable: true,
            isDate: true,
            filterable: false,
            filterOperation: null
        },
        {
            name: 'status',
            alias: 'Status',
            visible: false,
            sortable: false,
            isDate: false,
            filterable: true,
            filterOperation: [
                {key: 'status', type: 'equal', descriptor: 'Entries status'}
            ]
        }
    ]
};

export default tableFieldsConfig;