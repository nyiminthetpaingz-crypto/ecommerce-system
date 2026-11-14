
console.log("Register JavaScript Connected!");

const registerForm = document.getElementById("register-form");

console.log("Register Form:", registerForm);

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Submit event is working!");

    const nameInput = document.getElementById("name");
    const emailOrPhoneInput = document.getElementById("email_or_phone");
    const genderInput = document.getElementById("gender");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");

    if (passwordInput.value.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Passwords do not match.");
        return;
    }

    const userData = {
        name: nameInput.value.trim(),
        emailOrPhone: emailOrPhoneInput.value.trim(),
        gender: genderInput.value,
        password: passwordInput.value
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    console.log("Saved:", localStorage.getItem("userData"));

    alert("Registration successful!");

    window.location.href = "./login.html";
});
