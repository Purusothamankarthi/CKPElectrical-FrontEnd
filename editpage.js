document.addEventListener("DOMContentLoaded", () => {
    edit();
    start();
});

let customerId; // 🌟 global

function edit() {
    const params = new URLSearchParams(window.location.search);
    customerId = params.get("customerId");

    fetch(`http://localhost:8080/auth/customerdetails/${customerId}`)
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

        const data = {
            changePart: document.getElementById("changePart").value,
            price: document.getElementById("price").value,
            status: document.getElementById("status").value,
            late: document.getElementById("late").value
        };

        fetch(`http://localhost:8080/auth/customerdetails/${customerId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            alert("Service updated successfully");
        })
        .catch(err => console.log(err));
    });
}
