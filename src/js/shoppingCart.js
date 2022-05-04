import { loadHeaderFooter } from "./utils.js";
import { renderWithTemplate } from "./utils.js";

export default class ShoppingCart {
    constructor(catergory, parentElement, template) {
        this.catergory = catergory;
        this.parentElement = parentElement;
        this.template = template;
        this.dataArray = []; 

    }

    init() {
        this.getLocalStorage();
        let list = this.dataArray;
        for (let i = 0; i < localStorage.length; i++) {
            //console.log(list);
            renderWithTemplate(this.template, this.parentElement, list[i], this.prepareTemplate);
            //console.log(list[i]);
        }
    }

    getLocalStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            let localStorageItem = JSON.parse(localStorage.getItem(i));
            this.dataArray.push(localStorageItem)
        }
      }
    
    prepareTemplate(clone, product) {
        //console.log(product);
        clone.querySelector("a").href += product.Id;
        clone.querySelector("img").src = product.Image;
        clone.querySelector(".card__name").textContent = product.Name;
        clone.querySelector(".cart-card__price").textContent = `$${product.ListPrice}`;
        clone.querySelector(".cart-card__color").textContent = product.Colors[0].ColorName;
        return clone;
    }
}

let parent = document.querySelector('.product-list');
let template = document.querySelector('#cart-template');
let shoppingCart = new ShoppingCart('tents',parent,template);
shoppingCart.init();

loadHeaderFooter('../partials/header.html', '.header');
loadHeaderFooter('../partials/footer.html', '.footer');





