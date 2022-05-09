import { loadHeaderFooter as o } from "./utils.js";
import { renderWithTemplate as l } from "./utils.js";
export default class r {
  constructor(t, e, a) {
    (this.category = t),
      (this.parentElement = e),
      (this.datasource = []),
      (this.template = a);
  }
  init() {
    this.getLocalStorage();
    const t = this.datasource;
    for (let e = 0; e < localStorage.length; e++)
      l(this.template, this.parentElement, t[e], this.prepareTemplate);
  }
  getLocalStorage() {
    for (let t = 0; t < localStorage.length; t++) {
      let e = JSON.parse(localStorage.getItem(t));
      this.datasource.push(e);
    }
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
      (t.querySelector(".cart-card__price").textContent = e.ListPrice),
      t
    );
  }
}
let i = document.querySelector(".product-list"),
  s = document.querySelector("#cart-template"),
  c = new r("tents", i, s);
c.init(), o("#cart-header", "#cart-footer");
