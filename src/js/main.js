import ProductData from "./productData.js";
import ProductList from "./productList.js";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();
const productData = new ProductData("tents");
const data = productData.getData();
const ul = document.querySelector(".product-list");
const template = document.querySelector("#product-card-template");
const productList = new ProductList("tents", ul, data, template);
productList.init();
