import Store from '../data/store';

const appCommand = {

  /**
   * Handles commands set before app loaded and then redefines push command to execute
   * future commands immediately.
   *
   * @param arr
   * @param appName
   */
  init(arr, appName) {
    window[appName] = this;

    arr.forEach((func) => {
      this.push(func);
    });
  },

  /**
   * Executes closure pushed into app.
   * @param func
   */
  push(func) {
    try {
      const instrux = func();

      if (!instrux) {
        return;
      }

      if (typeof this[instrux.call] === 'function') {
        this[instrux.call](instrux.args);
      }
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  },

  /**
   * Sets token app will use to communicate with server.
   * @param t
   */
  setToken(t) {
    if (!Store().retrieveData('token')) {
      Store().addData('token', t);
    }
  },
};

module.exports = appCommand;
