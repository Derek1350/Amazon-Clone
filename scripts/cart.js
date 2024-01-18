import {products} from "../data/products.js";
import { displayCart, displayProducts, retriveLocalStorage,removeLocalStorage,displayPriceSummary,calcPriceSummary,deleteProduct } from "./func.js";





var receivedData=JSON.parse(retriveLocalStorage());
var cart;
if(receivedData){
    cart=JSON.parse(receivedData[0].cart);
    displayCart(products,cart);
    calcPriceSummary(products);
    const deleteBtn = document.querySelectorAll('.delete-quantity-link');
    deleteBtn.forEach((value) =>{
        value.addEventListener('click',() =>{
            deleteProduct(products,cart,value);
        });
    })
    const placeOrder=document.querySelector('.place-order-button');
    placeOrder.addEventListener('click',()=>{
        cart=removeLocalStorage('passedData');
        cart=[];
        console.log(cart);
        displayCart(products,cart);
        calcPriceSummary(products);
    });
    
}
else{
    displayCart(products,cart);
    calcPriceSummary(products);
}

