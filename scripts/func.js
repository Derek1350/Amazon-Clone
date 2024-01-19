import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export function displayProducts(products){
    var allProducts=document.querySelector('.products-grid');
    var productContainer='';
    products.forEach((value,index) =>{
        productContainer += `
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
    });
    allProducts.innerHTML=productContainer;
    productContainer='';
}

export function checkItemInCart(cart,id,prodQuantity,date){
    let match=0;
    cart.forEach((value,index) =>{
        if(value.id===id){
            match=1;
            value.quantity += parseInt(prodQuantity.value);
        }
    });
    if(match===0){
        cart.push({id:id,quantity:parseInt(prodQuantity.value),date:date});
    }
}

export function displayCart(products,cart){
    const allOrders=document.querySelector('.order-summary');
    var cartHtml='';
    if(cart){
        products.forEach((value,index) => {
            cart.forEach((i,j) => {
                if(i.id===value.id){
                    cartHtml +=`
                <div class="cart-item-container">
                    <div class="delivery-date">
                        Delivery date: Tuesday, June 21
                    </div>
                
                    <div class="cart-item-details-grid">
                        <img class="product-image" src=${value.image}>
                
                        <div class="cart-item-details">
                            <div class="product-name">
                                ${value.name}
                            </div>
                            <div class="product-price">
                                ₹${(value.priceCents/100).toFixed(2)}
                            </div>
                            <div class="product-quantity">
                                <span>
                                    Quantity: <span class="quantity-label">${i.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary" data-product-id=${i.id}>
                                    Update
                                </span>
                                <span class="delete-quantity-link link-primary" data-product-id=${i.id} data-product-quantity=${i.quantity}>
                                    Delete
                                </span>
                            </div>
                        </div>
                
                        <div class="delivery-options">
                            <div class="delivery-options-title">
                                Choose a delivery option:
                            </div>
                            <div class="delivery-option">
                                <input value='0' type="radio" checked class="delivery-option-input delivery-option-input-${i.id}" name="delivery-option-${i.id}" data-delivery-Date=${i.date[0].dateOption1}>
                                <div>
                                    <div class="delivery-option-date">
                                        ${i.date[0].dateOption1}
                                    </div>
                                    <div class="delivery-option-price">
                                        FREE Shipping
                                    </div>
                                </div>
                            </div>
                            <div class="delivery-option">
                                <input value='70' type="radio" class="delivery-option-input delivery-option-input-${i.id}" name="delivery-option-${i.id}" data-delivery-Date=${i.date[0].dateOption2}>
                                <div>
                                    <div class="delivery-option-date">
                                        ${i.date[0].dateOption2}
                                    </div>
                                    <div class="delivery-option-price">
                                        ₹70 - Shipping
                                    </div>
                                </div>
                            </div>
                            <div class="delivery-option">
                                <input value='100' type="radio" class="delivery-option-input delivery-option-input-${i.id}" name="delivery-option-${i.id}" data-delivery-Date=${i.date[0].dateOption3}>
                                <div>
                                    <div class="delivery-option-date">
                                        ${i.date[0].dateOption3}
                                    </div>
                                    <div class="delivery-option-price">
                                        ₹100 - Shipping
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                }
            });
        });
    }
    if (cart===undefined || cart.length === 0){
        cartHtml +=`
        <div class="noProduct">
            <p>Your Cart is Empty...</p>
            <button class="viewProducts button-primary">View Prodoucts</button>
        </div>
        `;
    }
    
    allOrders.innerHTML=cartHtml;
};

// export function calcPriceSummary(products){
//     var iniPayment=0;
//     var afterTaxPayment,tax,beforeTax,priceSummary,shippingCost;
//     var receivedData=JSON.parse(retriveLocalStorage());
//     if(receivedData){
//         var cart = JSON.parse(receivedData[0].cart);
//         products.forEach((value,index) => {
//             cart.forEach((i,j) =>{
//                 if(value.id===i.id){
//                     iniPayment += ((value.priceCents*i.quantity));      
//                 }
//             });
//         });
//         iniPayment /=100;
//         products.forEach((value,index) => {
//             cart.forEach((i,j) =>{
//                 const shippingOption=document.querySelectorAll('.delivery-option-input-'+i.id);
//                 shippingOption.forEach((value) =>{
//                     value.addEventListener('click',()=>{
//                         shippingCost = parseFloat(value.value);
//                         beforeTax=parseFloat((iniPayment+shippingCost).toFixed(2));
//                         tax=parseFloat((beforeTax*0.1).toFixed(2));
//                         afterTaxPayment=parseFloat((beforeTax+tax).toFixed(2));
//                         priceSummary=[{
//                             iniPayment,
//                             shippingCost,
//                             beforeTax,
//                             tax,
//                             afterTaxPayment
//                         }];
//                         displayPriceSummary(priceSummary);
//                     });
//                 });
//             });
//         });
//     }
//     priceSummary=[{
//         iniPayment:0,
//         shippingCost:0,
//         beforeTax:0,
//         tax:0,
//         afterTaxPayment:0
//     }];
//     displayPriceSummary(priceSummary);   
// }

// export function calcPriceSummary(products) {
//     var iniPayment = 0;
//     var afterTaxPayment, tax, beforeTax, priceSummary, shippingCost;
//     var receivedData = JSON.parse(retriveLocalStorage());

//     if (receivedData) {
//         var cart = JSON.parse(receivedData[0].cart);

//         products.forEach((value) => {
//             cart.forEach((i) => {
//                 if (value.id === i.id) {
//                     iniPayment += value.priceCents * i.quantity;
//                 }
//             });
//         });
//         iniPayment /= 100;

