var d = (e, t, n) =>
  new Promise((r, o) => {
    var c = (a) => {
        try {
          l(n.next(a));
        } catch (i) {
          o(i);
        }
      },
      s = (a) => {
        try {
          l(n.throw(a));
        } catch (i) {
          o(i);
        }
      },
      l = (a) => (a.done ? r(a.value) : Promise.resolve(a.value).then(c, s));
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
export function renderListWithTemplate(e, t, n, r, o) {
  let c = [""];
  n.forEach((s) => {
    let l = !1;
    if (
      (c.forEach((a) => {
        l = o(a, s, l, c);
      }),
      l)
    )
      l = !1;
    else {
      const a = e.content.cloneNode(!0),
        i = r(a, s);
      t.appendChild(i);
    }
  });
}
export function renderWithTemplate(e, t, n, r) {
  return d(this, null, function* () {
    yield e;
    let o = e.content.cloneNode(!0);
    r && (o = r(o, n)), t.appendChild(o);
  });
}
export function loadTemplate(e) {
  return d(this, null, function* () {
    const t = yield fetch(e).then((r) => r.text());
    let n = document.createElement("template");
    return (n.innerHTML = t), n;
  });
}
export function loadHeaderFooter(e, t) {
  return d(this, null, function* () {
    let n = yield loadTemplate("../partials/header.html"),
      r = yield loadTemplate("../partials/footer.html"),
      o = document.querySelector(e),
      c = document.querySelector(t);
    renderWithTemplate(n, o), renderWithTemplate(r, c);
  });
}
export function alertMessage(e, t = !0) {
  const n = document.createElement("div");
  n.classList.add("alert"),
    (n.innerHTML = `<p>${e} <span>X</span></p>`),
    n.addEventListener("click", function (o) {
      o.target.tagName == "SPAN" && r.removeChild(this);
    });
  const r = document.querySelector("main");
  r.prepend(n), t && window.scrollTo(0, 0);
}
export function removeAlerts() {
  const e = document.querySelectorAll(".alert");
  e.forEach((t) => document.querySelector("main").removeChild(t));
}
