
const products = [
    {
        id: 1,
        name: "Vietnam Heritage — Roots",
        category: "Văn hóa Việt",
        price: 289000,
        label: "BEST SELLER",
        color: "linear-gradient(135deg,#161616,#444)",
        design: "VIET<br>DNA"
    },
    {
        id: 2,
        name: "Football Culture — 1998",
        category: "Bóng đá",
        price: 259000,
        label: "NEW DROP",
        color: "linear-gradient(135deg,#ddd,#aaa)",
        design: "1998"
    },
    {
        id: 3,
        name: "Anime Universe — No.01",
        category: "Anime",
        price: 279000,
        label: "LIMITED",
        color: "linear-gradient(135deg,#702c37,#17151d)",
        design: "心"
    },
    {
        id: 4,
        name: "Together — Two Of Us",
        category: "Couple",
        price: 319000,
        label: "MADE FOR TWO",
        color: "linear-gradient(135deg,#d6aaa0,#eee0d9)",
        design: "US."
    }
];

let selectedCategory = "Tất cả";
let cart = 0;

const productContainer = document.getElementById("products");

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "₫";
}

function renderProducts() {
    let result = products.filter(product => {
        return selectedCategory === "Tất cả" ||
               product.category === selectedCategory;
    });

    const sort = document.getElementById("sortSelect").value;

    if (sort === "low") {
        result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        result.sort((a, b) => b.price - a.price);
    }

    document.getElementById("productCount").textContent =
        String(result.length).padStart(2, "0") + " PRODUCTS";

    productContainer.innerHTML = result.map(product => `
        <article class="product">

            <div class="product-image"
                 style="background:${product.color}">

                <span class="label">${product.label}</span>

                <div class="shirt"
                     style="background:${product.color}">
                    ${product.design}
                </div>

                <button class="add-cart"
                        data-id="${product.id}">
                    +
                </button>
            </div>

            <div class="product-info">
                <small>${product.category.toUpperCase()}</small>

                <h3>${product.name}</h3>

                <strong>${formatPrice(product.price)}</strong>
            </div>

        </article>
    `).join("");

    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", () => {
            cart++;

            document.getElementById("cartCount").textContent = cart;

            showToast("Đã thêm sản phẩm vào giỏ hàng!");
        });
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// FILTER

document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".filters button")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        selectedCategory = button.dataset.filter;

        renderProducts();
    });
});

// SORT

document.getElementById("sortSelect")
    .addEventListener("change", renderProducts);

// CATEGORY CLICK

document.querySelectorAll(".category").forEach(category => {
    category.addEventListener("click", () => {

        selectedCategory = category.dataset.category;

        document.querySelectorAll(".filters button")
            .forEach(button => {
                button.classList.toggle(
                    "active",
                    button.dataset.filter === selectedCategory
                );
            });

        renderProducts();
    });
});

// MOBILE MENU

document.getElementById("menuToggle")
    .addEventListener("click", () => {
        document.getElementById("navigation")
            .classList.toggle("open");
    });

document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navigation")
            .classList.remove("open");
    });
});

// CART DEMO

document.getElementById("cartButton")
    .addEventListener("click", () => {
        showToast(`Giỏ hàng hiện có ${cart} sản phẩm (bản demo).`);
    });

// INITIALIZE

renderProducts();
