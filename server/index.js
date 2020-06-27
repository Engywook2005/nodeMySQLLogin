const bodyParser = require('body-parser');
const express = require('express');
const mysqlInterface = require('./mysql');
const session = require('express-session');

const app = express(),
    secret = Math.floor(Math.random() * 10000000),
    database = process.argv[2],
    user = process.argv[3],
    password = process.argv[4],
    host = process.argv[5],
    port = process.argv[6],
    connectToMySQL = function(callback) {
        const mysqlConnex = mysqlInterface.getConnex(database, user, password, host, port);;

        callback(mysqlConnex);
    },
    mySqlCallback = function(mySQLConnex) {
        // @TODO static routing for asset files
        // @TODO after connecting to SQL set routing - pass app and mysqlConnex

        console.log('MySQL connected. Starting server.');

        app.use(
            session(
                {
                    secret: '' + secret,
                    saveUninitialized: true,
                    resave: true
                }
            )
        );

        app.use(bodyParser.urlencoded({extended: true}));

        app.listen(8082);
    };

connectToMySQL(mySqlCallback);