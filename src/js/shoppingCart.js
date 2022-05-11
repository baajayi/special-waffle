import { loadHeaderFooter } from "./utils.js";
import { renderWithTemplate } from "./utils";

export default class ShoppingCart {
  constructor(category, parentElement, template) {
    this.category = category;
    this.parentElement = parentElement;
    this.datasource = [];
    this.template = template;
  }
  init() {
    this.getLocalStorage();
    const list = this.datasource;
    for (let i = 0; i < localStorage.length; i++) {
      renderWithTemplate(
        this.template,
        this.parentElement,
        list[i],
        this.prepareTemplate
      );
    }
  }
  getLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      let localStorageItem = JSON.parse(localStorage.getItem(i));
      this.datasource.push(localStorageItem);
    }
  }
  prepareTemplate(clone, product) {
    clone.querySelector("a").href += product.Id;
    clone.querySelector("img").src = product.Images.PrimaryMedium;
    clone.querySelector("img").alt = product.Name;
    clone.querySelector(".card__name").textContent = product.NameWithoutBrand;
    clone.querySelector(".cart-card__color").textContent =
      product.Colors[0].ColorName;
    clone.querySelector(".cart-card__quantity").textContent = "qty: 1";
    clone.querySelector(".cart-card__price").textContent = product.ListPrice;
    return clone;
  }
  getCartQuantity(classToShow, classToInsertHTML) {
    let cartQuantity = localStorage.length;
    let toShow = document.querySelector(`.${classToShow}`);
    let toInsert = document.querySelector(`.${classToInsertHTML}`);
    
    if (cartQuantity > 0) {
      toShow.setAttribute('class', 'cartTotalShow');
      toInsert.innerHTML = `Total Items: ${cartQuantity}`;
    } else {
      toShow.setAttribute('class', 'cartTotalShowEmpty');
      toInsert.setAttribute('class', 'emptyCart');
      toInsert.innerHTML = `Shopping Cart Empty`;

    }
  }
}



let parent = document.querySelector(".product-list");
let templateId = document.querySelector("#cart-template");
let shoppingCart = new ShoppingCart("tents", parent, templateId);
shoppingCart.init();
loadHeaderFooter("#cart-header", "#cart-footer");
shoppingCart.getCartQuantity("cartTotalHide", "cartTotal");

