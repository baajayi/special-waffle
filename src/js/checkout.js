//checkout.js
import { loadHeaderFooter } from "./utils.js";
loadHeaderFooter("#checkout-header", "#checkout-footer");


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

}
let checkoutProcess = new CheckoutProcess();
checkoutProcess.init()