const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error");
    
let loggedin = false
// Add event listener to the login form's submit event
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;



    // Check if the email and password are valid
    if (email === "admin@me.com" && password === "123") {
        loginErrorMsg.textContent = "Logged in successfully!";
        window.location.href = "dashboard.html";
        loggedin = true

    } else {
        loginErrorMsg.textContent = "Your username or password is incorrect. Please try again.";
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("loggedin" , loggedin)
})

// Check if there's a saved email and password in localStorage
if (localStorage.getItem("email") && localStorage.getItem("password")) {
    document.getElementById("email").value = localStorage.getItem("email");
    document.getElementById("password").value = localStorage.getItem("password");
    window.location.href = "dashboard.html";
    loggedin = true;
}

localStorage.setItem("loggedin" , loggedin)










