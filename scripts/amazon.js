// DISPLAY PRODUCTS
import { products } from '../data/products.js';
import { displayProducts,checkItemInCart,saveLocalStorage,retriveLocalStorage,clacDate } from "./func.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
displayProducts(products);
var receivedData=JSON.parse(retriveLocalStorage());
var cart,totalQuantity;
if(!receivedData){
    cart=[];
    totalQuantity=0;
}
else{
    cart=JSON.parse(receivedData[0].cart);
    totalQuantity=JSON.parse(receivedData[0].prodQuantity);
}
// ADD TO CART
var addToCartBtn=document.querySelectorAll('.add-to-cart-button');
var cartQuantity=document.querySelector('.cart-quantity');
cartQuantity.innerHTML=totalQuantity;
addToCartBtn.forEach((button) => {
    button.addEventListener('click',() => {
        var id=button.dataset.productId;
        const date=clacDate();
        var prodQuantity=document.querySelector('.js-select-quantity'+id);
        totalQuantity += parseInt(prodQuantity.value);
        cartQuantity.innerHTML=totalQuantity;

        checkItemInCart(cart,id,prodQuantity,date);

        const passedData=[{
            cart:JSON.stringify(cart),
            prodQuantity:JSON.stringify(totalQuantity)
        }];
        saveLocalStorage(passedData);
        prodQuantity.value=1;
    });
});



