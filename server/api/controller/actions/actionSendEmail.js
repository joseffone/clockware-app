'use strict';

import sendEmail from '../../helpers/emailSender';
import tokensController from '../../helpers/tokensController';
import errorWrapper from '../../helpers/errorWrapper';

export default () => {
    return (req, res) => {
        const bodyMask = ['order_id', 'link', 'city_name', 'clock_type', 'start_date', 'expiration_date', 'agent_first_name', 'agent_last_name'];
        let isBodyValid = true;
        for (let key of bodyMask) {
            isBodyValid = isBodyValid && req.body[key];
        }
        if (!isBodyValid) {
            const error = new Error('The body of the received request is invalid');
            error.status = 400;
            return errorWrapper(error, res, null);
        }
        tokensController.getConfirmToken({userData: {...req.userData}, order_id: req.body.order_id})
            .then((confirmToken) => {
                const message = {
                    to: req.userData.email,
                    subject: 'Reservation confirmation',
                    html: `
                        <h2>Dear ${req.userData.first_name} ${req.userData.last_name}</h2>
                        <p>Thank you for choosing Clockware LTD. We are pleased to confirm your reservation as under:</p>
                        <ul>
                            <li><b>ID:</b> ${req.body.order_id}</li>
                            <li><b>Clock type:</b> ${req.body.clock_type}</li>
                            <li><b>City:</b> ${req.body.city_name}</li>
                            <li><b>Watchmaker:</b> ${req.body.agent_first_name} ${req.body.agent_last_name}</li>
                            <li><b>Start date:</b> ${req.body.start_date}</li>
                            <li><b>Exp. date:</b> ${req.body.expiration_date}</li>
                        </ul>
                        <p>Everything is correct? If it is,&nbsp;<a href='${req.body.link}/${confirmToken}'>confirm</a>&nbsp;reservation.</p>
                    `
                };
                sendEmail(message).then((info) => {
                    res.status(200).json(info);
                }, (err) => {
                    errorWrapper(err, res, null);
                });
            }, (err) => {
                errorWrapper(err, res, 'Email token generation failed');
            });
    };
};