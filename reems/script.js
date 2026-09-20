/*===============================================
    REEM'S CLOTHING STORE
    app.js
===============================================*/

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    initializeNavbar();

    initializeMobileMenu();

    initializeHeroSlider();

    initializeScrollAnimation();

    initializeBackToTop();

    initializeNewsletter();

    initializeLoadingScreen();

});


/*===============================================
        NAVBAR SCROLL
===============================================*/

function initializeNavbar(){

    const header = document.querySelector("header");

    if(!header) return;

    window.addEventListener("scroll", ()=>{

        if(window.scrollY > 70){

            header.classList.add("active");

        }

        else{

            header.classList.remove("active");

        }

    });

}


/*===============================================
        MOBILE MENU
===============================================*/

function initializeMobileMenu(){

    const menuBtn = document.querySelector(".menu-btn");

    const nav = document.querySelector(".nav-links");

    if(!menuBtn || !nav) return;

    menuBtn.addEventListener("click", ()=>{

        nav.classList.toggle("showMenu");

        menuBtn.classList.toggle("active");

    });

}


/*===============================================
        HERO IMAGE SLIDER
===============================================*/

function initializeHeroSlider(){

    const hero = document.querySelector(".hero-image img");

    if(!hero) return;

    const images=[

        "images/hero/hero1.jpg",

        "images/hero/hero2.jpg",

        "images/hero/hero3.jpg",

        "images/hero/hero4.jpg"

    ];

    let current=0;

    setInterval(()=>{

        hero.style.opacity=0;

        setTimeout(()=>{

            current++;

            if(current>=images.length){

                current=0;

            }

            hero.src=images[current];

            hero.style.opacity=1;

        },400);

    },5000);

}


/*===============================================
        FADE UP ANIMATION
===============================================*/

function initializeScrollAnimation(){

    const sections=document.querySelectorAll("section");

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach((entry)=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    sections.forEach((section)=>{

        section.classList.add("hidden");

        observer.observe(section);

    });

}


/*===============================================
        BACK TO TOP
===============================================*/

function initializeBackToTop(){

    const button=document.querySelector(".back-to-top");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            button.classList.add("show");

        }

        else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*===============================================
        NEWSLETTER
===============================================*/

function initializeNewsletter(){

    const form=document.querySelector(".newsletter");

    if(!form) return;

    const input=form.querySelector("input");

    const button=form.querySelector("button");

    if(!input || !button) return;

    button.addEventListener("click",()=>{

        const email=input.value.trim();

        if(email===""){

            showToast("Please enter your email.");

            return;

        }

        const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!valid.test(email)){

            showToast("Invalid email address.");

            return;

        }

        showToast("Subscribed Successfully!");

        input.value="";

    });

}


/*===============================================
        LOADING SCREEN
===============================================*/

function initializeLoadingScreen(){

    const loader=document.querySelector(".loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        loader.classList.add("hide");

    });

}


/*===============================================
        TOAST NOTIFICATION
===============================================*/

