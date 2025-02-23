function adminLogin() {
    const username = document.getElementById("adminUser").value;
    const password = document.getElementById("adminPass").value;

    // Hardcoded admin credentials
    if (username === "admin" && password === "admin") {
        localStorage.setItem("adminAuth", "true");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        document.getElementById("loginError").innerText = "Invalid Credentials!";
    }
}
// Add event listener for Enter key
document.getElementById("adminUser").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adminLogin();
    }
});

document.getElementById("adminPass").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adminLogin();
    }
});