const stringContainsNumberSymbols = (str) => {
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+|\d/.test(str);
  return hasSymbols;
};

const fetchRequest = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const getExtension = (filename) => {
  const parts = filename.split(".");
  return parts[parts.length - 1];
};
export { stringContainsNumberSymbols, fetchRequest, getExtension };
