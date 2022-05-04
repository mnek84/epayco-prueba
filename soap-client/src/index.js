import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './routes';
import dotenv from 'dotenv/config';
import path from 'path';
import os from 'os';
import cors from 'cors';

import {ErrorResponse, notFoundResponse} from "./utils/ApiResponse";
import fs from "fs";
import ejs from "ejs";

const enabledDomains = []

//let rev = "Err"
//express.disable('x-powered-by');

const startServer = async () => {
    const webserver = express();

    webserver.use(morgan('dev',{}));

    webserver.disable('x-powered-by');
    webserver.set('x-powered-by', false);

    const options = cors.CorsOptions = {
        origin: enabledDomains
    };

    // Then pass these options to cors:
    webserver.use(cors(options));
    webserver.use(express.json());
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({extended: true}));

    webserver.get('/', (req, res, next) => {
        const html = '<b>API SERVER:</b>';
        res.send(html);
    });

    //Define Routes

    webserver.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // If needed
        res.header("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept")
        res.header('Access-Control-Allow-Credentials', true);
        res.header('x-powered-by',"EPAYCO")
        next()
    });

    webserver.use('/', api);

    // Log errors
    webserver.on('uncaughtException', function(req, res, route, err) {
        console.error(req.body, res.body, route, err);
        return false;
    });

    webserver.use((req, res) => {
        //res.status(404).json()
        notFoundResponse(res,"ENDPOINT: " + req.path + " INEXISTENTE");
    })

    /*
    Start Server
    */
    webserver.listen(process.env.APP_PORT, () => {

    })


}

startServer().then(r => console.log("Server started.")).catch(e=>{
    console.error(e.message);
    process.exit(1);
});
