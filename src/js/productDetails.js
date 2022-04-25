export default class ProductDetails {
    constructor (productId, dataSource) {
        this.productId = productId;
        this.products = {};
        this.dataSource = dataSource;
    }

    async init () {
         // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('productPlacement')
        .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart(e) {
        i += 1;
        const product = this.products.find((item) => item.Id === e.target.dataset.id);
        setLocalStorage(i, product);
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