const mysql = require('mysql');

class QueryHub {
    static execQuery(mysqlConnex, callback, type, table, fields, where) {
        const queries = {
            SELECT: this.selectQuery,
            INSERT: this.insertQuery,
            UPDATE: this.updateQuery,
            DELETE: this.deleteQuery
        };

        try {
            const sql = queries[type](table, fields, where);
            console.log(sql);

            mysqlConnex.query(sql, (error, results) => {
                if(error) {
                    callback(error);
                } else {
                    callback(null, results);
                }
            });

        } catch(err) {

            // @TODO handle - use callback.
            console.log(`MySQL error: ${err}`);
        }
    }

    static insertQuery(table, kvps) {
        const keys = Object.keys(kvps);

        let fields = '',
            values = '';

        for(let i = 0; i < keys.length; i++) {
            const nextSpacer = (i === (keys.length - 1)) ?
                '' :
                ', ';

            fields = `${fields}${keys[i]}${nextSpacer}`;
            values = `${values}${mysql.escape(kvps[keys[i]])}${nextSpacer}`;
        }

        return `INSERT INTO ${table} (${fields}) VALUES (${values})`;
    }
}

module.exports = QueryHub;