import { loadHeaderFooter } from "./utils.js";
import { renderListWithTemplate } from "./utils.js";

export default class ShoppingCart {
  constructor(category, listElement, datasource, template) {
    this.category = category;
    this.listElement = listElement;
    this.datasource = [];
    this.template = template;
  }
  init() {
      this.getLocalStorage();
      const list = this.datasource;
        for (let i = 0; i < localStorage.length; i++) {
          renderWithTemplate(
                  this.template,
                  this.listElement,
                  list[i],
                  this.prepareTemplate
                    );
        }   }
  // renderList(productList){
  //     productList.forEach(element => {
  //         const clone = this.template.content.cloneNode(true);
  //         const preparedClone=this.prepareTemplate(clone,element)
  //         this.listElement.appendChild(preparedClone);
  //         console.log(element)
  //     });
  // }
  prepareTemplate(clone, product) {
    clone.querySelector("a").href += product.Id;
    clone.querySelector("img").src = product.Image;
    clone.querySelector(".card__brand").textContent = product.Brand.Name;
    clone.querySelector(".card__name").textContent = product.NameWithoutBrand;
    clone.querySelector(".product-card__price").textContent +=
      product.ListPrice;
    return clone;
    // clone[img].setAttribute('src',product.Image)
  }
}
loadHeaderFooter("#main-header", "#main-footer")