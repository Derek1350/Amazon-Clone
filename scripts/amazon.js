// DISPLAY PRODUCTS
// import { cart } from './checkout.js';
var cart=[];
import { products } from '../data/products.js';
var productImage=document.querySelector('.product-image');
var productName=document.querySelector('.product-name');
var productStars=document.querySelector('product-rating-stars');
var productRate=document.querySelector('product-rating-count');
var productPrice=document.querySelector('.product-price');
var allProducts=document.querySelector('.products-grid');

var displayProducts='';
products.forEach((value,index) =>{
    const productConatiner=`
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${value.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">${value.name}</div>

        <div class="product-rating-container">
            <img class="product-rating-stars" src="${value.rating.stars}">
            <div class="product-rating-count link-primary">
                ${value.rating.count}
            </div>
        </div>

        <div class="product-price">₹${(value.priceCents/100).toFixed(2)}</div>

        <div class="product-quantity-container">
        <select class="js-select-quantity${value.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id=${value.id}>
        Add to Cart
        </button>
  </div>
    `;
    displayProducts += productConatiner;
});
allProducts.innerHTML=displayProducts;
displayProducts='';



// ADD TO CART
var addToCartBtn=document.querySelectorAll('.add-to-cart-button');
var totalQuantity=0;
var cartQuantity=document.querySelector('.cart-quantity');
var cartDisplayBtn=document.querySelector('.cart-link');
addToCartBtn.forEach((button) => {
    button.addEventListener('click',() => {
        var id=button.dataset.productId;
        var prodQuantity=document.querySelector('.js-select-quantity'+id);
        totalQuantity += parseInt(prodQuantity.value);
        if(Array.isArray(cart)){
            cart.push({id:id,quantity:parseInt(prodQuantity.value)});
        }
        else{
            cart.forEach((value,index) =>{
                if(value.id===id){
                    value.quantity + prodQuantity;
                }
                else{
                    cart.push({id:id,quantity:parseInt(prodQuantity.value)});
                }
            });
        }
        cartQuantity.innerHTML=totalQuantity;
        prodQuantity.value=1;
        console.log(cart);
        const url=`checkout.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
        cartDisplayBtn.href=url;
    });
});



