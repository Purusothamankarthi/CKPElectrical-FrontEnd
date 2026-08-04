const SERVER_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "https://electrial-backend.onrender.com";

let allCustomerRecords = [];
let currentFilter = 'all';

// Auto-hide loading screen when page loads
window.addEventListener("load", function () {
    hideLoading();
});

function showLoading() {
    const loader = document.getElementById("loadingOverlay");
    if (loader) loader.classList.remove("hidden");
}

function hideLoading() {
    const loader = document.getElementById("loadingOverlay");
    if (loader) loader.classList.add("hidden");
}

function showdetails() {
    const token = localStorage.getItem("token");

    if (token === null) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    showLoading();

    fetch(`${SERVER_URL}/auth/customerdetails`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch customer details");
        }
        return response.json();
    })
    .then((cus) => {
        allCustomerRecords = Array.isArray(cus) ? cus : [];
        filterRecords(currentFilter);
    })
    .catch(error => {
        console.error('Error fetching customer details:', error);
        const customers = document.getElementById('customerdetails');
        if (customers) {
            customers.innerHTML = `
                <tr>
                    <td colspan="10" style="text-align:center; padding: 20px; color: #e74c3c;">
                        Error loading service records. Please try again.
                    </td>
                </tr>
            `;
        }
    })
    .finally(() => {
        hideLoading();
    });
}

function filterRecords(filterType) {
    currentFilter = filterType;

    // Update active filter button styling
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${filterType}`);
    if (activeBtn) activeBtn.classList.add('active');

    const searchVal = document.getElementById("searchInput") ? document.getElementById("searchInput").value.trim() : "";

    let filtered = allCustomerRecords;

    // Apply status filter
    if (filterType === 'completed') {
        filtered = filtered.filter(item => (item.status || '').toLowerCase() === 'completed');
    } else if (filterType === 'pending') {
        filtered = filtered.filter(item => (item.status || '').toLowerCase() === 'pending');
    }

    // Apply search filter if phone search is active
    if (searchVal !== "") {
        filtered = filtered.filter(item => {
            const phone = String(item.CustomerPhone || item.customerPhone || '');
            return phone.includes(searchVal);
        });
    }

    renderRecords(filtered);
}

function renderRecords(list) {
    const customers = document.getElementById('customerdetails');
    if (!customers) return;

    customers.innerHTML = "";

    if (!list || list.length === 0) {
        const filterText = currentFilter !== 'all' ? currentFilter : '';
        customers.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center; padding: 20px; color: #777;">
                    No ${filterText} service records found.
                </td>
            </tr>
        `;
        return;
    }

    list.forEach((custo) => {
        const rawStatus = (custo.status || '-').trim();
        const statusClass = rawStatus.toLowerCase() === 'completed' ? 'completed' : (rawStatus.toLowerCase() === 'pending' ? 'pending' : '');
        
        const row = `<tr>
            <td>${custo.customerId || '-'}</td>
            <td>${custo.customerName || '-'}</td>
            <td>${custo.CustomerPhone || custo.customerPhone || '-'}</td>
            <td>${custo.Machine || custo.machine || '-'}</td>
            <td>${custo.changePart || '-'}</td>
            <td>₹${custo.price || 0}</td>
            <td>${custo.now || '-'}</td>
            <td>${custo.late || '-'}</td>
            <td><span class="status-badge ${statusClass}">${rawStatus}</span></td>
            <td><a href="edit.html?customerId=${custo.customerId}" class="edit-link">Edit</a></td>
        </tr>`;
        customers.innerHTML += row;
    });
}

function searchCustomer() {
    const phoneInput = document.getElementById("searchInput");
    if (!phoneInput) return;

    const phone = phoneInput.value.trim();
    if (phone === "") {
        filterRecords(currentFilter);
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    showLoading();

    fetch(`${SERVER_URL}/auth/Customerdetails/${phone}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.status === 404) {
            renderRecords([]);
            return null;
        }
        if (!res.ok) {
            throw new Error("Failed to fetch customer");
        }
        return res.json();
    })
    .then(data => {
        if (!data) return;
        allCustomerRecords = Array.isArray(data) ? data : [data];
        filterRecords(currentFilter);
    })
    .catch(err => {
        console.error("Search error:", err);
    })
    .finally(() => {
        hideLoading();
    });
}

let timer = null;
function autoSearchCustomer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        searchCustomer();
    }, 400);
}





