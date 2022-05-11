import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from './checkoutProcess.js';

loadHeaderFooter("#checkout-header", "#checkout-footer");

const myCheckout = new CheckoutProcess()
myCheckout.init();