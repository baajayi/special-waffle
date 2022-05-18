import ExternalServices from "./externalServices.js";
import { alertMessage } from "./utils.js";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter("#main-header", "#main-footer");

export default class Admin {
  constructor(outputSelector) {
    this.token = null;
    this.services = new ExternalServices();
    this.mainElement = document.querySelector(outputSelector);
  }

  async login(creds) {
    // console.log("success")
    try {
      this.token = await this.services.loginRequest(creds);
      this.getOrders(this.token.accessToken);

      //console.table(token);
    } catch (err) {
      alertMessage(err.message.message);
    }
  }
  showLogin() {
    document.getElementById("adminMain").innerHTML = loginForm();

    document.getElementById("login").addEventListener("click", (e) => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      //console.log(`${email}, ${password}`);
      e.preventDefault();
      this.login({ email, password }, this.getOrders.bind(this));
    });
  }
  async getOrders() {
    try {
      const orders = await this.services.getOrders(this.token.accessToken);
      // console.log(orderTable);
      const parent = document.getElementById("orderHTML");
      // why not a template like we have done before?  The markup here was simple enough that I didn't think it worth the overhead...but a template would certainly work!
      console.table(orders);
      parent.innerHTML = this.orderTableMaker(orderTable);
    } catch (err) {
      // console.log(err);
    }
  }
  // document.getElementById('adminMain').innerHTML = form;
}
function loginForm() {
  return `
            <form class="soForm" id="adminForm"">
            <fieldset>
                <legend>Login</legend>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="name@email.com" autocomplete='username' value="user1@email.com">
                        <br>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password"  autocomplete='current-password' placeholder="password" value='user1'>
                        <br>
                        <input type="submit" id="login" value="Login">
                    </fieldset>
                </form>
            `;
}
function orderHtml() {
  return `
        <table id="orderTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>#Items</th>
                    <th>Total</th>
                </tr>
            </thead>
        </table> `;
}

function orderTableMaker(orders) {
  const orderData = orders;
  console.table(orderData);
  const table = document.getElementById("orderTable");

  for (let i = 0; i < orderData.length; i++) {
    let container = document.createElement("tr");
    let id = document.createElement("td");
    let date = document.createElement("td");
    let items = document.createElement("td");
    let total = document.createElement("td");

    let orderDate = new Date(orderData[i].orderDate).toLocaleDateString(
      "en-US"
    );

    if (orderData[i].items.length === undefined) {
      this.length = 0;
    } else {
      this.length = orderData[i].items.length;
    }

    let orderTotal = orderData[i].orderTotal;

    id.innerHTML = orderData[i].id;
    date.innerHTML = orderDate;
    items.innerHTML = this.length;
    total.innerHTML = `$${Number(orderTotal).toFixed(2)}`;

    container.appendChild(id);
    container.appendChild(date);
    container.appendChild(items);
    container.appendChild(total);

    table.appendChild(container);
  }
}

let admin = new Admin();
admin.showLogin();
