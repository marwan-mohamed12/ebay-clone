// Wait for the DOM content to be loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the user email element, password input field, signin button, and signin form
  const userEmailElement = document.getElementById("user-email");
  const passwordInput = document.getElementById("password");
  const signinButton = document.getElementById("signin-button");
  const signinForm = document.querySelector(".signin-form");

  let errorMessage = null; // Variable to store the error message element

  // Get the email from the session storage and display it
  const email = sessionStorage.getItem("email");
  userEmailElement.textContent = email;

  // Add click event listener to the signin button
  signinButton.addEventListener("click", function () {
    const password = passwordInput.value;

    // Get users from local storage
    const users = getUsersFromLocalStorage();
    const user = users.find((user) => user.email === email);

    if (user && user.password === password) {
      // Redirect to home page if user exists and password matches
      window.location.href = "/pages/Homepage.html";
    } else {
      // Display error message if user does not exist or password is incorrect
      displayErrorMessage("Oops, that's not a match.");
    }
  });

  // Function to retrieve users from local storage
  function getUsersFromLocalStorage() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }

  // Function to display error message
  function displayErrorMessage(message) {
    if (!errorMessage) {
      // Create error message element if it doesn't exist
      errorMessage = document.createElement("div");
      errorMessage.classList.add("error-message");
      errorMessage.style.color = "red";
      signinForm.insertBefore(errorMessage, passwordInput);
    }
    errorMessage.textContent = message; // Update error message text content
  }
});
