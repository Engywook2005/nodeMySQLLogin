const AppRouting = require('./appRouting');

module.exports = {
    init: (app, mysqlConnex) => {
        const appRouting = new AppRouting(app);

        appRouting.init();
    }
};