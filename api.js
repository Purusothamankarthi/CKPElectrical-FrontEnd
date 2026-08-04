const SERVER_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : "https://electrial-backend.onrender.com";


function apiFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    // If no token, stop here
    if (!token) {
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
