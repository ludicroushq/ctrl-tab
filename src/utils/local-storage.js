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
