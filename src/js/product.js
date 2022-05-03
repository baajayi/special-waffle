import ProductData from "./productData.js";
import ProductDetails from "./productDetails";
import { getParams } from "./utils.js";
import { loadHeaderFooter } from "./utils.js";
const dataSource = new ProductData("tents");

const productId = getParams("products");

const product = new ProductDetails(productId, dataSource);
product.init();

const header = document.getElementById("main-header");
const footer = document.getElementById("main-footer");
loadHeaderFooter(header, footer);