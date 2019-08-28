'use strict';

export default {
    defaultRoles: ['admin', 'user', 'client'],
    defaultPermissions: {
        users: {
            admin: ['read', 'create', 'update', 'delete'],
            user: ['create']
        },
        roles: {
            admin: ['read', 'create', 'update', 'delete']
        },
        permissions: {
            admin: ['read', 'create', 'update', 'delete']
        },
        keys: {
            admin: ['read', 'create', 'update', 'delete'],
            client: ['delete']
        },
        clocks: {
            admin: ['read', 'create', 'update', 'delete'],
            user: ['read'],
            client: ['read']
        },
        cities: {
            admin: ['read', 'create', 'update', 'delete'],
            user: ['read'],
            client: ['read']
        },
        marks: {
            admin: ['read', 'create', 'update', 'delete'],
            user: ['read'],
            client: ['read']
        },
        agents: {
            admin: ['read', 'create', 'update', 'delete'],
            user: ['read'],
            client: ['read']
        },
        coverage: {
            admin: ['read', 'create', 'update', 'delete'],
            user: ['read'],
            client: ['read']
        },
        orders: {
            admin: ['read', 'create', 'update', 'delete'],
            user: ['read'],
            client: ['read', 'create']
        }
    },
    defaultAdmin: {
        email: 'admin@mail.com',
        first_name: 'Admin',
        last_name: 'Admin',
        password: 'admin'
    }

};
