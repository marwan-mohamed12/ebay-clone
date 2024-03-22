// Execute when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const loginEmailInput = document.getElementById("login-email");
  const loginButton = document.getElementById("login-button");
  const emailError = document.getElementById("email-error");

  // Check if isAuthenticated exists in local storage, if not, set it to false
  if (!localStorage.getItem("isAuthenticated")) {
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
  }

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

    // If user is found store email in session storage and redirect
    if (user) {
      //Save user name in local storage
      const firstName = user.firstName;
      localStorage.setItem("userName", JSON.stringify(firstName));

      //Store email in session storage and redirect
      sessionStorage.setItem("email", email);
      window.location.href = "../pages/password-entry.html";
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
