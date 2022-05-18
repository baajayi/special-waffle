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
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
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
  let filterArray = [''];
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
  const templateData = await fetch(path).then((response) => response.text());
  let newTemplate = document.createElement('template');
  newTemplate.innerHTML = templateData;
  return newTemplate;
}
export async function loadHeaderFooter(header, footer) {
  let headerTemplate = await loadTemplate('../partials/header.html');
  let footerTemplate = await loadTemplate('../partials/footer.html');
  let headerElement = document.querySelector(header);
  let footerElement = document.querySelector(footer);
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message} <span>X</span></p>`;
  // add a listener to the alert to see if they clicked on the X

  // if they did then remove the child
  alert.addEventListener('click', function (e) {
    if (e.target.tagName == 'SPAN') {
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}

export function removeAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}
