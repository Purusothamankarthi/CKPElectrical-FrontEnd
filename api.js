const SERVER_URL = "http://localhost:8080"; // change to server IP later

function apiFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    // If no token, stop here
    if (!token) {
        alert("Please login again");
        window.location.href = "index.html";
        return;
    }

    return fetch(SERVER_URL + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            ...options.headers
        }
    });
}
