// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//product pull from HTML URL parameter
export function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("product");
  return product;
}
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback,
  callbackTwo
) {
  let filterArray = [""];
  list.forEach((element) => {
    let exists = false;
    filterArray.forEach((i) => {
      exists = callbackTwo(i, element, exists, filterArray);
    });
    if (exists) {
      exists = false;
    } else {
      const clone = template.content.cloneNode(true);
      const preparedClone = callback(clone, element);
      parentElement.appendChild(preparedClone);
    }
  });
}
