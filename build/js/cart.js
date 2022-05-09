import { loadHeaderFooter as s } from "./utils.js";
function u(e) {
  return JSON.parse(localStorage.getItem(e));
}
function p() {
  for (let e = 0; e < localStorage.length; e++) {
    let r = u(e),
      m = document.querySelector(".product-list"),
      t = document.createElement("li"),
      a = document.createElement("a"),
      l = document.createElement("img"),
      d = document.createElement("a"),
      c = document.createElement("h2"),
      n = document.createElement("p"),
      i = document.createElement("p"),
      o = document.createElement("p");
    t.setAttribute("class", "cart-card divider"),
      a.setAttribute("class", "cart-card__image"),
      a.setAttribute("href", "#"),
      l.setAttribute("src", `${r.Image}`),
      l.setAttribute("alt", `${r.Name}`),
      d.setAttribute("href", "#"),
      c.setAttribute("class", "card__name"),
      n.setAttribute("class", "cart-card__color"),
      i.setAttribute("class", "cart-card__quantity"),
      o.setAttribute("class", "cart-card__price"),
      (c.textContent = `${r.Name}`),
      (n.textContent = `${r.Colors[0].ColorName}`),
      (i.textContent = "qty: 1"),
      (o.textContent = `${r.FinalPrice}`),
      t.appendChild(a),
      a.appendChild(l),
      t.appendChild(d),
      t.appendChild(c),
      t.appendChild(n),
      t.appendChild(i),
      t.appendChild(o),
      m.appendChild(t);
  }
}
s("#cart-header", "#cart-footer"), p();
