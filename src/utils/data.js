module.exports = {
  storeData(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  },
  getData(name) {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch (err) {
      return null;
    }
  },
};
