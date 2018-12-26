export const storeData = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getData = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (err) {
    return null;
  }
};

export const clearData = (key) => {
  localStorage.removeItem(key);
};
