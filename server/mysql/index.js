const Connex = require('./connex');
const QueryHub = require('./queryHub');

module.exports = {
  getConnex: (database, user, password, host, port) => {
    const connex = Connex();
    return connex.connect(database, user, password, host, port);
  },
  execQuery: (mysqlConnex, callback, type, table, fields, where) => {
    QueryHub.execQuery(mysqlConnex, callback, type, table, fields, where);
  },
};
