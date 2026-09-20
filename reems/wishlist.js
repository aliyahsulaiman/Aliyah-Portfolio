let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistCount = document.getElementById("wishlist-count");

function updateWishlistCount() {
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

document.addEventListener("click", e => {
    const btn = e.target.closest(".wishlist-btn-product");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);

        btn.innerHTML = '<i class="fa-regular fa-heart"></i>';

    } else {

        wishlist.push(id);

        btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();
});

updateWishlistCount();