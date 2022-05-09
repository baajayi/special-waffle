var c = (n, r, t) =>
  new Promise((d, a) => {
    var f = (e) => {
        try {
          o(t.next(e));
        } catch (s) {
          a(s);
        }
      },
      l = (e) => {
        try {
          o(t.throw(e));
        } catch (s) {
          a(s);
        }
      },
      o = (e) => (e.done ? d(e.value) : Promise.resolve(e.value).then(f, l));
    o((t = t.apply(n, r)).next());
  });
const u = "http://157.201.228.93:2992/";
function h(n) {
  if (n.ok) return n.json();
  throw new Error("Bad Response");
}
export default class p {
  getData(r) {
    return fetch(u + `products/search/${r}`)
      .then(h)
      .then((t) => t.Result);
  }
  findProductById(r) {
    return c(this, null, function* () {
      return yield fetch(u + `product/${r}`)
        .then(h)
        .then((t) => t.Result);
    });
  }
}
