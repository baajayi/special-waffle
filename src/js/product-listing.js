import ProductList from "./productList.js";
import ProductData from "./productData.js";
import { loadHeaderFooter, getParams } from "./utils.js";

loadHeaderFooter("#main-header", "#main-footer");

const category = getParams("category");
const cat = category.charAt(0).toUpperCase() + category.slice(1);
document.getElementById("category").innerHTML = cat;
const productData = new ProductData();
const ul = document.querySelector(".product-list");
const template = document.querySelector("#product-card-template");
const productList = new ProductList(category, ul, productData, template);
productList.init();
