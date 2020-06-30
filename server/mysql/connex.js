const mysql = require('mysql');

let instance = null;

class MySQLConnex {
  constructor() {
    this.msConnex = null;
  }

  connect(database, user, password, host, port) {
    if (!this.msConnex) {
      this.msConnex = mysql.createConnection({
        database,
        user,
        password,
        host,
        port,
      });

      this.msConnex.on('error', (err) => {
        console.error(`MySQL error: ${err}`); // eslint-disable-line no-console
      });

      this.keepAlive();
    }

    return this.msConnex;
  }

  keepAlive() {
    console.log('Whacking that dead man\'s switch'); // eslint-disable-line no-console

    this.msConnex.query('SELECT 1;', () => {
      setTimeout(() => {
        this.keepAlive();
      }, 540000);
    });
  }
}

module.exports = () => {
  if (!instance) {
    instance = new MySQLConnex();
  }

  return instance;
};
