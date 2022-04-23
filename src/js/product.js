let products = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get tents data
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {
  let product = products.find((item) => item.Id === e.target.dataset.id);
  let i=0
  if (localStorage.getItem(0)===null){
    setLocalStorage(0,product)
  }
  else{
    let k=1
    while(i!=localStorage.length){
    i++;
    setLocalStorage(k,product);
   }
  }
  
  // setLocalStorage("so-cart", product);
}

getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
