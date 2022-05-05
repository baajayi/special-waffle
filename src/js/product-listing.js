import ProductList from "./productList.js";
import ProductData from "./productData.js";
import { loadHeaderFooter, getParams } from './utils.js';

loadHeaderFooter('#main-header','#main-footer');

const category = getParams('category');
console.log(category)
const productData = new ProductData();
const data = await productData.getData('tents');
console.log(data)
const ul = document.querySelector(".product-list");
const template = document.querySelector("#product-card-template");
const productList = new ProductList(category, ul, productData, template);
productList.init();