function showToast(message){

    let toast=document.querySelector(".toast");

    if(!toast){

        toast=document.createElement("div");

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}
const products = [

    {
        id:1,
        name:"REEM'S Oversized Tee",
        category:"men",
        type:"tshirt",
        color:"White",
        price:18000,
        badge:"NEW",
        image:"images/products/tshirt1.png"
    },
    
    {
        id:2,
        name:"REEM'S Essential Hoodie",
        category:"men",
        type:"hoodie",
        color:"Navy",
        price:35000,
        badge:"BEST SELLER",
        image:"images/products/hoodie1.png"
    }
    
    ];

    const products = [

        {
            id:1,
            name:"REEM'S Essential Tee",
            category:"men",
            type:"tshirt",
            price:18000,
            badge:"NEW",
            color:"White",
            image:"images/products/tshirt1.png"
        },
        
        {
            id:2,
            name:"REEM'S Oversized Tee",
            category:"men",
            type:"tshirt",
            price:22000,
            badge:"BEST SELLER",
            color:"Black",
            image:"images/products/tshirt2.png"
        },
        
        {
            id:3,
            name:"REEM'S Premium Hoodie",
            category:"men",
            type:"hoodie",
            price:38000,
            badge:"LIMITED",
            color:"Navy",
            image:"images/products/hoodie1.png"
        },
        
        {
            id:4,
            name:"REEM'S Cargo Pants",
            category:"men",
            type:"pants",
            price:30000,
            badge:"",
            color:"Khaki",
            image:"images/products/pants1.png"
        },
        
        {
            id:5,
            name:"REEM'S Track Jacket",
            category:"men",
            type:"tracksuit",
            price:45000,
            badge:"NEW",
            color:"Navy",
            image:"images/products/tracksuit1.png"
        },
        
        {
            id:6,
            name:"REEM'S Running Sneakers",
            category:"men",
            type:"shoes",
            price:60000,
            badge:"",
            color:"White",
            image:"images/products/shoe1.png"
        },
        
        {
            id:7,
            name:"REEM'S Women's Hoodie",
            category:"women",
            type:"hoodie",
            price:36000,
            badge:"BEST SELLER",
            color:"Cream",
            image:"images/products/hoodie2.png"
        },
        
        {
            id:8,
            name:"REEM'S Women's Tee",
            category:"women",
            type:"tshirt",
            price:18000,
            badge:"",
            color:"Blue",
            image:"images/products/tshirt3.png"
        },
        
        {
            id:9,
            name:"REEM'S Oversized Sweatshirt",
            category:"women",
            type:"sweatshirt",
            price:34000,
            badge:"LIMITED",
            color:"Grey",
            image:"images/products/sweatshirt1.png"
        },
        
        {
            id:10,
            name:"REEM'S Baseball Cap",
            category:"accessories",
            type:"cap",
            price:12000,
            badge:"",
            color:"Navy",
            image:"images/products/cap1.png"
        },
        
        {
            id:11,
            name:"REEM'S Bucket Hat",
            category:"accessories",
            type:"hat",
            price:15000,
            badge:"NEW",
            color:"Black",
            image:"images/products/hat1.png"
        },
        
        {
            id:12,
            name:"REEM'S Premium Joggers",
            category:"men",
            type:"pants",
            price:28000,
            badge:"",
            color:"Grey",
            image:"images/products/jogger1.png"
        }
        
        ];

        const productContainer=document.querySelector(".products");

function displayProducts(items){

    if(!productContainer) return;

    productContainer.innerHTML="";

    items.forEach(product=>{

        productContainer.innerHTML+=`

        <div class="product">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

                ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}

                <button class="wishlist" data-id="${product.id}">
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>₦${product.price.toLocaleString()}</p>

                <button
                    class="add-cart"
                    data-id="${product.id}">

                    Add To Cart

                </button>

            </div>

        </div>

        `;

    });

}

const productContainer = document.querySelector(".products");

let filteredProducts = [...products];

function displayProducts(items){

    if(!productContainer) return;

    let html = "";

    items.forEach(product => {

        html += `
            <div class="product">

                <div class="product-image">

                    <img src="${product.image}" alt="${product.name}">

                    ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}

                    <button class="wishlist" data-id="${product.id}">
                        <i class="fa-regular fa-heart"></i>
                    </button>

                </div>

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>₦${product.price.toLocaleString()}</p>

                    <button class="add-cart" data-id="${product.id}">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

    });

    productContainer.innerHTML = html;

    initializeWishlistButtons();

}

displayProducts(filteredProducts);

const search = document.querySelector("#search");

if(search){

    search.addEventListener("input", () => {

        const value = search.value.toLowerCase();

        filteredProducts = products.filter(product =>

            product.name.toLowerCase().includes(value)

        );

        displayProducts(filteredProducts);
        initializeCartButtons();
        

    });

}
const filter = document.querySelector("#filter");

if(filter){

    filter.addEventListener("change", () => {

        if(filter.value === "all"){

            filteredProducts = [...products];

        }else{

            filteredProducts = products.filter(product =>

                product.category === filter.value

            );

        }

        displayProducts(filteredProducts);

    });

}

const sort = document.querySelector("#sort");

if(sort){

    sort.addEventListener("change", () => {

        switch(sort.value){

            case "low-high":

                filteredProducts.sort((a,b)=>a.price-b.price);

                break;

            case "high-low":

                filteredProducts.sort((a,b)=>b.price-a.price);

                break;

            case "name":

                filteredProducts.sort((a,b)=>a.name.localeCompare(b.name));

                break;

        }

        displayProducts(filteredProducts);

    });

}

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function initializeWishlistButtons(){

    document.querySelectorAll(".wishlist").forEach(button => {

        const id = Number(button.dataset.id);

        const icon = button.querySelector("i");

        if(wishlist.includes(id)){
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }

        button.addEventListener("click", () => {

            if(wishlist.includes(id)){

                wishlist = wishlist.filter(item => item !== id);

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                showToast("Removed from Wishlist");

            }else{

                wishlist.push(id);

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                showToast("Added to Wishlist");

            }

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

        });

    });

}

/*=====================================

        REEM'S CART

======================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector("#cart-count");

updateCartCount();

function updateCartCount(){

    if(cartCount){

        cartCount.textContent = cart.reduce(

            (total,item)=> total + item.quantity,

            0

        );

    }

}

function addToCart(id){

    const product = products.find(item=>item.id===id);

    if(!product) return;

    const existing = cart.find(item=>item.id===id);

    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    showToast("Added to Cart");

}

function initializeCartButtons(){

    document

    .querySelectorAll(".add-cart")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            const id = Number(

                button.dataset.id

            );

            addToCart(id);

        });

    });

}