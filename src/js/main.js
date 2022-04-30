import ProductData from "./productData.js";
import ProductList from "./productList.js";

const tag = "card-area";
const dataSource = new ProductData("tents");
const productList = new ProductList("tents", tag, dataSource);
const selectorId = "product-card-template";
//const cardArea = "main";
productList.init(selectorId);
