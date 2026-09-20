const quickOverlay = document.querySelector(".quick-view-overlay");
const quickModal = document.querySelector(".quick-view");

const quickTitle = document.getElementById("quick-title");
const quickImage = document.getElementById("quick-image");
const quickPrice = document.getElementById("quick-price");

document.addEventListener("click", e => {

    const btn = e.target.closest(".quick-view-btn");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    const product = products.find(item => item.id === id);

    if (!product) return;

    quickTitle.textContent = product.name;
    quickImage.src = product.image;
    quickPrice.textContent = `₦${product.price.toLocaleString()}`;

    quickOverlay.classList.add("show");
    quickModal.classList.add("show");

});

const closeBtn = document.querySelector(".close-quick-view");

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        quickOverlay.classList.remove("show");
        quickModal.classList.remove("show");
    });
}

if (quickOverlay) {
    quickOverlay.addEventListener("click", () => {
        quickOverlay.classList.remove("show");
        quickModal.classList.remove("show");
    });
}