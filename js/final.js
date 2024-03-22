const total = localStorage.getItem('total');
document.getElementById('totalAmount').innerHTML = total;

function clearLocalStorage() {
    localStorage.clear();
    // Redirect to homepage or any other page
    window.location.href = "../pages/Homepage.html";
}