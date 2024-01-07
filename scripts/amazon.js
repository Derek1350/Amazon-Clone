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
        <select>
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

        <button class="add-to-cart-button button-primary">
        Add to Cart
        </button>
  </div>
    `;
    displayProducts += productConatiner;
    // productImage.src=value.image;
    // productName.innerHTML=value.name;
    // productStars.src=value.rating.stars;
    // productRate.innerHTML=value.rating.count;
    // productPrice.innerHTML=value.Paisa;
});
allProducts.innerHTML=displayProducts;
displayProducts='';