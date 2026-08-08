import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import fs from "fs";

dotenv.config();

let startFunc = async () => {

    if ("KS_MAIL_ID" in process.env === false) {
        console.log("KS_MAIL_ID not found in .env file");
        return await false;
    };

    if ("KS_MAIL_PASSWORD" in process.env === false) {
        console.log("KS_MAIL_PASSWORD not found in .env file");
        return await false;
    };

    if ("KS_TO_MAIL_ID" in process.env === false) {
        console.log("KS_TO_MAIL_ID not found in .env file");
        return await false;
    };

    const LocalFromSendMail = jFTransporterForGoogle.sendMail({
        from: `"KeshavSoft" ${process.env.KS_MAIL_ID}`,
        to: `${process.env.KS_TO_MAIL_ID}`,
        subject: `Hello ✔`,
        text: "16",
        html: ""
    });

    return await LocalFromSendMail;
};

let jFTransporterForGoogle = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.KS_MAIL_ID,
        pass: process.env.KS_MAIL_PASSWORD
    }
});

export default startFunc;