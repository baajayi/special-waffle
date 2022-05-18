var o = (s, t, e) =>
  new Promise((u, h) => {
    var p = (n) => {
        try {
          c(e.next(n));
        } catch (r) {
          h(r);
        }
      },
      d = (n) => {
        try {
          c(e.throw(n));
        } catch (r) {
          h(r);
        }
      },
      c = (n) => (n.done ? u(n.value) : Promise.resolve(n.value).then(p, d));
    c((e = e.apply(s, t)).next());
  });
const i = "http://157.201.228.93:2992/",
  f = "http://157.201.228.93:2992/checkout/";
function a(s) {
  return o(this, null, function* () {
    let t = yield s.json();
    if (s.ok) return t;
    throw { name: "servicesError", message: t };
  });
}
export default class l {
  getData(t) {
    return fetch(i + `products/search/${t}`)
      .then(a)
      .then((e) => e.Result);
  }
  findProductById(t) {
    return o(this, null, function* () {
      return yield fetch(i + `product/${t}`)
        .then(a)
        .then((e) => e.Result);
    });
  }
  checkout(t) {
    return o(this, null, function* () {
      const e = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      };
      return yield fetch(f, e).then(a);
    });
  }
}
