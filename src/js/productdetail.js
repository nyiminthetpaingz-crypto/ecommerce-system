const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get('id');


async function loadProducts() {
    
    try {
        const response = await fetch('https://fakestoreapi.com/products/' + productId);
        const data = await response.json();

        console.log(data);
    } catch (e) {
        console.error('Error fetching products:', e);
    }
}

loadProducts();