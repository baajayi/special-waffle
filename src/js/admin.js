import ExternalServices from "./externalServices";
import { alertMessage } from "./utils";

export default class Admin{
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.externalServices = new ExternalServices();
      }
    async login(creds){
        console.log('success')
        try{
            this.token = await this.externalServices.loginRequest(creds);
            this.getOrders(this.token)
            // let answer = this.externalServices.getOrders(this.token);
            // console.log(answer);
        }
        catch(err){
            alertMessage(err.message.message);
        }
    }
    showLogin(){
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
        submitBtn.addEventListener('click',(ev)=>{ev.preventDefault();this.login(creds);adminMain.innerHTML=''})
    }
    getOrders(token){
        let order = this.externalServices.getOrders(token.accessToken)
        return order;
    }
}

let admin = new Admin;
admin.showLogin();