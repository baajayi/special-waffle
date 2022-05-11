import { getLocalStorage } from "./utils.js";

const postURL = "http://157.201.228.93:2992/checkout";

export default class CheckoutProcess {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        
        this.cart = [];
        
        this.subtotal = 0.00;
        this.shipping = 0.00;
        this.taxTotal = 0.00;
        this.total = 0.00;
        
        this.subtotalContent = '';
        this.shippingContent = '';
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
        this.getShipping();
        this.getTax();
        this.displayOrderSummary();
    }

    calculateItemSummary() {
        
        if (this.itemQuantity > 1) {
            this.subtotalContent = `${this.itemQuantity} Items Subtotal:`;
            //subtotalLabel.textContent = `${itemQuantity} Items Subtotal`;
        } else if (this.itemQuantity <= 1) {
            this.subtotalContent =  `${this.itemQuantity} Item Subtotal:`;
            //subtotalLabel.innerHTML = `${itemQuantity} Item Subtotal`;
        } else {
            this.subtotalContent = "No Items in Cart";
            //subtotalLabel.innerHTML = "No Items in Cart";
        };
    }


    getSubTotal() { //Get called at page load
        
        for (let i = 0; i < this.cart.length; i++){
            let itemPrice = this.cart[i].ListPrice;
            this.subtotal = this.subtotal + itemPrice;
        }
    } 

    getShipping() {

        if (this.itemQuantity === 0) {
            this.shippingContent = "N/A";
        } else if (this.itemQuantity >= 1) {
            this.shippingContent = "Shipping Estimate:";
        };
        
        // if (this.itemQuantity > 0) {
        //     for (let i = 0; i < this.itemQuantity; i++) {
        //     this.shipping = this.shipping + 10
            
        //     }
        // }
        
        this.shipping = 10 + (this.itemQuantity - 1 ) * 2;
    }

    getTax() {
        this.taxTotal = (this.shipping + this.subtotal) * 0.06;
        //console.log(this.taxTotal);
    }


    
    displayOrderSummary() { //Gets called after zip code entered
        let subtotalLabel = document.getElementById("subtotalLabel");
        let subtotalCost = document.getElementById("subtotalAmount");
        let shippingLabel = document.getElementById("shippingLabel");
        let shippingAmount = document.getElementById("shippingAmount");
        let taxLabel = document.getElementById("taxLabel");
        let taxAmount = document.getElementById("taxAmount");
        let orderLabel = document.getElementById("orderLabel");
        let orderAmount = document.getElementById("orderAmount");

        subtotalLabel.innerHTML = this.subtotalContent;
        subtotalCost.innerHTML = `$${this.subtotal.toFixed(2)}`;

        shippingLabel.innerHTML = this.shippingContent;
        shippingAmount.innerHTML = `$${this.shipping.toFixed(2)}`;

        taxLabel.innerHTML = this.taxContent;
        taxAmount.innerHTML = `$${this.taxTotal.toFixed(2)}`;
        
        this.total = this.subtotal + this.shipping + this.taxTotal;

        orderLabel.innerHTML = this.orderContent;
        orderAmount.innerHTML = `$${this.total.toFixed(2)}`;
    }
}