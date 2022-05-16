import ExternalServices from "./externalServices";

export default class Admin {
    constructor() {
        this.token = null;
        this.services = new ExternalServices();
    }

    async login(creds, next) {
        try{
            console.log(creds);
            this.token = await this.services.loginRequest(creds);
            next();
        }
        catch(err) {
            alertMessage(err.message.message);
        }
    }

    showLogin() {
        //select form element
        const form = document.getElementById('login');

        //create login form elements
        let emailLabel = document.createElement("label");
        let email = document.createElement("input");
        let passLabel = document.createElement("Label");
        let pass = document.createElement("input");
        let submit = document.createElement("button");
        
        //add attributes
        emailLabel.setAttribute("for", "email");
        email.setAttribute("type", "email");
        email.setAttribute("class", "formEmail");
        email.setAttribute("name", "email");
        passLabel.setAttribute("for", "password");
        pass.setAttribute("type", "password");
        pass.setAttribute("class", "formPass");
        pass.setAttribute("name", "password");
        submit.setAttribute("type", "submit");
        submit.setAttribute("id", "loginSubmit");
        submit.innerHTML = "Submit";

        //labels
        emailLabel.innerHTML = "Email";
        passLabel.innerHTML = "Password";
        //append form elements to form
        form.appendChild(emailLabel);
        form.appendChild(email);
        form.appendChild(passLabel);
        form.appendChild(pass);
        form.appendChild(submit);

        //listen for submit and submit
        submit.addEventListener('click', (push) => { 
            push.preventDefault();
            const emailAddress = email.value;
            const password = pass.value;
            this.login({emailAddress, password}, this.showOrders.bind(this));

        });
    }
    async showOrders() {
        try {
            const orders = await this.services.getOrders(this.token);
            //select order area
            const orderArea = document.getElementById('orders');
            //iterate through orders
            for(let i = 0; i< orders.length; i++){
                //create order element
                const order = document.createElement("li");
                //fill order element
                order.innerHTML(orders[i]);
                orderArea.appendChild(order);
                console.log(order);
                console.log("BREAK");
                console.dirxml(order);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

}