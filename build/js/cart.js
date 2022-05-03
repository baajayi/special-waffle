function getLocalStorage(e) {
  return JSON.parse(localStorage.getItem(e));
}
function getCartContents() {
  for (let e = 0; e < localStorage.length; e++) {
    let a = getLocalStorage(e + 1),
      o = document.querySelector(".product-list"),
      t = document.createElement("li"),
      r = document.createElement("a"),
      l = document.createElement("img"),
      d = document.createElement("a"),
      c = document.createElement("h2"),
      n = document.createElement("p"),
      i = document.createElement("p"),
      m = document.createElement("p");
    t.setAttribute("class", "cart-card divider"),
      r.setAttribute("class", "cart-card__image"),
      r.setAttribute("href", "#"),
      l.setAttribute("src", `${a.Image}`),
      l.setAttribute("alt", `${a.Name}`),
      d.setAttribute("href", "#"),
      c.setAttribute("class", "card__name"),
      n.setAttribute("class", "cart-card__color"),
      i.setAttribute("class", "cart-card__quantity"),
      m.setAttribute("class", "cart-card__price"),
      (c.textContent = `${a.Name}`),
      (n.textContent = `${a.Colors[0].ColorName}`),
      (i.textContent = "qty: 1"),
      (m.textContent = `${a.FinalPrice}`),
      t.appendChild(r),
      r.appendChild(l),
      t.appendChild(d),
      t.appendChild(c),
      t.appendChild(n),
      t.appendChild(i),
      t.appendChild(m),
      o.appendChild(t);
  }
}
getCartContents();
