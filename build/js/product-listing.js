import o from "./productList.js";
import e from "./productData.js";
import { loadHeaderFooter as r, getParams as c } from "./utils.js";
r("#main-header", "#main-footer");
const t = c("category"),
  a = t.charAt(0).toUpperCase() + t.slice(1);
document.getElementById("category").innerHTML = a;
const n = new e(),
  s = document.querySelector(".product-list"),
  d = document.querySelector("#product-card-template"),
  m = new o(t, s, n, d);
m.init();
