//checkout.js
import { loadHeaderFooter, getLocalStorage } from "./utils.js";
loadHeaderFooter("#checkout-header", "#checkout-footer");
import ExternalServices from "./externalServices.js";
let externalServices = new ExternalServices();
//variable to pass into packageItems
let localStorageItems = [];
for (let i=0;i<localStorage.length;i++){
    localStorageItems.push(getLocalStorage(i))
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required 
    // for the checkout process. Array.map would be perfect for this.
    let itemsForm = [];
    items.map((item)=>{
        let product = {}; 
        product.id = item.Id; 
        product.name = item.Name; 
        product.price = item.FinalPrice; 
        product.quantity = '1'; 
        itemsForm.push(product)})
        return itemsForm
    }
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    console.log(key)
    // console.log("=")
    // console.log(value)
    convertedJSON[key] = value;
  });
  console.log(convertedJSON)
  convertedJSON.orderTotal=23122
  convertedJSON.shipping=232;
  convertedJSON.tax=2321
  convertedJSON.orderDate = '2021-01-27T18:18:26.095Z'
  return convertedJSON;
}
// formDataToJSON(document.forms[0])




class CheckoutProcess{
    constructor(){
        this.subTotal = 0
        this.shipping = 0
        this.tax = 0
        this.total = 0
        this.form = document.forms[0];
    }
    init(){
        this.displaySubtotal()
        this.calculateTotal()
        const that = this
        this.form.zip.addEventListener('change', this.displayOrderTotals.bind(this),false)
        let object= this.checkout(this.form)
        document.querySelector('#checkoutForm').addEventListener('submit',externalServices.checkout(object))
        // externalServices.checkout(object)
    }
    displaySubtotal(){
        for (let i = 0; i < localStorage.length; i++) {
            let localStorageItem = JSON.parse(localStorage.getItem(i));
            this.subTotal += localStorageItem.FinalPrice;
          }
        document.querySelector("#subtotal").innerHTML = `$${this.subTotal}`
    }
    calculateTotal(){
        for (let i = 0; i < localStorage.length; i++) {
            if (i === 0){this.shipping += 10}
            else{this.shipping += 2};
          }
        this.tax = (this.subTotal*0.06).toFixed(2)
        this.total = this.subTotal + this.shipping + parseFloat(this.tax);
        console.log(this.shipping, this.tax, this.total)
    }
    displayOrderTotals(){
        console.log(this.shipping, this.tax, this.total)
        document.querySelector('#order-total').textContent = `$${this.total}`
        document.querySelector('#shipping-estimate').textContent = `$${this.shipping}`
        document.querySelector('#tax').textContent = `$${this.tax}`
    }
    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, 
        // and the information entered into the form
        let order = formDataToJSON(form)
        order.items = packageItems(localStorageItems)
        console.log(order)
        // call the checkout method in our ExternalServices module and send it our data object.
        return order
      }
}
let checkoutProcess = new CheckoutProcess();
checkoutProcess.init()

// console.log(Object.getPrototypeOf(externalServices))
// externalServices.checkout(thing)
// document.querySelector('#checkoutForm').addEventListener('submit',)