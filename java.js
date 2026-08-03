const SERVER_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "https://electrial-backend.onrender.com";

function showdetails()
{
     const token = localStorage.getItem("token");

    // 🔐 Step 1: Check token exists
    if (token === null) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }
    // alert("show details");
fetch(`${SERVER_URL}/auth/customerdetails`,{
     method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"}
})

.then(response => response.json())
.then((cus)=>{
    const customers=document.getElementById('customerdetails');
    customers.innerHTML = ""; // Clear existing rows
    cus.forEach(custo => {
        var row=`<tr>
        <td>${custo.customerId || '-'}</td>
        <td>${custo.customerName || '-'}</td>
        <td>${custo.CustomerPhone || custo.customerPhone || '-'}</td>
        <td>${custo.Machine || custo.machine || '-'}</td>
        <td>${custo.changePart || '-'}</td>
         <td>${custo.price || 0}</td>
         <td>${custo.now || '-'}</td>
         <td>${custo.late || '-'}</td>
         <td>${custo.status || '-'}</td>
         <td><a href="edit.html?customerId=${custo.customerId}">Edit</a></td>

        </tr>`;
        customers.innerHTML+=row;
    });
})


.catch(error => {
    console.error('Error fetching customer details:', error);
});
}



function searchCustomer() {
    const phoneInput = document.getElementById("searchInput");

    if (!phoneInput) {
        return;
    }

    const phone = phoneInput.value.trim();

    if (phone === "") {
        showdetails();
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    fetch(`${SERVER_URL}/auth/Customerdetails/${phone}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.status === 404) {
            const customers = document.getElementById("customerdetails");
            if (customers) {
                customers.innerHTML = `
                    <tr>
                        <td colspan="10" style="text-align:center; padding: 15px; color: #777;">
                            No customer record found for phone: <strong>${phone}</strong>
                        </td>
                    </tr>
                `;
            }
            return null;
        }
        if (!res.ok) {
            throw new Error("Failed to fetch customer");
        }
        return res.json();
    })
    .then(data => {
        if (!data) return;
        const customers = document.getElementById("customerdetails");
        if (!customers) return;

        customers.innerHTML = ""; // Clear existing rows

        const list = Array.isArray(data) ? data : [data];

        list.forEach(custo => {
            const row = `
                <tr>
                    <td>${custo.customerId || '-'}</td>
                    <td>${custo.customerName || '-'}</td>
                    <td>${custo.CustomerPhone || custo.customerPhone || '-'}</td>
                    <td>${custo.Machine || custo.machine || '-'}</td>
                    <td>${custo.changePart || '-'}</td>
                    <td>${custo.price || 0}</td>
                    <td>${custo.now || '-'}</td>
                    <td>${custo.late || '-'}</td>
                    <td>${custo.status || '-'}</td>
                    <td>
                        <a href="edit.html?customerId=${custo.customerId}">Edit</a>
                    </td>
                </tr>
            `;
            customers.innerHTML += row;
        });
    })
    .catch(err => {
        console.error("Search error:", err);
    });
}
let timer = null;

function autoSearchCustomer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        const phone = document.getElementById("searchInput").value.trim();

        if (phone === "") {
            showdetails();   // 👈 SHOW ALL
        } else {
            searchCustomer(phone); // 👈 SEARCH ONE
        }
    }, 1000);
}




