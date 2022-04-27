let products = [],
  i = localStorage.length;
function convertToJson(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}
function setLocalStorage(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((t) => {
      products = t;
    });
}
function addToCart(t) {
  i += 1;
  const e = products.find((n) => n.Id === t.target.dataset.id);
  setLocalStorage(i, e);
}
getProductsData(),
  document.getElementById("addToCart").addEventListener("click", addToCart);
