import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from './checkoutProcess.js';

loadHeaderFooter("#checkout-header", "#checkout-footer");

const myCheckout = new CheckoutProcess()
myCheckout.init();

document.querySelector('#zip').addEventListener('blur', myCheckout.displayOrderSummary.bind(myCheckout));
// listening for click on the button
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();

myCheckout.checkout();
});