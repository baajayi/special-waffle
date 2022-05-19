import ExternalServices from "./externalServices";
import { alertMessage } from "./utils";

export default class Admin{
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.externalServices = new ExternalServices();
        this.table='';
      }
    async login(creds){
        console.log('success')
        try{
            this.token = await this.externalServices.loginRequest(creds);
            let ordersList = this.externalServices.getOrders(this.token.accessToken)
            let organizedList = this.orderOrganizer(await ordersList);
            console.log(this.table);
            return this.table;
        }
        catch(err){
            alertMessage(err.message.message);
        }
    }
    async showLogin(){
        let adminMain =document.querySelector('#admin-main');
        let title = document.createElement('h2');
        title.textContent = 'Login';
        adminMain.appendChild(title);
        let divElement = document.createElement('div');
        let loginForm = document.createElement('form');
        let loginFieldset = document.createElement('fieldset');
        let emailLabel = document.createElement('label');
        let emailInput = document.createElement('input');
        let submitBtn = document.createElement('button');
        // let getOrder = document.createElement('button');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.textContent = 'Login';
        emailLabel.for = 'email';
        emailInput.id = 'email';
        emailInput.name = 'email';
        emailInput.type = 'email';
        emailInput.autocomplete = 'email-adress';
        emailInput.required = true;
        let passwordLabel = document.createElement('label');
        let passwordInput = document.createElement('input');
        passwordLabel.for = 'password';
        passwordInput.id = 'password';
        passwordInput.name = 'password';
        passwordInput.type = 'password';
        passwordInput.required = true;
        passwordInput.autocomplete = 'current-password';
        passwordLabel.textContent = 'Password:';
        emailLabel.textContent = 'Email';
        passwordLabel.appendChild(passwordInput);
        emailLabel.appendChild(emailInput);
        loginFieldset.appendChild(emailLabel);
        loginFieldset.appendChild(passwordLabel);
        loginFieldset.appendChild(submitBtn);
        loginForm.appendChild(loginFieldset);
        divElement.appendChild(loginForm);
        // divElement.appendChild(getOrder);
        adminMain.appendChild(divElement);
        emailInput.value="user1@email.com";
        passwordInput.value="user1";
        let creds = { email: emailInput.value , password: passwordInput.value }
        submitBtn.addEventListener('click',(ev)=>{
            ev.preventDefault();
            let table = this.login(creds);
            console.log(this.table)
            // adminMain.innerHTML= table;
        });
    }
    
    async orderOrganizer(ordersList){
        this.table = "<table> <tr> <th>Id</th> <th>Name</th> <th>Date</th> <th>Place</th> <th>Total</th> </tr>";
        let iterableOrderList = await ordersList;
        iterableOrderList.forEach(order => {
            let newRow = `<tr> 
            <td>${order.id}</td> 
            <td>${order.lname}, ${order.fname}</td> 
            <td>${order.orderDate.substring(0,10)}</td> 
            <td>${order.city}, ${order.state}</td> 
            <td>${order.orderTotal}</td>
            </tr>`;
            this.table+=newRow;
        });
        this.table+="</table>"
        this.mainElement.innerHTML=this.table;
    }
    displayOrders(list){

    }
}

let admin = new Admin('#admin-main');
admin.showLogin();