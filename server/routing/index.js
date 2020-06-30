const AppRouting = require('./appRouting');
const MemberRouting = require('./membershipRouting');

module.exports = {
  init: (app, mysqlConnex) => {
    const appRouting = new AppRouting(app);
    const memberRouting = new MemberRouting(app, mysqlConnex);

    appRouting.init();
    memberRouting.init();
  },
};
