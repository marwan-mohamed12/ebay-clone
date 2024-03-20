document.addEventListener("DOMContentLoaded", function () {
  // Event listener when DOM content is loaded
  const form = document.getElementById("personal-form");

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Extract form data
    const firstName = form.querySelector('input[name="first_name"]').value;
    const lastName = form.querySelector('input[name="last_name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Validation
    if (!firstName.match(nameRegex)) {
      showError(
        "first-name-error",
        "Please enter a valid first name (only alphabets)."
      );
      return;
    } else {
      clearError("first-name-error");
    }
    if (!lastName.match(nameRegex)) {
      showError(
        "last-name-error",
        "Please enter a valid last name (only alphabets)."
      );
      return;
    } else {
      clearError("last-name-error");
    }
    if (!email.match(emailRegex)) {
      showError("email-error", "Please enter a valid email address.");
      return;
    } else {
      clearError("email-error");
    }
    if (!password.match(passwordRegex)) {
      showError(
        "password-error",
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    } else {
      clearError("password-error");
    }

    // Check if email is already registered
    if (isEmailRegistered(email)) {
      showError("email-error", "An account with this email already exists.");
      return;
    }

    // Save user data to local storage
    const user = { firstName, lastName, email, password };
    saveUserToLocalStorage(user);
    alert("Registration successful!");
    form.reset();
  });

  // Event listeners for input fields to clear errors on input
  const inputFields = form.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"]'
  );
  inputFields.forEach((input) => {
    input.addEventListener("input", function () {
      clearError(input.id + "-error");
    });
  });

  // Function to display error messages
  function showError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
  }

  // Function to clear error messages
  function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = "";
  }

  // Function to check if email is already registered
  function isEmailRegistered(email) {
    let users = localStorage.getItem("users");
    if (users) {
      users = JSON.parse(users);
      return users.some((user) => user.email === email);
    }
    return false;
  }

  // Function to save user data to local storage
  function saveUserToLocalStorage(user) {
    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
});
