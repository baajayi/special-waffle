const baseURL = "http://157.201.228.93:2992/";
const postURL = "http://157.201.228.93:2992/checkout/";
const loginURL = "http://157.201.228.93:2992/login";

async function convertToJson(res) {
  let jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
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

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(postURL, options).then(convertToJson);
  }

  async loginRequest(creds) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    //console.log("Options"); // Troubleshooting
    //console.log(options);
    return await fetch(loginURL, options).then(convertToJson);
  }

  async getOrders(token) {
    console.log(token);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const orders = fetch(baseURL + "orders", options).then(convertToJson);
    console.log(options);
    return orders;
  }
}
