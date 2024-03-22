//toggle between ship to form and the displayed data
document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Display form data
    const displayContainer = document.querySelector('.form-container');
    displayContainer.innerHTML = ''; // Clear the form container
    const displayData = document.createElement('div');
    displayData.classList.add('col-4');
    displayData.innerHTML = `<h3>Ship To</h3>`;
    for (const [key, value] of Object.entries(formDataObject)) {
        displayData.innerHTML += `<p class="shipping-info"><strong>${key}:</strong> ${value}</p>`;
    }

    // Add edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        displayContainer.innerHTML = ''; // Clear the display
        displayContainer.appendChild(event.target); // Append the original form
    });
    displayData.appendChild(editButton);

    displayContainer.appendChild(displayData);
});

// Add event listener to the cancel button of the form
document.getElementById("cancelButton").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Display the original form data
    const displayContainer = document.querySelector('.form-container');
    displayContainer.innerHTML = ''; // Clear the form container
    const displayData = document.createElement('div');
    displayData.classList.add('col-4');
    displayData.innerHTML = `<h3>Ship To</h3>`;
    const formData = new FormData(document.getElementById("checkoutForm"));
    for (const [key, value] of formData.entries()) {
        displayData.innerHTML += `<p class="shipping-info"><strong>${key}:</strong> ${value}</p>`;
    }

    // Add edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        displayContainer.innerHTML = ''; // Clear the display
        displayContainer.appendChild(document.getElementById("checkoutForm")); // Append the original form
    });
    displayData.appendChild(editButton);

    displayContainer.appendChild(displayData);
});

//Display from payment
document.querySelectorAll('input[name="paymentMethod"]').forEach(function(radioButton) {
    radioButton.addEventListener("change", function() {
        if (this.id === 'newCardOption') {
            document.querySelector('.payment-options').style.display = 'none';
            document.querySelector('.pay-with').style.display = 'none';
            document.querySelector('.card-form').style.display = 'block';
        } else {
            document.querySelector('.payment-options').style.display = 'block';
            document.querySelector('.pay-with').style.display = 'block';
            document.querySelector('.card-form').style.display = 'none';
        }
    });
});

document.getElementById("cancelButton").addEventListener("click", function() {
    document.querySelector('.card-form').style.display = 'none';
    document.querySelector('.pay-with').style.display = 'block';
    document.querySelector('.payment-options').style.display = 'block';
});



//Redirect to the final Page
document.addEventListener("DOMContentLoaded", function() {
    const checkoutButton = document.getElementById("confirm");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            window.location.href = "../pages/final.html";
        });
    } else {
        console.error("Button with ID 'confirm' not found.");
    }
});



//Redirect to fianl page
document.addEventListener("DOMContentLoaded", function() {
    const checkoutButton = document.getElementById("confirm");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            window.location.href = "../pages/final.html";
        });
    } else {
        console.error("Button with ID 'confirm' not found.");
    }
});

// Retrieve cart items from local storage
const items = JSON.parse(localStorage.getItem('cartItems'));
console.log(items);
// Select the cart container where you want to display the items
const cartContainer = document.getElementById('reviewCart');
console.log(cartContainer);

// Check if cart items exist and the cart container exists in the new page
if (items && cartContainer) {
    // Clear the cart container before adding new items
    cartContainer.innerHTML = '';

    // Iterate over each item in the cart
    items.forEach(item => {
        // Create a card element for each item
        const card = document.createElement('div');
        card.classList.add('productDetails');
        card.innerHTML = `
            <div class="row">
                <div class="col-3">
                    <img style="margin-bottom: 10px;"src="${item.image}" class="img-fluid" alt="${item.name}">
                </div>
                <div class="col-3">
                    <h6 class="card-title">${item.name}</h6>
                </div>    
                <div class="col-2">
                    <h5>Qty: ${item.quantity || 1}</h5> <!-- Display quantity as a span -->
                </div>    
                <div class="col-3">
                    <h5>Price: $${item.price}</h5>
                </div>
                <h6>Authorities may apply duties, fees, and taxes upon delivery</h6>
                <hr>
            </div>`;
        
        // Append the card to the cart container
        cartContainer.appendChild(card);
    });
}
//Retrive the calculated data
const totalItems = localStorage.getItem('totalItems');
document.getElementById('realQty').innerHTML =totalItems;

const subTotal = localStorage.getItem('subTotal');
document.getElementById('realP').innerHTML ='$' + subTotal;

const shipping = localStorage.getItem('shipping');
document.getElementById('shipCharge').innerHTML ='$' + shipping;

const total = localStorage.getItem('total');
document.getElementById('totalAmount').innerHTML =total;

document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.getElementById('confirm');

    // Function to enable/disable confirm button based on form inputs
    function updateConfirmButton() {
        const inputs = document.querySelectorAll('#checkoutForm input, #checkoutForm select');
        let isValid = false;

        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                if (input.checked) {
                    isValid = true;
                    // Add primary color to the selected option
                    input.closest('.payment-options').classList.add('selected-option');
                }
            } else if (input.value.trim() !== '') {
                isValid = true;
                // Add primary color to the input field
                input.classList.add('selected-option');
            }
        });

        if (isValid) {
            confirmButton.disabled = false;
        } else {
            confirmButton.disabled = true;
        }
    }

    // Listen for changes in form inputs
    const formInputs = document.querySelectorAll('#checkoutForm input, #checkoutForm select');
    formInputs.forEach(input => {
        input.addEventListener('change', updateConfirmButton);
    });

    // Cancel button functionality
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Reset form and disable confirm button
        document.getElementById('checkoutForm').reset();
        confirmButton.disabled = true;
    });
});


