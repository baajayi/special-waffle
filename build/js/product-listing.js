import e from "./productList.js";
import o from "./externalServices.js";
import { loadHeaderFooter as r, getParams as c } from "./utils.js";
r("#main-header", "#main-footer");
const t = c("category"),
  a = t.charAt(0).toUpperCase() + t.slice(1);
document.getElementById("category").innerHTML = a;
const n = new o(),
  s = document.querySelector(".product-list"),
  i = document.querySelector("#product-card-template"),
  m = new e(t, s, n, i);
m.init();
