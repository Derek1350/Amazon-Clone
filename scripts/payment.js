export async function createOrder(products,cart) {
    var totalAmount = 0;
    for (const product of products) {
        for (const cartItem of cart) {
            if (product.id === cartItem.id) {
                totalAmount += cartItem.quantity*product.priceCents;
            }
        }
    }
    const response = await fetch('http://localhost:3000/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: parseInt(totalAmount+(0.1*totalAmount)),
            currency: 'INR',
            receipt: 'receipt#1',
            notes: {
                key1: 'value3',
                key2: 'value2',
            },
        }),
    });

    if (response.ok) {
        const order = await response.json();
        console.log('Order created:', order);
        return order;
    } else {
        console.error('Failed to create order');
    }
}
export function payOrder(order){
    var options = {
        "key": "rzp_test_wB7oYfRvixSV8S", // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Derek Amazon", //your business name
        "description": "Test Transaction",
        "image": "data:image/jpeg;base64,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",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "orders.html",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Chittanshu Singh", //your customer's name
            "email": "itsderek1350@gmail.com",
            "contact": "9983544231" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        },
        // "redirect": true
    };
    return options; 
}
