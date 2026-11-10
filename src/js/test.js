// setInterval(() => {
//     console.log("Hello");
//     console.log("Hello World");
// }, 1000);

// setTimeout(() => {
//     console.log("Hello");
//     console.log("Hello World");
// }, 3000);

// async_await_promise example

// const products = fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => { console.log(data);})

// setTimeout(() => {
//     console.log("Hello");
// }, 3000);

async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log(data);
    console.log('hello');
}

fetchProducts();