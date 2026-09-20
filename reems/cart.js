//==========================
// REEM'S Shopping Cart
//==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartDrawer=document.querySelector(".cart-drawer");
const cartOverlay=document.querySelector(".cart-overlay");

const cartBtn=document.getElementById("cart-btn");
const closeCart=document.querySelector(".close-cart");

cartBtn.addEventListener("click",()=>{

cartDrawer.classList.add("active");
cartOverlay.classList.add("active");

});

function hideCart(){

cartDrawer.classList.remove("active");
cartOverlay.classList.remove("active");

}

if(closeCart){
    closeCart.addEventListener("click",hideCart);
    }
    
    if(cartOverlay){
    cartOverlay.addEventListener("click",hideCart);
    }

    const cartItems = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");


    function addToCart(id){

        console.log("Clicked ID:", id);
    
        const product = products.find(item => item.id === id);
    
    
        updateCart();
    }

    function updateCart(){

        cartItems.innerHTML="";
        
        let total=0;
        let totalItems=0;
        
        if(cart.length===0){
        
        cartItems.innerHTML='<p class="empty-cart">Your cart is empty.</p>';
        
        }else{
        
        cart.forEach(item=>{
        
        total+=item.price*item.quantity;
        totalItems+=item.quantity;
        
        cartItems.innerHTML+=`
        
        <div class="cart-item">
        
        <img src="${item.image}" alt="${item.name}">
        
        <div class="cart-info">
        
        <h4>${item.name}</h4>
        
        <p>₦${item.price.toLocaleString()}</p>
        
        <p>Qty: ${item.quantity}</p>
        
        </div>
        
        </div>
        
        `;
        
        });
        
        }
        
        cartTotal.textContent=`₦${total.toLocaleString()}`;
        cartCount.textContent=totalItems;
        
        localStorage.setItem("cart",JSON.stringify(cart));
        
        }

