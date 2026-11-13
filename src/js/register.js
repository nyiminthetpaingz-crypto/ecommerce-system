console.log("Register JavaScript Connected!");

const nameInput = document.getElementById("name");
const emailOrPhoneInput = document.getElementById("email_or_phone");
const genderInput = document.getElementById("gender");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", () => {
    event.preventDefault();
const userData = {
    name: nameInput.value.trim(),
    emailOrPhone: emailOrPhoneInput.value.trim(),
    gender: genderInput.value,
    password: passwordInput.value,
    confirm_password: confirmPasswordInput.value
}

localStorage.setItem("userData", JSON.stringify(userData));

window.location.href = "./login.html";

});
