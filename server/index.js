const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const app = express(),
    secret = Math.floor(Math.random() * 10000000),
    database = process.argv[2],
    username = process.argv[3],
    password = process.argv[4],
    host = process.argv[5],
    port = process.argv[6],
    connectToMySQL = function(callback) {
        // @TODO actually connect to mysql

        console.log('connecting to MySQL');

        // @TODO connect to mysql.
        console.log(database);
        console.log(username);
        console.log(password);
        console.log(host);
        console.log(port);

        mySqlCallback();
    },
    mySqlCallback = function(mySQLConnex) {
        // @TODO static routing for asset files
        // @TODO after connecting to SQL set routing

        console.log('Have callback from connectToMySQL. Starting server');

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