import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter("#checkout-header", "#checkout-footer");

const myCheckout = new CheckoutProcess();
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.displayOrderSummary.bind(myCheckout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  let myForm = document.forms[0];
  let chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    myCheckout.checkout();
  }
});
