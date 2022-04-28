import ProductData from "./productData.js";
import ProductDetails from "./productDetails";
import { getParams } from "./utils.js";
const dataSource = new ProductData("tents");

const productId = getParams("products");
//const prodTable = dataSource.findProductById(productId);

const product = new ProductDetails(productId, dataSource);
product.init();
