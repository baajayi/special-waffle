const baseURL = "http://157.201.228.93:2992/";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  // constructor() {

  // }

  getData(category) {
    //fetch(baseURL + `products/search/${category}`)
    //            .then(convertToJson).then((data) => data.Result);
    //console.log(data.Result);
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((info) => info.Result);

    //fetch(this.path)
    //     .then(convertToJson)
    //     .then((data) => {
    //     products = data;
    // });>
    // async function getProductsDataAwait() {
    //     products = await fetch("../json/tents.json").then(convertToJson);
    //     console.log(products);
    // }
  }

  async findProductById(id) {
    //const products = await this.getData();
    //return products.find((item) => item.Id === id);
    return await fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
}
