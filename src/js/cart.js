import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  //let markup = "";
  for (let i = 0; i < localStorage.length; i++) {
    let cartItem = getLocalStorage(i);
    //const htmlItems = cartItems.map((item) => renderCartItem(item));
    //document.querySelector(".product-list").innerHTML = htmlItems.join("");
    let ul = document.querySelector(".product-list");
    //tag creation
    let itemLi = document.createElement("li");
    let itemA = document.createElement("a");
    let itemAImg = document.createElement("img");
    let itemA2 = document.createElement("a");
    let itemAH2 = document.createElement("h2");
    let itemPColor = document.createElement("p");
    let itemPQuantity = document.createElement("p");
    let itemPPrice = document.createElement("p");
    // attributes
    itemLi.setAttribute("class", "cart-card divider");
    itemA.setAttribute("class", "cart-card__image");
    itemA.setAttribute("href", "#");
    itemAImg.setAttribute("src", `${cartItem.Image}`);
    itemAImg.setAttribute("alt", `${cartItem.Name}`);
    itemA2.setAttribute("href", "#");
    itemAH2.setAttribute("class", "card__name");
    itemPColor.setAttribute("class", "cart-card__color");
    itemPQuantity.setAttribute("class", "cart-card__quantity");
    itemPPrice.setAttribute("class", "cart-card__price");
    //textContent
    itemAH2.textContent = `${cartItem.Name}`;
    itemPColor.textContent = `${cartItem.Colors[0].ColorName}`;
    itemPQuantity.textContent = "qty: 1";
    itemPPrice.textContent = `${cartItem.FinalPrice}`;

    //appending

    itemLi.appendChild(itemA);
    itemA.appendChild(itemAImg);
    itemLi.appendChild(itemA2);
    itemLi.appendChild(itemAH2);
    itemLi.appendChild(itemPColor);
    itemLi.appendChild(itemPQuantity);
    itemLi.appendChild(itemPPrice);

    ul.appendChild(itemLi);
  }
}

getCartContents();