var m = (o, i, t) =>
  new Promise((e, s) => {
    var h = (n) => {
        try {
          l(t.next(n));
        } catch (r) {
          s(r);
        }
      },
      a = (n) => {
        try {
          l(t.throw(n));
        } catch (r) {
          s(r);
        }
      },
      l = (n) => (n.done ? e(n.value) : Promise.resolve(n.value).then(h, a));
    l((t = t.apply(o, i)).next());
  });
import {
  getLocalStorage as u,
  alertMessage as c,
  removeAlerts as g,
} from "./utils.js";
import p from "./externalServices.js";
const d = new p();
function b(o) {
  const i = new FormData(o),
    t = {};
  return (
    i.forEach(function (e, s) {
      t[s] = e;
    }),
    t
  );
}
function y(o) {
  const i = o.map((t) => ({
    id: t.Id,
    price: t.FinalPrice,
    name: t.Name,
    quantity: 1,
  }));
  return i;
}
export default class x {
  constructor(i, t) {
    (this.key = i),
      (this.value = t),
      (this.cart = []),
      (this.subtotal = 0),
      (this.shipping = 0),
      (this.taxTotal = 0),
      (this.total = 0),
      (this.subtotalContent = ""),
      (this.shippingContent = "Shipping:"),
      (this.taxContent = "Tax:"),
      (this.orderContent = "Order Total:");
    for (let e = 0; e < localStorage.length; e++) {
      let s = u(e);
      this.cart.push(s);
    }
    this.itemQuantity = this.cart.length;
  }
  init() {
    this.calculateItemSummary(), this.getSubTotal();
  }
  calculateItemSummary() {
    this.itemQuantity > 1
      ? (this.subtotalContent = `${this.itemQuantity} Items Subtotal:`)
      : this.itemQuantity <= 1
      ? (this.subtotalContent = `${this.itemQuantity} Item Subtotal:`)
      : (this.subtotalContent = "No Items in Cart");
  }
  getSubTotal() {
    for (let a = 0; a < this.cart.length; a++) {
      let l = this.cart[a].ListPrice;
      this.subtotal = this.subtotal + l;
    }
    let i = document.getElementById("subtotalLabel"),
      t = document.getElementById("subtotalAmount"),
      e = document.getElementById("shippingLabel"),
      s = document.getElementById("taxLabel"),
      h = document.getElementById("orderLabel");
    (i.innerHTML = this.subtotalContent),
      (t.innerHTML = `$${this.subtotal.toFixed(2)}`),
      (e.innerHTML = this.shippingContent),
      (s.innerHTML = this.taxContent),
      (h.innerHTML = this.orderContent);
  }
  getShipping() {
    this.itemQuantity === 0
      ? (this.shippingContent = "N/A")
      : this.itemQuantity >= 1 && (this.shippingContent = "Shipping Estimate:"),
      (this.shipping = 10 + (this.itemQuantity - 1) * 2);
  }
  getTax() {
    this.taxTotal = (this.shipping + this.subtotal) * 0.06;
  }
  displayOrderSummary() {
    this.getShipping(), this.getTax();
    let i = document.getElementById("shippingAmount"),
      t = document.getElementById("taxAmount"),
      e = document.getElementById("orderAmount");
    (i.innerHTML = `$${this.shipping.toFixed(2)}`),
      (t.innerHTML = `$${this.taxTotal.toFixed(2)}`),
      (this.total = this.subtotal + this.shipping + this.taxTotal),
      (e.innerHTML = `$${this.total.toFixed(2)}`);
  }
  checkout() {
    return m(this, null, function* () {
      const i = document.forms.checkoutForm,
        t = b(i);
      (t.orderDate = new Date()),
        (t.orderTotal = this.subtotal),
        (t.tax = this.taxTotal),
        (t.shipping = this.shipping),
        (t.items = y(this.cart));
      try {
        const e = yield d.checkout(t);
        console.log(e),
          location.assign("checkedout.html"),
          localStorage.clear();
      } catch (e) {
        g();
        for (let s in e.message) c(e.message[s]);
      }
    });
  }
}
