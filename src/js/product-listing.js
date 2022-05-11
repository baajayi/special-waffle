import ProductList from "./productList.js";
import ExternalServices from "./externalServices.js";
import { loadHeaderFooter, getParams } from "./utils.js";

loadHeaderFooter("#main-header", "#main-footer");

const category = getParams("category");
const cat = category.charAt(0).toUpperCase() + category.slice(1);
document.getElementById("category").innerHTML = cat;
const externalServices = new ExternalServices();
const ul = document.querySelector(".product-list");
const template = document.querySelector("#product-card-template");
const productList = new ProductList(category, ul, externalServices, template);
productList.init();
