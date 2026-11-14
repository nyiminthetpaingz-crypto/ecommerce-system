
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const authButtons = document.getElementById("auth-buttons");

if (isLoggedIn) {
    const userData = JSON.parse(localStorage.getItem("userData"));

    authButtons.innerHTML = `
        <a href="./profile.html" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            <span class="font-semibold">${userData.name}</span>
        </a>

        <button id="logout-button" class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">
            Logout
        </button>
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
