import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, tag, dataSource) {
    this.category = category;
    this.tag = tag;
    this.dataSource = dataSource;
  }

  async init(selectorId, cardArea) {
    var list = await this.dataSource.getData();
    const newList = this.reduceList(list);
    this.renderList(newList, selectorId, cardArea);
  }

  //Get rid of extra tents
  reduceList(list) {
    list.splice(2, 1);
    list.splice(3, 1);
    return list;
  }

  renderList(list, selectorId, cardArea) {
    const grabTemplate = document.getElementById(selectorId);
    renderListWithTemplate(grabTemplate, cardArea, list, this.prepareTemplate);
  }

  prepareTemplate(tempClone, product) {
    tempClone.querySelector("a").href += product.Id;
    tempClone.querySelector(".card__name").innerHTML = product.Name;
    tempClone.querySelector(".card__brand").innerHTML = product.Brand.Name;
    tempClone.querySelector(".product-card__price").innerHTML =
      product.ListPrice;
    tempClone.querySelector("img").src = product.Image;
    tempClone.querySelector("img").alt += product.Name;
    return tempClone;
  }
}
