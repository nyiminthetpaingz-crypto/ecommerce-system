const categoryContainer = document.getElementById('category-container');
const productContainer = document.getElementById('product-container');

categoryContainer.innerHTML = `
  <div class="h-80 animate-pulse rounded-3xl bg-gray-100"></div>
  <div class="h-80 animate-pulse rounded-3xl bg-gray-100"></div>
  <div class="h-80 animate-pulse rounded-3xl bg-gray-100"></div>
  <div class="h-80 animate-pulse rounded-3xl bg-gray-100"></div>
`;
productContainer.innerHTML = '<div class="col-span-full text-center text-gray-400">Loading products...</div>';

async function loadProducts() {
    
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        renderHomePage(data);
    } catch (e) {
        console.error('Error fetching products:', e);
    }
}


function renderHomePage(products) {

  categoryContainer.innerHTML = '';
  productContainer.innerHTML = '';

    const categories = [...new Set(products.map((p) => p.category))].map((category) => ({
      name: category,
      count: products.filter((p) => p.category === category).length,
    }));

    const categoryImages = {
      "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
      "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
      "men's clothing": "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800",
      "women's clothing": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
    };

    categories.forEach((category) => {
      const image = categoryImages[category.name] ||
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800";

      categoryContainer.innerHTML += `
        <a href="#products"
          class="group relative h-80 overflow-hidden rounded-3xl bg-gray-900 shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
        >
          <img src="${image}" alt="${category.name}"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/10 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                ${category.count} ${category.count === 1 ? "product" : "products"}
              </p>
              <h3 class="text-xl font-bold capitalize">${category.name}</h3>
            </div>
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg text-gray-950 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white"
              aria-hidden="true">&rarr;</span>
          </div>
        </a>`;
    });

    products.slice(0, 8).forEach((p) => {
        productContainer.innerHTML += `
            <article data-product-id="${p.id}" class="group overflow-hidden rounded-3xl border border-white/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-950/40">
              <div class="relative h-64 overflow-hidden bg-gray-100 p-8">
                <span class="absolute left-4 top-4 z-10 rounded-full bg-gray-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Featured
                </span>
                <button type="button"
                  class="favorite-button absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-950 shadow-md transition hover:scale-105 hover:text-red-500"
                  aria-label="Add ${p.title} to favorites"
                  aria-pressed="false">
                  <svg class="heart-icon h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/>
                  </svg>
                </button>
                <img src="${p.image}" alt="${p.title}"
                  class="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="p-5">
                <p class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                  ${p.category}
                </p>
                <h3 class="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-950">
                  ${p.title}
                </h3>
                <div class="mt-5 flex items-center justify-between gap-3">
                  <p class="text-xl font-bold text-gray-950">
                    $${p.price.toFixed(2)}
                  </p>
                  <button type="button"
                    class="add-to-cart-button flex h-11 items-center gap-2 rounded-full bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-blue-600"
                    aria-label="Add ${p.title} to cart">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <circle cx="9" cy="20" r="1"/>
                      <circle cx="19" cy="20" r="1"/>
                      <path d="M3 4h2l2.68 12.39A2 2 0 0 0 9.62 18H19a2 2 0 0 0 1.94-1.52L22 9H7"/>
                    </svg>
                    <span>Cart</span>
                  </button>
                </div>
              </div>
            </article>`;
    });

    productContainer.querySelectorAll('.favorite-button').forEach((button) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const productId = button.closest('article').dataset.productId;
      if (favorites.some((id) => String(id) === String(productId))) {
        button.setAttribute('aria-pressed', 'true');
        button.classList.add('text-red-500', 'bg-red-50');
        button.querySelector('.heart-icon').setAttribute('fill', 'currentColor');
      }
      button.addEventListener('click', () => {
        const isFavorite = button.getAttribute('aria-pressed') === 'true';
        button.setAttribute('aria-pressed', String(!isFavorite));
        button.classList.toggle('text-red-500', !isFavorite);
        button.classList.toggle('bg-red-50', !isFavorite);
        button.querySelector('.heart-icon').setAttribute('fill', isFavorite ? 'none' : 'currentColor');

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const productId = button.closest('article').dataset.productId;
        const nextFavorites = isFavorite
          ? favorites.filter((id) => String(id) !== String(productId))
          : [...favorites, productId];
        localStorage.setItem('favorites', JSON.stringify(nextFavorites));
        updateNavbarCounts();
      });
    });

    productContainer.querySelectorAll('.add-to-cart-button').forEach((button) => {
      button.addEventListener('click', () => {
        const label = button.querySelector('span');
        label.textContent = 'Added';
        button.classList.remove('bg-gray-950', 'hover:bg-blue-600');
        button.classList.add('bg-green-600');

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productId = button.closest('article').dataset.productId;
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateNavbarCounts();

        window.setTimeout(() => {
          label.textContent = 'Cart';
          button.classList.remove('bg-green-600');
          button.classList.add('bg-gray-950', 'hover:bg-blue-600');
        }, 1600);
      });
    });
}
    
loadProducts();

function updateNavbarCounts() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const favoritesCount = document.getElementById('favorites-count');
    const cartCount = document.getElementById('cart-count');

    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
        favoritesCount.classList.toggle('hidden', favorites.length === 0);
    }
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.classList.toggle('hidden', cart.length === 0);
    }
}

document.getElementById('favorites-nav')?.addEventListener('click', () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('cart-nav')?.addEventListener('click', () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
});

updateNavbarCounts();

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const authButtons = document.getElementById("auth-buttons");

if (isLoggedIn) {
    const userData = JSON.parse(localStorage.getItem("userData") || '{}');
    const profileName = userData.name || 'A';
    const initial = profileName.trim().charAt(0).toUpperCase() || 'A';

    authButtons.innerHTML = `
        <div class="flex items-center gap-2 border-l border-gray-200 pl-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white ring-4 ring-blue-50" aria-label="Profile">
                ${initial}
            </span>
            <button id="logout-button" type="button" class="flex h-10 items-center gap-2 rounded-full border border-red-100 px-3 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50" aria-label="Logout">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/>
                </svg>
                Logout
            </button>
        </div>
    `;

    // Get Logout button
    const logoutButton = document.getElementById("logout-button");

    // Logout event
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "./login.html";
    });

} else {
    authButtons.innerHTML = `
        <a href="./login.html" class="text-gray-700 hover:text-blue-600">
            Login
        </a>

        <a href="./register.html" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Register
        </a>
    `;
}
