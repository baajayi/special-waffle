import { loadHeaderFooter as s } from "./utils.js";
import { renderWithTemplate as c } from "./utils.js";
export default class i {
  constructor(t, e, r) {
    (this.category = t),
      (this.parentElement = e),
      (this.datasource = []),
      (this.template = r),
      (this.total = 0);
  }
  init() {
    this.total = this.getLocalStorage();
    const t = this.datasource;
    for (let e = 0; e < localStorage.length; e++)
      c(this.template, this.parentElement, t[e], this.prepareTemplate);
  }
  getLocalStorage() {
    for (let t = 0; t < localStorage.length; t++) {
      let e = JSON.parse(localStorage.getItem(t));
      this.datasource.push(e), (this.total += e.FinalPrice);
    }
    return this.total;
  }
  prepareTemplate(t, e) {
    return (
      (t.querySelector("a").href += e.Id),
      (t.querySelector("img").src = e.Images.PrimaryMedium),
      (t.querySelector("img").alt = e.Name),
      (t.querySelector(".card__name").textContent = e.NameWithoutBrand),
      (t.querySelector(".cart-card__color").textContent =
        e.Colors[0].ColorName),
      (t.querySelector(".cart-card__quantity").textContent = "qty: 1"),
      (t.querySelector(".cart-card__price").textContent =
        "$" + e.ListPrice.toFixed(2)),
      t
    );
  }
  displayTotal() {
    localStorage.length > 0 &&
      ((document.getElementById("hide").style.display = "block"),
      (document.getElementById("total").innerHTML =
        "$" + this.total.toFixed(2)));
  }
  getCartQuantity(t, e) {
    let r = localStorage.length,
      o = document.querySelector(`.${t}`),
      a = document.querySelector(`.${e}`);
    r > 0
      ? (o.setAttribute("class", "cartTotalShow"),
        (a.innerHTML = `Total Items: ${r}`))
      : (o.setAttribute("class", "cartTotalShowEmpty"),
        a.setAttribute("class", "emptyCart"),
        (a.innerHTML = "Shopping Cart Empty"));
  }
}
let n = document.querySelector(".product-list"),
  m = document.querySelector("#cart-template"),
  l = new i("tents", n, m);
l.init(),
  s("#cart-header", "#cart-footer"),
  l.displayTotal(),
  l.getCartQuantity("cartTotalHide", "cartTotal");
