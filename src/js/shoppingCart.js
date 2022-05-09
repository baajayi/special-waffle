import { loadHeaderFooter } from "./utils.js";
import { renderWithTemplate } from "./utils";

export default class ShoppingCart {
  constructor(category, parentElement, template) {
    this.category = category;
    this.parentElement = parentElement;
    this.datasource = [];
    this.template = template;
    this.total=0;
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
    this.displayTotal()
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
    clone.querySelector(".cart-card__quantity").textContent += 1;
    clone.querySelector(".cart-card__price").textContent = product.ListPrice;
    return clone;
  }
  displayTotal(){
    if (localStorage.length===0){
      document.querySelector('.cart-total-and-Btn').classList.toggle('hide',true);
      console.log('something')
    }
    else{
      document.querySelector('.cart-total-and-Btn').classList.toggle('hide',false);
      console.log('empty');
      document.querySelector('.cart-total').textContent+=`$${this.total}`;
    }
  }
}

let parent = document.querySelector(".product-list");
let templateId = document.querySelector("#cart-template");
let shoppingCart = new ShoppingCart("tents", parent, templateId);
shoppingCart.init();
loadHeaderFooter("#cart-header", "#cart-footer");
