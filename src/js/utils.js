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
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
  
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

// export function renderWithTemplate(
//   template,
//   parentElement,
//   data,
//   callback,
//   callbackTwo
// ) {
//   let filterArray = [""];
//   list.forEach((element) => {
//     let exists = false;
//     if (callbackTwo){
//       filterArray.forEach((i) => {
//       exists = callbackTwo(i, element, exists, filterArray);
//     });
//     }
//     if (exists) {
//       exists = false;
//     }
//     else {
//       let clone = template.content.cloneNode(true);
//       if(callback){
//         clone = callback(clone, element);
//       }
//       parentElement.appendChild(clone);
//     }
//   });
// }

export async function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  await template;
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parentElement.appendChild(clone);
}

export async function loadTemplate(path) {
  const data = await fetch(path).then((response) => response.text());
  let newTemplate = document.createElement("template");
  newTemplate.innerHTML = data;
  return newTemplate;
}
export async function loadHeaderFooter(header, footer) {
  let headerTemplate = await loadTemplate("../partials/header.html");
  let footerTemplate = await loadTemplate("../partials/footer.html");
  let headerElement = document.querySelector(header);
  let footerElement = document.querySelector(footer);
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
