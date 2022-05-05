var o=(r,t,i)=>new Promise((c,e)=>{var l=d=>{try{a(i.next(d))}catch(s){e(s)}},n=d=>{try{a(i.throw(d))}catch(s){e(s)}},a=d=>d.done?c(d.value):Promise.resolve(d.value).then(l,n);a((i=i.apply(r,t)).next())});import{setLocalStorage as u}from"./utils.js";export default class h{constructor(t,i){this.productId=t,this.products={},this.dataSource=i,this.i=localStorage.length}init(){return o(this,null,function*(){this.products=yield this.dataSource.findProductById(this.productId),document.querySelector("main").innerHTML=this.renderProductDetails(this.products),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){this.i+=1,u(localStorage.length,this.products)}renderProductDetails(t){return`<section class="product-detail">
        <h3>${t.Brand.Name}</h3>
        <h2 class="divider">${t.Name}</h2>
        <img
          class="divider"
          src=${t.Images.PrimaryLarge}
          alt=${t.Name}
        />

        <p class="product-card__price">${t.ListPrice}</p>
        <p class="product__color">${t.Colors[0].ColorName}</p>
        <p class="product__description">
        ${t.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
        </div>
      </section>`}}
