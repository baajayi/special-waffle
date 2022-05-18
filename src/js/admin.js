import ExternalServices from "./externalServices.js";
import { alertMessage } from './utils.js';



export default class Admin {

    constructor() {
        this.token = null;
        this.services = new ExternalServices();
        this.mainElement = document.getElementById("adminMain");
    }

    async login(creds, next) {
        try {
            this.token = await this.services.loginRequest(creds);
            next();
            
            //console.table(token);
        }
        catch(err) {
            //alertMessage(err.message.message);
            console.log(err.message.message);
        }
    };

    showLogin() {
        const form = `
            <form class="soForm" id="adminForm"">
                <fieldset>
                    <legend>Login</legend>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="name@email.com" autocomplete='username' value="user1@email.com">
                    <br>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password"  autocomplete='current-password' placeholder="password" value='user1'>
                    <br>
                    <input type="submit" id="login" value="Sign In">
                </fieldset>
            </form>
        `;

        document.getElementById('adminMain').innerHTML = form;

        document.getElementById('login').addEventListener('click', (e) => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            //console.log(`${email}, ${password}`);
            this.login({email, password}, this.getOrders.bind(this));
            
        });

        document.getElementById('orderButton').addEventListener('click', (e) => {
            this.getOrders();
            
        });
        
    };

    async getOrders() {
        try {
            const orderTable = await this.services.orderRequest(this.token);
            //console.log(orderTable);
            this.mainElement.innerHTML = this.orderHtml();
            const parent = document.getElementById('tableBody');
            // why not a template like we have done before?  The markup here was simple enough that I didn't think it worth the overhead...but a template would certainly work!
            parent.innerHTML = this.orderTableMaker(orderTable)
          } catch(err) {
            console.log(err);
          }
        }
        // document.getElementById('adminMain').innerHTML = form;

    orderHtml() {
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
        </table> `
    };

    orderTableMaker(orders) {
        const orderData = orders;
        //console.table(orderData);
        const table = document.getElementById('orderTable');
//        const tableBuilt = orders.forEach(order => (e) {
        for (let i = 0; i < orderData.length; i++) {      
             
            let container = document.createElement('tr');
            let id = document.createElement('td');
            let date = document.createElement('td');
            let items = document.createElement('td');
            let total = document.createElement('td');

            let orderDate = new Date(orderData[i].orderDate).toLocaleDateString('en-US');
            
            if (orderData[i].items === undefined) {
                this.length = 0;
            } else {
                this.length = orderData[i].items.length;
            };

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
        }; 
        
    }

    //<td>${new Date(order.orderDate).toLocaleDateString('en-US')}</td>
    //


};

let admin = new Admin;
admin.showLogin();