const SERVER_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "https://electrial-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    edit();
    start();
});

let customerId; // global

function edit() {
    const params = new URLSearchParams(window.location.search);
    customerId = params.get("customerId");

    if (!customerId) {
        return;
    }

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
            const phone = c.CustomerPhone || c.customerPhone || '';
            console.log("Customer Phone:", phone);

            if (document.getElementById("customerName")) document.getElementById("customerName").value = c.customerName || '';
            if (document.getElementById("CustomerPhone")) document.getElementById("CustomerPhone").value = phone;
            if (document.getElementById("Machine")) document.getElementById("Machine").value = c.Machine || c.machine || '';
            if (document.getElementById("now")) document.getElementById("now").value = c.now ? c.now.replace('T', ' ') : '';

            // Pre-fill editable fields if they already exist
            if (c.changePart && document.getElementById("changePart")) document.getElementById("changePart").value = c.changePart;
            if (c.price && document.getElementById("price")) document.getElementById("price").value = c.price;
            if (c.status && document.getElementById("status")) document.getElementById("status").value = c.status;
            if (c.late && document.getElementById("late")) document.getElementById("late").value = c.late;
        })
        .catch(err => console.log(err));
}

function start() {
    const editForm = document.getElementById("editForm");
    if (!editForm) return;

    editForm.addEventListener("submit", function (e) {
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
