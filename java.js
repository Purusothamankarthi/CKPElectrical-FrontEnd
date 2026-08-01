const SERVER_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "https://ckpelectrical-backend.onrender.com";

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
        <td>${custo.customerId}</td>
        <td>${custo.customerName}</td>
        <td>${custo.CustomerPhone}</td>
        <td>${custo.Machine}</td>
        <td>${custo.changePart}</td>
         <td>${custo.price}</td>
         <td>${custo.now}</td>
         <td>${custo.late}</td>
         <td>${custo.status}</td>
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
        alert("Input field not found");
        return;
    }

    const phone = phoneInput.value.trim();

    if (phone === "") {
        alert("Please enter phone number");
        return;
    }

    fetch(`${SERVER_URL}/auth/Customerdetails/${phone}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Customer not found ");
            console.log(phone);
        }
        return res.json();
    })
    .then(custo => {
        const customers = document.getElementById("customerdetails");
        customers.innerHTML = "";

        customers.innerHTML = `
            <tr>
                <td>${custo.customerId}</td>
                <td>${custo.customerName}</td>
                <td>${custo.CustomerPhone}</td>
                <td>${custo.Machine}</td>
                <td>${custo.changePart}</td>
                <td>${custo.price}</td>
                <td>${custo.now}</td>
                <td>${custo.late}</td>
                <td>${custo.status}</td>
                <td>
                    <a href="edit.html?customerId=${custo.customerId}">Edit</a>
                </td>
            </tr>
        `;
    })
    .catch(err => alert(err.message));
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




