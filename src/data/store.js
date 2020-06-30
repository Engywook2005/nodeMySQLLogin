/**
 * Very basic data storage to be used between modules and components.
 * May be worth replacing with Redux once this needs enough complexity to justify that change.
 */
class Store {
  constructor() {
    this.store = {};
  }

  /**
   * Adds data to store. Will overwrite existing data for prop.
   * @param prop
   * @param val
   */
  addData(prop, val) {
    this.store[prop] = {
      timestamp: new Date().getTime(),
      data: val,
    };
  }

  /**
   * Retrieves current property including timestamp.
   *
   * @param prop
   * @returns {*}
   */
  retrieveData(prop) {
    return this.store[prop];
  }
}

let instance = null;

module.exports = () => {
  if (!instance) {
    instance = new Store();
  }

  return instance;
};
