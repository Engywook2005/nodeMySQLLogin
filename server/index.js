const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const mysqlInterface = require('./mysql');
const routing = require('./routing');

const app = express();
const secret = Math.floor(Math.random() * 10000000);
const database = process.argv[2];
const user = process.argv[3];
const password = process.argv[4];
const host = process.argv[5];
const port = process.argv[6];
const connectToMySQL = (callback) => {
  const mysqlConnex = mysqlInterface.getConnex(database, user, password, host, port);

  callback(mysqlConnex);
};
const mySqlCallback = (mySQLConnex) => {
  console.log('MySQL connected. Starting server.'); // eslint-disable-line no-console

  app.use(
    session(
      {
        secret: `${secret}`,
        saveUninitialized: true,
        resave: true,
      },
    ),
  );
  app.use(express.static(`${process.cwd()}/html/public`));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine', 'ejs');

  routing.init(app, mySQLConnex);
  app.listen(8082);

  console.log('listening on port 8082'); // eslint-disable-line no-console
};

connectToMySQL(mySqlCallback);
