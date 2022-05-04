import nodemailer from "nodemailer";
import fs from "fs";
import ejs from "ejs";
import {htmlToText} from "html-to-text";
import juice from "juice";
import dotenv from 'dotenv/config';

const smtp = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
    }
});

export default ({ template: templateName, templateVars, ...restOfOptions }) => {

    const templatePath = `src/emails/${templateName}.html`;

    const options = {
        ...restOfOptions,
    };

    if (templateName && fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, "utf-8");
        const html = ejs.render(template, templateVars);
        const text = htmlToText(html);
        options.html = juice(html);
        options.text = text;
    }else{
        console.error("El Template no existe");
    }

    return smtp.sendMail(options);
};
