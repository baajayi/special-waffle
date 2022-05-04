import ProductList from "./productList.js";
import ProductData from "./productData.js";
import { loadHeaderFooter, getParam } from './utils.js';

loadHeaderFooter();

const category = getParam('category');
const productData = new ProductData("tents");
//const data = productData.getData();
const ul = document.querySelector(".product-list");
const template = document.querySelector("#product-card-template");
const productList = new ProductList(category, ul, productData, template);
productList.init();