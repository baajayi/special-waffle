import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, listElement, datasource, template) {
    this.category = category;
    this.listElement = listElement;
    this.datasource = datasource;
    this.template = template;
    this.filterArray = [];
  }
  async init() {
    const list = await this.datasource.getData(this.category);
    // this.renderList(list)
    renderListWithTemplate(
      this.template,
      this.listElement,
      list,
      this.prepareTemplate,
      this.filterList
    );
  }
  // renderList(productList){
  //     productList.forEach(element => {
  //         const clone = this.template.content.cloneNode(true);
  //         const preparedClone=this.prepareTemplate(clone,element)
  //         this.listElement.appendChild(preparedClone);
  //         console.log(element)
  //     });
  // }
  prepareTemplateOld(clone, product) {
    clone.querySelector("a").href += product.Id;
    clone.querySelector("img").src = product.Image;
    clone.querySelector(".card__brand").textContent = product.Brand.Name;
    clone.querySelector(".card__name").textContent = product.NameWithoutBrand;
    clone.querySelector(".product-card__price").textContent +=
      product.ListPrice;
    return clone;
    // clone[img].setAttribute('src',product.Image)
  }
  prepareTemplate(clone, product) {
    clone.querySelector("a").href += product.Id;
    clone.querySelector("img").src = product.Images.PrimaryMedium;
    clone.querySelector(".card__brand").textContent = product.Brand.Name;
    clone.querySelector(".card__name").textContent = product.NameWithoutBrand;
    clone.querySelector(
      ".product-card__price"
    ).textContent += product.ListPrice.toFixed(2);
    return clone;
    // clone[img].setAttribute('src',product.Image)
  }
  filterList(i, element, boolean, filterArray) {
    if (boolean != true) {
      let alreadyExists = false;
      if (i === element.NameWithoutBrand.substring(0, 3)) {
        alreadyExists = true;
        return alreadyExists;
      } else {
        filterArray.push(element.NameWithoutBrand.substring(0, 3));
        return alreadyExists;
      }
    } else {
      filterArray.push(element.NameWithoutBrand.substring(0, 3));
      return true;
    }
  }
}
