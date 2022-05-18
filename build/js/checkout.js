import { loadHeaderFooter as r } from "./utils.js";
import u from "./checkoutProcess.js";
r("#checkout-header", "#checkout-footer");
const e = new u();
e.init(),
  document
    .querySelector("#zip")
    .addEventListener("blur", e.displayOrderSummary.bind(e)),
  document.querySelector("#checkoutSubmit").addEventListener("click", (o) => {
    o.preventDefault();
    let t = document.forms[0],
      c = t.checkValidity();
    t.reportValidity(), c && e.checkout();
  });
