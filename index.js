const SERVER_URL = "http://localhost:8080";
// const cors=requires("cors");
const token = localStorage.getItem("token");
function login() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Login failed");
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials.");
    });
}
function register(event) {
    
event.preventDefault();
    const fullname = document.getElementById("Fullname").value;
    const phonenumber = document.getElementById("phonenumber").value;

    const name = document.getElementById("name").value;
    const password1 = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
console.log("name:", name);
console.log("password1:", password1);
    fetch(`${SERVER_URL}/auth/register`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, phonenumber, name, password1, password2 })
        
    })
    .then(response => {
        if (response.ok) {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html";
        }
        else{
            return response.json().then(data => {throw new Error(data.message || "Registration failed")});  
        }
    })
    
    .catch(error => {
        alert("Registration failed: " + error.message);
    });
}

