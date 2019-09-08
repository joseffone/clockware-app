const tableFieldsConfig = {
    agents: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        nickname: {
            name: 'nickname',
            alias: 'Nickname',
            sortable: true
        },
        first_name: {
            name: 'first_name',
            alias: 'First name',
            sortable: true
        },
        last_name: {
            name: 'last_name',
            alias: 'Last name',
            sortable: true
        },
        raiting: {
            name: 'raiting',
            alias: 'Raiting',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    cities: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        city_name: {
            name: 'city_name',
            alias: 'City',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    clocks: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        clock_type: {
            name: 'clock_type',
            alias: 'Clock type',
            sortable: true
        },
        hours_of_repair: {
            name: 'hours_of_repair',
            alias: 'Repair time (h)',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    coverage: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        agent_nickname: {
            name: 'agent_nickname',
            alias: 'Agent nickname',
            sortable: true
        },
        agent_fullname: {
            name: 'agent_fullname',
            alias: 'Agent fullname',
            sortable: true
        },
        agent_raiting: {
            name: 'agent_raiting',
            alias: 'Agent raiting',
            sortable: true
        },
        city_name: {
            name: 'city_name',
            alias: 'City',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    marks: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        mark_name: {
            name: 'mark_name',
            alias: 'Mark name',
            sortable: true
        },
        mark_value: {
            name: 'mark_value',
            alias: 'Mark value',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    orders: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        user_email: {
            name: 'user_email',
            alias: 'User e-mail',
            sortable: true
        },
        user_fullname: {
            name: 'user_fullname',
            alias: 'User fullname',
            sortable: true
        },
        clock_type: {
            name: 'clock_type',
            alias: 'Clock type',
            sortable: true
        },
        city_name: {
            name: 'city_name',
            alias: 'City',
            sortable: true
        },
        agent_nickname: {
            name: 'agent_nickname',
            alias: 'Agent nickname',
            sortable: true
        },
        agent_fullname: {
            name: 'agent_fullname',
            alias: 'Agent fullname',
            sortable: true
        },
        agent_raiting: {
            name: 'agent_raiting',
            alias: 'Agent raiting',
            sortable: true
        },
        start_date: {
            name: 'start_date',
            alias: 'Start date',
            sortable: true
        },
        eхpiration_date: {
            name: 'eхpiration_date',
            alias: 'Exp date',
            sortable: true
        },
        note: {
            name: 'note',
            alias: 'Comment',
            sortable: false
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    roles: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        role: {
            name: 'role',
            alias: 'Role',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    permissions: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        role: {
            name: 'role',
            alias: 'Role',
            sortable: true
        },
        model: {
            name: 'model',
            alias: 'Register',
            sortable: true
        },
        action: {
            name: 'action',
            alias: 'Action',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    },
    users: {
        id: {
            name: 'id',
            alias: 'ID',
            sortable: false 
        },
        email: {
            name: 'email',
            alias: 'E-Mail',
            sortable: true
        },
        first_name: {
            name: 'first_name',
            alias: 'First name',
            sortable: true
        },
        last_name: {
            name: 'last_name',
            alias: 'Last name',
            sortable: true
        },
        password: {
            name: 'password',
            alias: 'Password',
            sortable: false
        },
        role: {
            name: 'role',
            alias: 'Role',
            sortable: true
        },
        created_at: {
            name: 'created_at',
            alias: 'Created at',
            sortable: true
        },
        updated_at: {
            name: 'updated_at',
            alias: 'Updated at',
            sortable: true
        },
        deleted_at: {
            name: 'deleted_at',
            alias: 'Deleted at',
            sortable: true
        }
    }
};

export default tableFieldsConfig;