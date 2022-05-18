import { getLocalStorage, alertMessage, removeAlerts } from './utils.js';
import ExternalServices from './externalServices';

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) =>
    //console.log(item);
    ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    })
  );
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, value) {
    this.key = key;
    this.value = value;

    this.cart = [];

    this.subtotal = 0.0;
    this.shipping = 0.0;
    this.taxTotal = 0.0;
    this.total = 0.0;

    this.subtotalContent = '';
    this.shippingContent = 'Shipping:';
    this.taxContent = 'Tax:';
    this.orderContent = 'Order Total:';

    for (let i = 0; i < localStorage.length; i++) {
      let cartItem = getLocalStorage(i);
      this.cart.push(cartItem);
    }
    this.itemQuantity = this.cart.length;
  }

  init() {
    //this.cart = getLocalStorage(this.key);
    //console.table(this.cart);
    this.calculateItemSummary();
    this.getSubTotal();
  }

  calculateItemSummary() {
    if (this.itemQuantity > 1) {
      this.subtotalContent = `${this.itemQuantity} Items Subtotal:`;
      //subtotalLabel.textContent = `${itemQuantity} Items Subtotal`;
    } else if (this.itemQuantity <= 1) {
      this.subtotalContent = `${this.itemQuantity} Item Subtotal:`;
      //subtotalLabel.innerHTML = `${itemQuantity} Item Subtotal`;
    } else {
      this.subtotalContent = 'No Items in Cart';
      //subtotalLabel.innerHTML = "No Items in Cart";
    }
  }

  getSubTotal() {
    //Get called at page load

    for (let i = 0; i < this.cart.length; i++) {
      let itemPrice = this.cart[i].ListPrice;
      this.subtotal = this.subtotal + itemPrice;
    }

    let subtotalLabel = document.getElementById('subtotalLabel');
    let subtotalCost = document.getElementById('subtotalAmount');
    let shippingLabel = document.getElementById('shippingLabel');
    let taxLabel = document.getElementById('taxLabel');
    let orderLabel = document.getElementById('orderLabel');

    subtotalLabel.innerHTML = this.subtotalContent;
    subtotalCost.innerHTML = `$${this.subtotal.toFixed(2)}`;

    shippingLabel.innerHTML = this.shippingContent;
    taxLabel.innerHTML = this.taxContent;
    orderLabel.innerHTML = this.orderContent;
  }

  getShipping() {
    if (this.itemQuantity === 0) {
      this.shippingContent = 'N/A';
    } else if (this.itemQuantity >= 1) {
      this.shippingContent = 'Shipping Estimate:';
    }

    // if (this.itemQuantity > 0) {
    //     for (let i = 0; i < this.itemQuantity; i++) {
    //     this.shipping = this.shipping + 10

    //     }
    // }

    this.shipping = 10 + (this.itemQuantity - 1) * 2;
  }

  getTax() {
    this.taxTotal = (this.shipping + this.subtotal) * 0.06;
    //console.log(this.taxTotal);
  }

  displayOrderSummary() {
    //Gets called after zip code entered
    this.getShipping();
    this.getTax();

    let shippingAmount = document.getElementById('shippingAmount');
    let taxAmount = document.getElementById('taxAmount');
    let orderAmount = document.getElementById('orderAmount');
    shippingAmount.innerHTML = `$${this.shipping.toFixed(2)}`;
    taxAmount.innerHTML = `$${this.taxTotal.toFixed(2)}`;
    this.total = this.subtotal + this.shipping + this.taxTotal;
    orderAmount.innerHTML = `$${this.total.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms['checkoutForm'];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.subtotal;
    json.tax = this.taxTotal;
    json.shipping = this.shipping;
    json.items = packageItems(this.cart);
    try {
      const res = await services.checkout(json);
      console.log(res);
      location.assign('checkedout.html');
      localStorage.clear();
    } catch (err) {
      removeAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
    }
  }
}
