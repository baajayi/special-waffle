import ExternalServices from './externalServices';
import ProductDetails from './productDetails';
import { getParams } from './utils.js';

const dataSource = new ExternalServices('tents');

//console.log(dataSource);
//console.log(dataSource.getData());

const productId = getParams('product');
//const prodTable = dataSource.findProductById(productId);

const product = new ProductDetails(productId, dataSource);
product.init();
//console.log(product);

// add listener to Add to Cart button
//document.getElementById('addToCart').addEventListener('click', addToCart());

// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

// get tents data
// function getProductsData() {
//   fetch("../json/tents.json")
//     .then(convertToJson)
//     .then((data) => {
//       products = data;
//     });
// }
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
// function addToCart(e) {
//   i += 1;
//   //const product = products.find((item) => item.Id === e.target.dataset.id);
//   setLocalStorage(i, product);
// }

//findProductById(item);
//getProductsData();
