const emailOrPhoneInput = document.getElementById("email_or_phone");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit-button");

const userData = JSON.parse(localStorage.getItem("userData"));

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

if (emailOrPhoneInput.value.trim() !== userData.emailOrPhone) {
    alert("Incorrect email or phone number. Please try again.");
    return;
}

if (passwordInput.value !== userData.password) {
    alert("Incorrect password. Please try again.");
    return;
}

localStorage.setItem("isLoggedIn", "true");

window.location.href = "./home.html";
});