'use strict';

import 'dotenv/config';
import nodemailer from 'nodemailer';

export default (message) => {
    const transporter = nodemailer.createTransport(
        {
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                refreshToken: process.env.EMAIL_REFRESH_TOKEN,
                clientId: process.env.EMAIL_CLIENT_ID,
                clientSecret: process.env.EMAIL_CLIENT_SECRET,
                accessUrl: process.env.EMAIL_ACCESS_URL
            }
        }, 
        {
            from: `Clockware <${process.env.EMAIL}>`
        }
    );

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                return reject(err);
            }
            console.log('Email sent:', info);
            return resolve(info);
        });
    });
};