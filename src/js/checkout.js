import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from './CheckoutProcess.js';

loadHeaderFooter("#checkout-header", "#checkout-footer");

const checkout = new CheckoutProcess(0, '.checkoutSummary');
checkout.init();