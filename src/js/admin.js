import ExternalServices from './ExternalServices.js';
import { alertMessage } from './utils.js';
import { loadHeaderFooter } from "../js/utils.js";

loadHeaderFooter();
const myAdmin = new Admin("main");
myAdmin.showLogin();

export default class Admin {
    constructor(outputSelector) {
        this.adminMain = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
    }
    async login(credentials, next) {
        try {
            this.token = await this.services.loginRequest(credentials)
            next();
        }
        catch(err) {
            alertMessage(err.message.message);
        }
    }
    showLogin() {
        this.adminMain.innerHTML = loginForm();
        document.querySelector("#loginButton").addEventListener("click",(e) => {
            const email = document.querySelector("#email").value;
            const pwd = document.querySelector("#password").value;
            this.login({email, pwd}, this.showOrders.bind(this));
        } );
    }
    async showOrders() {
        try {
            const items = await this.services.getOrders(this.token);
            this.adminMain.innerHTML = orderHTML();
            const parent = document.querySelector("#orders tbody");
            parent.innerHTML = orders.map(order => `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td><td>${order.items.length}</td><td>${order.orderTotal}</td></tr>`).join("")
        } catch(err){
            console.log(err);
        }
    }
}
function loginForm() {
    return `<fieldset class="login-form">
    <legend>Login</legend>
    <p>
    <label for="email">Email</label>
    <input type="text" placeholder="email" id="email" value="user1@email.com"/>
  </p>
  <p>
    <label for="password">Password</label>
    <input type="password" placeholder="password" id="password" />
  </p>
  <button type="submit" id="loginButton">Login</button>
</fieldset>`

}
function orderHTML() {
    return `<h2>Current Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>
    `;
}