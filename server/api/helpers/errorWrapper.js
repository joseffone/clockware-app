'use strict';

export default (err, res, customMessage) => {
    if (!err) {
        return res.status(404).json({
            error: {
                message: customMessage
            }
        });
    }
    if (err.name === 'TokenExpiredError' ||
        err.name === 'JsonWebTokenError' ||
        err.name === 'NotBeforeError') {
        return res.status(404).json({
            error: {
                message: customMessage,
                jwt: err
            }
        });
    }
    return res.status(500).json({
        error: {
            message: err.message
        }
    });
};