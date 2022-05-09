var p = (e, t, n) =>
  new Promise((o, a) => {
    var c = (r) => {
        try {
          l(n.next(r));
        } catch (i) {
          a(i);
        }
      },
      s = (r) => {
        try {
          l(n.throw(r));
        } catch (i) {
          a(i);
        }
      },
      l = (r) => (r.done ? o(r.value) : Promise.resolve(r.value).then(c, s));
    l((n = n.apply(e, t)).next());
  });
export function qs(e, t = document) {
  return t.querySelector(e);
}
export function getLocalStorage(e) {
  return JSON.parse(localStorage.getItem(e));
}
export function setLocalStorage(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
export function setClick(e, t) {
  qs(e).addEventListener("touchend", (n) => {
    n.preventDefault(), t();
  }),
    qs(e).addEventListener("click", t);
}
export function getParams(e) {
  const t = window.location.search,
    n = new URLSearchParams(t);
  return n.get(e);
}
export function renderListWithTemplate(e, t, n, o, a) {
  let c = [""];
  n.forEach((s) => {
    let l = !1;
    if (
      (c.forEach((r) => {
        l = a(r, s, l, c);
      }),
      l)
    )
      l = !1;
    else {
      const r = e.content.cloneNode(!0),
        i = o(r, s);
      t.appendChild(i);
    }
  });
}
export function renderWithTemplate(e, t, n, o) {
  return p(this, null, function* () {
    yield e;
    let a = e.content.cloneNode(!0);
    o && (a = o(a, n)), t.appendChild(a);
  });
}
export function loadTemplate(e) {
  return p(this, null, function* () {
    const t = yield fetch(e).then((o) => o.text());
    let n = document.createElement("template");
    return (n.innerHTML = t), n;
  });
}
export function loadHeaderFooter(e, t) {
  return p(this, null, function* () {
    let n = yield loadTemplate("../partials/header.html"),
      o = yield loadTemplate("../partials/footer.html"),
      a = document.querySelector(e),
      c = document.querySelector(t);
    renderWithTemplate(n, a), renderWithTemplate(o, c);
  });
}
