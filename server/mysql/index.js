const Connex = require('./connex');

module.exports = {
    getConnex: (database, user, password, host, port) => {
        const connex = Connex();
        return connex.connect(database, user, password, host, port)
    }
};