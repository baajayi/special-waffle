let cartItemsArray = [];

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let j = 0;
  while (j != localStorage.length) {
    let cartItem = getLocalStorage(j);
    cartItemsArray.push(cartItem);
    j++;
  }
  let htmlItems = cartItemsArray.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

getCartContents();
