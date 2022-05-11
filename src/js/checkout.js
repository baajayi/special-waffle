import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";
loadHeaderFooter("#main-header", "#main-footer");

let Checkout = new CheckoutProcess(0, ".checkout-summary");
Checkout.init();

document.getElementById("sbmtbtn").addEventListener("click", (e) => {
    e.preventDefault()
    Checkout.Checkout();
})

