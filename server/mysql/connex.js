const mysql = require('mysql');

let instance = null;

class MySQLConnex {
    constructor() {
        this.msConnex = null;
    }

    connect(database, user, password, host, port) {
        if(!this.msConnex) {

            console.log('MySQL not connected. Connecting.');

            this.msConnex = mysql.createConnection({
                database: database,
                user: user,
                password: password,
                host: host,
                port: port
            });

            this.msConnex.on('error', (err) => {
                console.log(`MySQL error: ${err}`)
            });

            this.keepAlive();
        }

        return this.msConnex;
    }

    keepAlive() {
        console.log(`Whacking that dead man's switch`);

        this.msConnex.query('SELECT 1;', () => {
            setTimeout(() => {
                this.keepAlive();
            }, 540000);
        });
    }
}

module.exports = () => {
    if(!instance) {
        instance = new MySQLConnex();
    }

    return instance;
};