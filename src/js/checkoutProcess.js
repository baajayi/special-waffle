import { getLocalStorage } from "./utils";

export default class CheckoutProcess {
    constructor(key, cartLabel) {
        this.key = key;
        this.cartLabel = cartLabel;
        this.sTotal = 0
        this.tax = 0
        this.cartCount = 0
        this.shipping = 0
    }
    init() {
        this.sumTotal ()
    }

    sumTotal () {
        let item = []
        for (let i=0; i<localStorage.length; i++) {
            item = getLocalStorage(i)
            this.cartCount++;
            this.sTotal += item.FinalPrice;
        }
        document.getElementById("cart-count").innerHTML = this.cartCount;
        this.grandTotal();
       
    }
    grandTotal () {
        if (localStorage.length == 1) {
            this.shipping = 10
        } else {
            this.shipping = 10 + ((localStorage.length - 1) * 2)
        }
        this.tax = (this.sTotal * 0.6)

        this.total = (this.sTotal + this.tax + this.shipping).toFixed(2);
        this.displayOrderTotals()

    }

    displayOrderTotals () {
        document.querySelector("#shipping").innerHTML = this.shipping.toFixed(2)
        document.querySelector("#tax").innerHTML = this.tax.toFixed(2)
        document.querySelector("#subtotal").innerHTML = this.sTotal.toFixed(2)
        document.querySelector("#total").innerHTML = this.total

}
}