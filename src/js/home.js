import { products } from "./products.js"; 

const categories = [...new Set(products.map(product => product.category))].map(
    category => ({ name: category, products: products.filter(product => product.category === category) })
);

console.log("Categories module loaded:", categories);

document.addEventListener("DOMContentLoaded", function () {

    const categoryContainer = document.getElementById("category-container");
    const productContainer = document.getElementById("product-container");

    if (categoryContainer) {
        categoryContainer.innerHTML = categories.map((category, index) => `
        <div class="relative bg-white px-8 py-10
                    rounded-xl overflow-hidden
                    border border-gray-100
                    shadow-md hover:shadow-xl
                    transition-all duration-300
                    hover:-translate-y-1">

            <span class="absolute -right-2 -bottom-8
                         text-8xl font-black text-gray-100
                         select-none">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <div class="relative z-10">
                <h3 class="text-2xl font-bold text-gray-800
                           tracking-tight">
                    ${category.name}
                </h3>

                <div class="w-10 h-1 bg-cyan-500 mt-5
                            rounded-full"></div>
            </div>

        </div>
        `).join("");
    }

    if (productContainer) {
        productContainer.innerHTML = products.map((product) => `
            <div class="bg-white rounded-xl overflow-hidden shadow-lg group">
                <div class="relative overflow-hidden">
                    <span class="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                        SALE
                    </span>
                    <img src="${product.image}" alt="${product.title || 'Product'}" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                </div>
                <div class="p-5">
                    <p class="text-sm text-gray-500">${product.category || ''}</p>
                    <h3 class="text-lg font-bold mt-1">${product.title || ''}</h3>
                    <p class="text-yellow-500 mt-2">★★★★★</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-xl font-bold text-cyan-600">$${product.price.toFixed(2)}</span>
                        <button class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-gray-900 transition">
                            Add +
                        </button>
                    </div>
                </div>
            </div>
        `).join("");
    }

});