//         const shippingOptions = document.querySelectorAll('.delivery-option-input');
//         shippingOptions.forEach((option) => {
//             option.addEventListener('click', () => {
//                 shippingCost = 0;
//                 cart.forEach((i) => {
//                     shippingCost += parseFloat(document.querySelector('.delivery-option-input-' + i.id + ':checked').value);
//                 });
//                 updatePriceSummary();
//             });
//         });

//         shippingCost = 0;
//         updatePriceSummary();
        
//     }

//     priceSummary = [{
//         iniPayment: 0,
//         shippingCost: 0,
//         beforeTax: 0,
//         tax: 0,
//         afterTaxPayment: 0
//     }];
//     displayPriceSummary(priceSummary);

//     function updatePriceSummary() {
//         beforeTax = parseFloat((iniPayment + shippingCost).toFixed(2));
//         tax = parseFloat((beforeTax * 0.1).toFixed(2));
//         afterTaxPayment = parseFloat((beforeTax + tax).toFixed(2));

//         priceSummary = [{
//             iniPayment,
//             shippingCost,
//             beforeTax,
//             tax,
//             afterTaxPayment
//         }];

//         displayPriceSummary(priceSummary);
//     }
// }
export function calcPriceSummary(products) {
    var iniPayment = 0;
    var afterTaxPayment, tax, beforeTax, priceSummary, shippingCost;
    var receivedData = JSON.parse(retriveLocalStorage());

    if (receivedData) {
        var cart = JSON.parse(receivedData[0].cart);

        products.forEach((value) => {
            cart.forEach((i) => {
                if (value.id === i.id) {
                    iniPayment += value.priceCents * i.quantity;
                }
            });
        });
        iniPayment /= 100;

        const shippingOptions = document.querySelectorAll('.delivery-option-input');
        shippingOptions.forEach((option) => {
            option.addEventListener('click', () => {
                shippingCost = calculateTotalShippingCost(cart);
                updatePriceSummary();
            });
        });

        shippingCost = calculateTotalShippingCost(cart);
        updatePriceSummary();
    }
    else{
        priceSummary = [{
            iniPayment: 0,
            shippingCost: 0,
            beforeTax: 0,
            tax: 0,
            afterTaxPayment: 0
        }];
        displayPriceSummary(priceSummary);
    }
    

    // function calculateTotalShippingCost(cart) {
    //     let totalShippingCost = 0;
    //     cart.forEach((i) => {
    //         const selectedOption = document.querySelector('input[name="delivery-option-' + i.id + '"]:checked');
    //         if (selectedOption) {
    //             totalShippingCost += parseFloat(selectedOption.value);
    //         }
    //     });
    //     return totalShippingCost;
    // }
    function calculateTotalShippingCost(cart) {
        return cart.reduce((total, item) => {
            const selectedOption = document.querySelector(`input[name="delivery-option-${item.id}"]:checked`);
            return total + (selectedOption ? parseFloat(selectedOption.value) : 0);
        }, 0);
    }

    function updatePriceSummary() {
        beforeTax = parseFloat((iniPayment + shippingCost).toFixed(2));
        tax = parseFloat((beforeTax * 0.1).toFixed(2));
        afterTaxPayment = parseFloat((beforeTax + tax).toFixed(2));

        priceSummary = [{
            iniPayment,
            shippingCost,
            beforeTax,
            tax,
            afterTaxPayment
        }];

        displayPriceSummary(priceSummary);
    }
}

export function clacDate(){
    function formatDate(date){
        return date.format('dddd,MMMM D');
    }
    const today= dayjs();
    const date=[{
        dateOption1:formatDate(today.add(7,'days')),
        dateOption2:formatDate(today.add(3,'days')),
        dateOption3:formatDate(today)
    }];
    return date;
}
export function deleteProduct(products, cart, delBtn) {
    var id = delBtn.dataset.productId;
    var quantity=parseInt(delBtn.dataset.productQuantity);

    const existingPassedData = JSON.parse(localStorage.getItem('passedData')) || [];

    const updatedPassedData = existingPassedData.map(data => {
        const updatedCart = JSON.parse(data.cart).filter(product => product.id !== id);
        var updateTotalQuantity=parseInt(JSON.parse(existingPassedData[0].prodQuantity))-quantity;
        
        return {
            ...data,
            cart: JSON.stringify(updatedCart),
            prodQuantity:JSON.stringify(updateTotalQuantity)
        };
    });
    console.log(updatedPassedData);
    saveLocalStorage(updatedPassedData);
    
    displayCart(products, JSON.parse(updatedPassedData[0].cart));
    calcPriceSummary(products);
    location.reload();
}
export function returnToHome(){
    window.location.href = 'amazon.html';
}


export function displayPriceSummary(priceSummary){
    const paymentSummary=document.querySelector('.payment-summary');
    var priceHtml=`
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money js-initialPayment">₹${priceSummary[0].iniPayment}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shippingCost">₹${priceSummary[0].shippingCost}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money js-beforeTax">₹${priceSummary[0].beforeTax}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money js-taxCost">₹${priceSummary[0].tax}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-afterTax">₹${priceSummary[0].afterTaxPayment}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `;
    paymentSummary.innerHTML =priceHtml;
    
}

export function saveLocalStorage(passedData){
    localStorage.setItem('passedData',JSON.stringify(passedData));
}

export function retriveLocalStorage(){
    var Data=localStorage.getItem('passedData');
    if(Data){
        return Data;
    }
    else{
        return null;
    }
    
}

export function removeLocalStorage(cart){
    console.log(cart);
    localStorage.removeItem(cart);
}