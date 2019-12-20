const apiServicesConfig = {
    crud: {
        fetchDataOptions: {
            repeat: 3,
            delay: 1
        },
        createDataOptions: {
            repeat: 3,
            delay: 1
        },
        updateDataOptions: {
            repeat: 3,
            delay: 1
        },
        deleteDataOptions: {
            repeat: 3,
            delay: 1
        },
        sendEmailOptions: {
            repeat: 3,
            delay: 1
        }
    },
    auth: {
        loginUserOptions: {
            repeat: 1,
            delay: 0
        },
        logoutUserOptions: {
            repeat: 1,
            delay: 0
        },
        refreshTokensOptions:  {
            repeat: 1,
            delay: 0
        }
    }
};

export default apiServicesConfig;