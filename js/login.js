// Execute when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const loginEmailInput = document.getElementById("login-email");
  const loginButton = document.getElementById("login-button");
  const emailError = document.getElementById("email-error");

  // Add event listener to login button
  loginButton.addEventListener("click", function (event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Retrieve email from input field
    const email = loginEmailInput.value;

    // Retrieve users from local storage
    const users = getUsersFromLocalStorage();

    // Find user with matching email
    const user = users.find((user) => user.email === email);

    // If user is found, store email in session storage and redirect
    if (user) {
      sessionStorage.setItem("email", email);
      window.location.href = "/pages/password-entry.html";
    } else {
      // If user is not found, display error message
      displayError(emailError, "We couldn't find this eBay account.");
    }
  });

  // Function to display error message
  function displayError(element, errorMessage) {
    element.textContent = errorMessage;
    element.style.color = "red";
  }

  // Function to retrieve users from local storage
  function getUsersFromLocalStorage() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }
});
