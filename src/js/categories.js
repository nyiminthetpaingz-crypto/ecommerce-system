const categories = [
    {
        id: 1,
        name: "Clothing",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
        link: "#clothing"
    },
    {
        id: 2,
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
        link: "#electronics"
    },
    {
        id: 3,
        name: "Home & Living",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600",
        link: "#home-living"
    },
    {
        id: 4,
        name: "Beauty & Care",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600",
        link: "#beauty"
    }
];

document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("category-container");

    if (!container) {
        console.error("Category container not found!");
        return;
    }

    container.innerHTML = categories.map(category => `
        <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">

            <div class="overflow-hidden">
                <img
                    src="${category.image}"
                    alt="${category.name}"
                    class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
            </div>

            <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                    ${category.name}
                </h3>

                <a href="${category.link}"
                   class="text-cyan-600 font-semibold hover:text-cyan-800">
                    Explore Now →
                </a>
            </div>

        </div>
    `).join("");

});