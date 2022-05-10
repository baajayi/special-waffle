import { getLocalStorage } from './utils.js';

export default class CheckoutProcess {

    constructor(key, tag) {
        this.key = key;
        this.tag = tag;
        this.subTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.total = 0;
        this.numItems = 0;

    }
    init() {
        this.calcSubtotal();
    }

    calcSubtotal() {
        let product = [];
        for (let i = 0; i < localStorage.length; i++){
            product = getLocalStorage(i);
            this.numItems++;
            this.subTotal += product.FinalPrice;   
        }
        document.getElementById('numItems').innerHTML = this.numItems;
        this.calcTotal();
    }
    calcTotal(){
        //Shipping estimate
        if (localStorage.length == 1){
            this.shipping = 10;
        }
        else {
            this.shipping = ((localStorage.length - 1) * 2) + 10;
        }
        //Tax estimate
        this.tax = this.subTotal * .06;
        //total
        this.total = this.subTotal + this.tax + this.shipping;
        this.displayCheckout();
    }

    displayCheckout() {
        document.getElementById('checkoutTotal').innerHTML = "$" + this.subTotal.toFixed(2);
        document.getElementById('shipping').innerHTML = "$" + this.shipping.toFixed(2);
        document.getElementById('tax').innerHTML = "$" + this.tax.toFixed(2);
        document.getElementById('total').innerHTML = "$" + this.total.toFixed(2);

    }
    // async checkout() {
    //     const form = document.forms['checkout'];
    //     console.log("hello");
    //     const jsonForm = createJSON(form);
    //     jsonForm.orderDate = new Date();
    //     jsonForm.total = this.total;
    //     jsonForm.shipping = this.shipping;
    //     jsonForm.tax = this.tax;
    //     jsonForm.numItems = this.numItems;
    //     console.log(jsonForm.tax);
    // }
}