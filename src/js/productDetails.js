import { setLocalStorage } from "./utils.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.products = {};
    this.dataSource = dataSource;
    this.i = localStorage.length;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.products = await this.dataSource.findProductById(this.productId);
    document.querySelector("main").innerHTML = this.renderProductDetails(
      this.products
    );
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  //setLocalStorage(key, data) {
  //   localStorage.setItem(key, JSON.stringify(data));
  //  }

  addToCart() {
    this.i += 1;
    //const product = this.dataSource.find((item) => item.Id === this.productId);
    setLocalStorage(localStorage.length, this.products);
  }

  renderProductDetails(product) {
    //method to generate the HTML to display our product.
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.Name}</h2>
        <img
          class="divider"
          src=${product.Images.PrimaryLarge}
          alt=${product.Name}
        />

        <p class="product-card__price">$${product.ListPrice.toFixed(2)}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
        </div>
      </section>`;
  }
}
