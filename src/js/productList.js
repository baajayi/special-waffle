import { renderListWithTemplate } from './utils.js';

export default class ProductList {
    constructor(category, dataSource, listTemplate){
        this.category = category;
        this.dataSource = dataSource;
        this.listTemplate = listTemplate
    }
    async init () {
        const list = await this.dataSource.getData();

        this.removeItem(list, 2);
        this.removeItem(list, 3);

        this.renderList(list)
    }
    removeItem(array, removeIndex) {
        array.splice(removeIndex, 1);
    }

    prepareTemplate(template, product) {
    
        template.querySelector('a').href +=  product.Id;
        template.querySelector('img').src = product.Image;
        template.querySelector('img').alt += product.Name;
        template.querySelector('.card__brand').textContent = product.Brand.Name;
        template.querySelector('.card__name').textContent = product.NameWithoutBrand;
        template.querySelector('.product-card__price').textContent += product.FinalPrice; 
        return template;
      }

    renderList(list) {
        const template = document.getElementById('product-card-template');
        renderListWithTemplate(template, this.listTemplate, list, this.prepareTemplate)
    }

}