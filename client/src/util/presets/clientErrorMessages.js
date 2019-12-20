const clientErrorMessages = {
    'default': {
        header: 'Reserving failed!',
        message: 'Something went wrong while reserving. Try to make request again or visit these resource later.'
    },
    'validate': {
        header: 'Form validation error!',
        message: 'Some fields are empty or contain invalid data. Check your inputs before submiting.'
    },
    'signup': {
        header: 'Signup failed!',
        message: 'Failed to create user. Please, try to make request again or visit this resource later.'
    },
    're-signup': {
        header: 'Signup failed!',
        message: 'User already exists. Signup was terminated. To continiue, go to login tab.'
    },
    'login-after-signup': {
        header: 'Authentication failed!',
        message: 'User was created but authentication failed. To complete the reserving procedure you should login by created account and try to create a reservation again.'
    },
    'login': {
        header: 'Authentication failed!',
        message: 'For some reason failed to login. Please, check your inputs and try to make request again.'
    },
    'reserve-after-singup': {
        header: 'Reserving failed!',
        message: 'User was created but reservation was not. To complete the reserving procedure you should login by created account and try to create a reservation again.'
    },
    'reserve-after-singup-terminated': {
        header: 'Reserving failed!',
        message: 'User was created but reserving was terminated because entry already exists. Change request params and try to create reservation again.'
    },
    'reserve': {
        header: 'Reserving failed!',
        message: 'Authentication succeeded but reservation was not created. Try to login and create reservation again.'
    },
    'reserve-terminated': {
        header: 'Reserving failed!',
        message: 'Authentication succeeded but reserving was terminated because entry already exists. Change request params and try to create reservation again.'
    },
    'email': {
        header: 'Mailing failed',
        message: 'Confirmation letter sending failed. Try to send email again.'
    },
    're-email': {
        header: 'Mailing...',
        message: 'Trying to send email.'
    },
    'password': {
        header: 'Password did not match!',
        message: 'Password does not match duplicate. Please, check your inputs and repeat request.'
    }
};

export default clientErrorMessages;