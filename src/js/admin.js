


export default class Admin{
    login(){

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
        submitBtn.setAttribute('type', 'submit');
        submitBtn.textContent = 'Login';
        emailLabel.setAttribute('for', 'email');
        emailInput.setAttribute('id','email');
        emailInput.setAttribute('name', 'email');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('autocomplete','email-adress')
        // emailInput.setAttribute('required');
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
        adminMain.appendChild(divElement);
    }
}

let admin = new Admin;
admin.showLogin();