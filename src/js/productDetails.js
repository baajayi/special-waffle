import ProductData from "./productData.js";
import { setLocalStorage } from "./utils.js";


export default class ProductDetails {
    constructor (productId, dataSource) {
        
        this.productId = productId;
        this.products = {};
        this.dataSource = dataSource;
        this.i = localStorage.length;
        this.prodTable = dataSource.findProductById(productId);
        this.prodName = this.prodTable.Name;
        console.log('datasource:');
        console.table(this.dataSource);
    }

    async init () {
         // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        this.products = await this.dataSource.findProductById(this.productId);
        //document.querySelector('main').innerHTML = this.renderProductDetails();
        document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    }

    //setLocalStorage(key, data) {
    //   localStorage.setItem(key, JSON.stringify(data));
    //  }

    addToCart(e) {
        this.i += 1;
        //const product = this.dataSource.find((item) => item.Id === this.productId);
        setLocalStorage(localStorage.length, this.products);
    }

    renderProductDetails() {
        //method to generate the HTML to display our product.
        const productHTML = `<section class="product-detail">
        <h3>Cedar Ridge</h3>
        <h2 class="divider">Rimrock Tent - 2-Person, 3-Season</h2>
        <img
          class="divider"
          src="../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg"
          alt="Rimrock Tent - 2-Person, 3-Season"
        />

        <p class="product-card__price">$69.99</p>
        <p class="product__color">Rust/Clay</p>
        <p class="product__description">
          Lightweight and ready for adventure, this Cedar Ridge Rimrock tent
          boasts a weather-ready design that includes a tub-style floor and
          factory-sealed rain fly
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
        </div>
      </section>`


    }
}