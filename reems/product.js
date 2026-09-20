const latestProducts = document.getElementById("latest-products");

function displayLatestProducts() {

    latestProducts.innerHTML = "";

    products.forEach(product => {

        latestProducts.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                <span class="product-badge">
                    ${product.badge}
                </span>

                <img src="${product.image}" alt="${product.name}">

                <div class="product-icons">

                    <button class="wishlist-btn">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    
                    <button
                    class="quick-view-btn"
                    data-id="${product.id}">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                </div>

            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="rating">

                ★★★★★
                
                <span>4.9</span>
                
                </div>

                <h4>₦${product.price.toLocaleString()}</h4>

                <button
class="add-cart"
onclick="addToCart(${product.id})">

Add To Cart

</button>
            </div>

        </div>

        `;

    });

}

displayLatestProducts();