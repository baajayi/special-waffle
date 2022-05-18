var h = (m, e, t) =>
  new Promise((i, r) => {
    var s = (a) => {
        try {
          u(t.next(a));
        } catch (n) {
          r(n);
        }
      },
      d = (a) => {
        try {
          u(t.throw(a));
        } catch (n) {
          r(n);
        }
      },
      u = (a) => (a.done ? i(a.value) : Promise.resolve(a.value).then(s, d));
    u((t = t.apply(m, e)).next());
  });
import { renderListWithTemplate as l } from "./utils.js";
export default class o {
  constructor(e, t, i, r) {
    (this.category = e),
      (this.listElement = t),
      (this.datasource = i),
      (this.template = r),
      (this.filterArray = []);
  }
  init() {
    return h(this, null, function* () {
      const e = yield this.datasource.getData(this.category);
      l(
        this.template,
        this.listElement,
        e,
        this.prepareTemplate,
        this.filterList
      );
    });
  }
  prepareTemplateOld(e, t) {
    return (
      (e.querySelector("a").href += t.Id),
      (e.querySelector("img").src = t.Image),
      (e.querySelector(".card__brand").textContent = t.Brand.Name),
      (e.querySelector(".card__name").textContent = t.NameWithoutBrand),
      (e.querySelector(".product-card__price").textContent += t.ListPrice),
      e
    );
  }
  prepareTemplate(e, t) {
    return (
      (e.querySelector("a").href += t.Id),
      (e.querySelector("img").src = t.Images.PrimaryMedium),
      (e.querySelector(".card__brand").textContent = t.Brand.Name),
      (e.querySelector(".card__name").textContent = t.NameWithoutBrand),
      (e.querySelector(
        ".product-card__price"
      ).textContent += t.ListPrice.toFixed(2)),
      e
    );
  }
  filterList(e, t, i, r) {
    if (i != !0) {
      let s = !1;
      return e === t.NameWithoutBrand.substring(0, 3)
        ? ((s = !0), s)
        : (r.push(t.NameWithoutBrand.substring(0, 3)), s);
    } else return r.push(t.NameWithoutBrand.substring(0, 3)), !0;
  }
}
