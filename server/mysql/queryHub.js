const mysql = require('mysql');

class QueryHub {
  static execQuery(mysqlConnex, callback, type, table, fields, where) {
    const queries = {
      SELECT: this.selectQuery,
      INSERT: this.insertQuery,
      UPDATE: this.updateQuery,
      DELETE: this.deleteQuery,
    };

    try {
      const sql = queries[type](table, fields, where);

      // @TODO env to determine whether we log the actual query for debugging purposes.

      mysqlConnex.query(sql, (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static insertQuery(table, kvps) {
    const keys = Object.keys(kvps);

    let fields = '';
    let values = '';

    for (let i = 0; i < keys.length; i += 1) {
      const nextSpacer = (i === (keys.length - 1))
        ? ''
        : ', ';

      fields = `${fields}${keys[i]}${nextSpacer}`;
      values = `${values}${mysql.escape(kvps[keys[i]])}${nextSpacer}`;
    }

    return `INSERT INTO ${table} (${fields}) VALUES (${values})`;
  }

  static selectQuery(table, props, where) {
    const listSelectFields = (fields) => {
      let returnFields = '';

      for (let i = 0; i < fields.length; i += 1) {
        const nextSpacer = (i === (fields.length - 1))
          ? ''
          : ', ';

        returnFields = `${returnFields}${fields[i]}${nextSpacer}`;
      }

      return returnFields;
    };
    const selectFields = (props || props === '*')
      ? '*'
      : listSelectFields(props);

    return `SELECT ${selectFields} FROM ${table}${QueryHub.handleWhere(where)};`;
  }

  static updateQuery() {
    // @TODO
    return '';
  }

  static deleteQuery() {
    // @TODO
    return '';
  }

  static handleWhere(where) {
    let returnWhere = '';

    if (!where) {
      return returnWhere;
    }

    const keys = Object.keys(where);

    returnWhere = ' WHERE ';

    for (let i = 0; i < keys.length; i += 1) {
      // @TODO move this to a util function.
      // @TODO for later... handle OR as well.
      const nextSpacer = (i === (keys.length - 1))
        ? ''
        : ' AND ';

      returnWhere = `${returnWhere}${keys[i]}=${where[keys[i]]}${nextSpacer}`;
    }

    return returnWhere;
  }
}

module.exports = QueryHub;
