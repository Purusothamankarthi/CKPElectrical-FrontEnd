const SERVER_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "https://ckpelectrical-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    edit();
    start();
});

let customerId; // 🌟 global

function edit() {
    const params = new URLSearchParams(window.location.search);
    customerId = params.get("customerId");

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    fetch(`${SERVER_URL}/auth/customerdetails/${customerId}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(c => {
            console.log(c.customerPhone);

            document.getElementById("customerName").value = c.customerName;
            document.getElementById("CustomerPhone").value = c.CustomerPhone;
            document.getElementById("Machine").value = c.Machine;
            document.getElementById("now").value = c.now;
        })
        .catch(err => console.log(err));
}

function start() {
    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first");
            window.location.href = "index.html";
            return;
        }

        const data = {
            changePart: document.getElementById("changePart").value,
            price: document.getElementById("price").value,
            status: document.getElementById("status").value,
            late: document.getElementById("late").value
        };

        fetch(`${SERVER_URL}/auth/customerdetails/${customerId}`, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            alert("Service updated successfully");
            window.location.href = "view.html";
        })
        .catch(err => console.log(err));
    });
}
