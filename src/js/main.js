import ProductData from "./productData.js";
import ProductList from "./productList.js";

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", "main", dataSource);
const selectorId = "product-card-template";
const cardArea = "main";
productList.init(selectorId, cardArea);
