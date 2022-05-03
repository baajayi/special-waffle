import { loadHeaderFooter } from "./utils.js";
import { renderWithTemplate } from "./utils";

export default class ShoppingCart{
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
            let localStorageItem=JSON.parse(localStorage.getItem(i));
            this.datasource.push(localStorageItem)
        }
      }
    prepareTemplate(clone, product) {
        console.log(product)
        clone.querySelector("a").href += product.Id;
        clone.querySelector("img").src = product.Image;
        clone.querySelector("img").alt = product.Name;
        clone.querySelector(".card__name").textContent = product.NameWithoutBrand;
        clone.querySelector('.cart-card__color').textContent = product.Colors[0].ColorName;
        clone.querySelector('.cart-card__quantity').textContent = 'qty: 1';
        clone.querySelector('.cart-card__price').textContent = product.ListPrice;
        return clone;
      }
}

let parent = document.querySelector('.product-list');
let template = document.querySelector('#cart-template');
let shoppingCart = new ShoppingCart('tents',parent,template);
shoppingCart.init();
loadHeaderFooter('#cart-header','#cart-footer');