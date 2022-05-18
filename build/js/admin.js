var s=(m,n,e)=>new Promise((a,t)=>{var l=r=>{try{i(e.next(r))}catch(o){t(o)}},d=r=>{try{i(e.throw(r))}catch(o){t(o)}},i=r=>r.done?a(r.value):Promise.resolve(r.value).then(l,d);i((e=e.apply(m,n)).next())});import p from"./externalServices.js";import{alertMessage as g}from"./utils.js";export default class c{constructor(){this.token=null,this.services=new p,this.mainElement=document.getElementById("adminMain")}login(n,e){return s(this,null,function*(){try{this.token=yield this.services.loginRequest(n),e()}catch(a){g(a.message.message)}})}showLogin(){const n=`
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
        `;document.getElementById("adminMain").innerHTML=n,document.getElementById("login").addEventListener("click",e=>{e.preventDefault();const a=document.getElementById("email").value,t=document.getElementById("password").value;this.login({email:a,password:t},this.getOrders.bind(this))})}getOrders(){return s(this,null,function*(){try{const n=yield this.services.orderRequest(this.token);this.mainElement.innerHTML=this.orderHtml();const e=document.getElementById("tableBody");e.innerHTML=this.orderTableMaker(n)}catch(n){}})}orderHtml(){return`
        <table id="orderTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>#Items</th>
                    <th>Total</th>
                </tr>
            </thead>
        </table> `}orderTableMaker(n){const e=n,a=document.getElementById("orderTable");for(let t=0;t<e.length;t++){let l=document.createElement("tr"),d=document.createElement("td"),i=document.createElement("td"),r=document.createElement("td"),o=document.createElement("td"),h=new Date(e[t].orderDate).toLocaleDateString("en-US");e[t].items===void 0?this.length=0:this.length=e[t].items.length;let u=e[t].orderTotal;d.innerHTML=e[t].id,i.innerHTML=h,r.innerHTML=this.length,o.innerHTML=`$${Number(u).toFixed(2)}`,l.appendChild(d),l.appendChild(i),l.appendChild(r),l.appendChild(o),a.appendChild(l)}}}let b=new c;b.showLogin();
