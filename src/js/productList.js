import { renderListWithTemplate } from './utils.js'

export default class ProductList{
    constructor(category,listElement,datasource,template){
        this.category=category;
        this.listElement=listElement;
        this.datasource=datasource;
        this.template=template
        this.filterArray=[]
    }
    async init(){
        const list = await this.datasource;
        // this.renderList(list)
        renderListWithTemplate(this.template,this.listElement,list,this.prepareTemplate)
        console.log(this.filterArray)
    }
    // renderList(productList){
    //     productList.forEach(element => {
    //         const clone = this.template.content.cloneNode(true);
    //         const preparedClone=this.prepareTemplate(clone,element)
    //         this.listElement.appendChild(preparedClone);
    //         console.log(element)
    //     });
    // }
    prepareTemplate(clone,product){
        clone.querySelector('a').href+= product.Id;
        clone.querySelector('img').src=product.Image;
        clone.querySelector('.card__brand').textContent=product.Brand.Name
        clone.querySelector('.card__name').textContent=product.NameWithoutBrand
        clone.querySelector('.product-card__price').textContent+=product.ListPrice
        return clone
        // clone[img].setAttribute('src',product.Image)
    }
    filterList(i,element){
        if(i===element.NameWithoutBrand.substring(0,3)){
            return true
          }
          else{console.log(i,element.NameWithoutBrand.substring(0,3))}
    }
    updateFilterList(filterArray,element){
        filterArray.push(element.NameWithoutBrand.substring(0,3))
    }
}