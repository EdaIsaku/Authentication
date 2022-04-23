const stringContainsNumberSymbols = (str) => {
  return /[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+|\d/.test(str);
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
export { stringContainsNumberSymbols, fetchRequest };
