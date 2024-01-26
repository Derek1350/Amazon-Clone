import {products} from "../data/products.js";
import { displayCart, displayProducts, retriveLocalStorage,removeLocalStorage,displayDate,calcPriceSummary,deleteProduct } from "./func.js";
import { createOrder,payOrder } from "./payment.js";





var receivedData=JSON.parse(retriveLocalStorage());
var cart;
if(receivedData){
    cart=JSON.parse(receivedData[0].cart);
    displayCart(products,cart);
    calcPriceSummary(products);
    displayDate();
    const deleteBtn = document.querySelectorAll('.delete-quantity-link');
    deleteBtn.forEach((value) =>{
        value.addEventListener('click',() =>{
            deleteProduct(products,cart,value);
        });
    })
    const placeOrder=document.querySelector('.place-order-button');
    placeOrder.addEventListener('click',(e)=>{
        async function handlePayment() {
            try {
                const order = await createOrder(products, cart);
                const options = payOrder(order);
                var rzp1 = new Razorpay(options);
                rzp1.open();
            } catch (error) {
                console.error('Error creating or paying for the order:', error);
            }
        }
        handlePayment();
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


