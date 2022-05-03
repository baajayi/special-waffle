import { loadHeaderFooter } from "./utils.js";
import { renderListWithTemplate } from "./utils.js";

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
            console.log(list);
            renderListWithTemplate(this.template, this.parentElement, list[i], this.prepareTemplate);
        }
    }

    getLocalStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            let localStorageItem = JSON.parse(localStorage.getItem(i));
            this.dataArray.push(localStorageItem)
        }
      }
    
    prepareTemplate(clone, product) {
        console.log(product);
        clone.querySelector("a").href += product.Id;
        clone.querySelector("img").src = product.Image;
        clone.querySelector(".card__brand").textContent = product.Brand.Name;
        clone.querySelector(".card__name").textContent = product.NameWithoutBrand;
        clone.querySelector(".product-card__price").textContent += product.ListPrice;
        return clone;
        // clone[img].setAttribute('src',product.Image)
    }
}

let parent = document.querySelector('.product-list');
let template = document.querySelector('#cart-template');
let shoppingCart = new ShoppingCart('tents',parent,template);
shoppingCart.init();

loadHeaderFooter('.header', '../partials/header.html');
loadHeaderFooter('.footer', '../partials/footer.html');





