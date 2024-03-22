export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (window.location.href.includes('CartPage.html')) {
            try {
                // Assuming 'this' refers to the appropriate object
                this.displayCart();
                this.calculateNumOfItems();
                this.calculateSubTotal();
                this.calculateShipping();
                this.calculateTotal();
                this.assignToCheckoutButton();
            } catch (error) {
                console.error('An error occurred while processing cart page:', error);
                // Handle error gracefully, e.g., display an error message to the user
            }
        }
    }

    addItem(product) {
        // Check if the product already exists in the cart
        const existingItem = this.items.find(item => item.id === product.id);
    
        if (existingItem) {
            // If the product already exists, increment its quantity
            existingItem.quantity++;
        } else {
            // If the product is not in the cart, add it with quantity 1
            this.items.push({ 
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1 
            });
        }
        //Save the updated cart to local storage
        this.saveToLocalStorage();
        // Update the display and calculate the number of items
        this.displayCart();
        this.calculateNumOfItems();
    }
    
    removeItem(productId) {
        // Remove the item with the given productId from the cart
        this.items = this.items.filter(item => item.id != productId);
    
        // Save the updated cart to local storage
        this.saveToLocalStorage();
    
        // Update the display and recalculate cart information
        this.displayCart();
        this.calculateNumOfItems();
        this.calculateSubTotal();
        this.calculateShipping();
        this.calculateTotal();
    }
    
    saveToLocalStorage() {
        // Convert the items array to a JSON string and save it to local storage under the key 'cartItems'
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    calculateNumOfItems() {
        let totalItems = 0;
        this.items.forEach(item => {
            totalItems += parseInt(item.quantity) || 0; // Parse quantity as integer
        });
        document.getElementById('realQty').innerHTML = totalItems;
        localStorage.setItem('totalItems', totalItems);
    }
    

    calculateSubTotal() {
        let subTotal = 0;
    
        this.items.forEach(item => {
            // Ensure item.price is a string before attempting to replace
            const price = typeof item.price === 'string' ? item.price : item.price.toString();
            subTotal += parseFloat(price.replace('$', '')) * (item.quantity || 1);
        });
    
        localStorage.setItem('subTotal', subTotal);
        const subTotalElement = document.getElementById('realP');
        subTotalElement.innerHTML = '$' + subTotal.toFixed(2);
    
        return subTotal;
    }
    
    
    calculateShipping() {
        const shipping = this.calculateSubTotal() * 0.15;
        localStorage.setItem('shipping', shipping);
        document.getElementById('shipCharge').innerHTML ='$' + shipping.toFixed(2);
        return shipping;
    }

    calculateTotal() {
        const total = this.calculateSubTotal() + this.calculateShipping();
        localStorage.setItem('total', total);
        document.getElementById('totalAmount').innerHTML = '$'+ total.toFixed(2);
        return total;
    }

    checkout() {
        var total = document.getElementById('totalAmount').innerHTML;
        localStorage.setItem('total', total);
        window.location.href = 'CheckoutPage.html';
    }
    
    assignToCheckoutButton() {
        const checkoutButton = document.getElementById('go-to-checkout-btn');
        checkoutButton.addEventListener('click', () => {
            this.checkout();
        });
    }

    increaseQuantity(itemId) {
        const quantityInput = document.getElementById('quantity-' + itemId);
        const currentQuantity = parseInt(quantityInput.value) || 0; // Parse the value as an integer, default to 0 if parsing fails
        quantityInput.value = currentQuantity + 1;
        this.updateCartItemQuantity(itemId, quantityInput.value);
    }
    
    decreaseQuantity(itemId) {
        const quantityInput = document.getElementById('quantity-' + itemId);
        const currentQuantity = parseInt(quantityInput.value) || 0; // Parse the value as an integer, default to 0 if parsing fails
        quantityInput.value = Math.max(currentQuantity - 1, 1); // Ensure quantity doesn't go below 1
        this.updateCartItemQuantity(itemId, quantityInput.value);
    }
    

    updateCartItemQuantity(itemId, quantity) {
        const existingItem = this.items.find(item => item.id == itemId);
        if (existingItem) {
            existingItem.quantity = quantity;
            this.saveToLocalStorage();
            this.calculateNumOfItems();
            this.calculateSubTotal();
            this.calculateShipping();
            this.calculateTotal();
        }
    }
    

    
    displayCart() {
        const cartContainer = document.getElementById('cartData');
        
        // Check if cartContainer exists before proceeding
        if (cartContainer) {
            // Clear the cart container before adding new items
            cartContainer.innerHTML = '';
            
            // Iterate over each item in the cart
            this.items.forEach(item => {
                // Create a card element for each item
                const card = document.createElement('div');
                card.classList.add('productDetails');
                card.innerHTML = `
                <div class="row">
                <div class="row">
                    <div class="col">
                        <div>
                            <a href="#">Find similar items</a>
                        </div>
                    </div>
                    <div class="col"></div>
                    <div class="col">
                        <p>Request combined shipping</p>
                    </div>
                </div>
                <br><br>
                <div class="row">
                    <div class="col">
                        <img src="${item.image}" class="img-fluid" alt="${item.name}" style="margin-bottom: 10px;">
                    </div>
                    <div class="col">
                        <h3 class="card-title">${item.name}</h3>
                    </div>
                    <div class="col">
    <h3>Qty</h3>
    <div class="input-group">
        <button class="btn btn-outline-primary decrease" data-item-id="${item.id}" type="button">-</button>
        <input type="text" class="form-control form-control-sm quantity" id="quantity-${item.id}" value="${item.quantity || 1}" style="width: 30px; font-size: 30px; text-align: center;">
        <button class="btn btn-outline-primary increase" data-item-id="${item.id}" type="button">+</button>
    </div>
</div>

                    <div class="col-3">
                        <h3>Price:</h3>
                        <h4>$${item.price}</h4>
                        <button class="btn btn-outline-primary remove" data-item-id="${item.id}" type"button" style="background: none; border: none; color: blue; text-decoration: underline; cursor: pointer;">remove</button>
                        <br>
                        <button type"button" style="background: none; border: none; color: blue; text-decoration: underline; cursor: pointer;">Save for later</button>
                        <button type"button" style="background: none; border: none; color: blue; text-decoration: underline; cursor: pointer;">Pay only this seller</button>
                    </div>
                </div>
                <hr>
            </div>`
            ;
                
                // Append the card to the cart container
                cartContainer.appendChild(card);
            });
    
            // Add event listeners to remove, increase, and decrease quantity buttons
            const removeButtons = document.querySelectorAll('.remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const itemId = event.target.dataset.itemId;
                    this.removeItem(itemId);
                });
            });
    
            const increaseButtons = document.querySelectorAll('.increase');
            increaseButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const itemId = event.target.dataset.itemId;
                    const quantityInput = document.getElementById('quantity-' + itemId);
                    const newQuantity = parseInt(quantityInput.value) + 1;
                    this.increaseQuantity(itemId, newQuantity);
                });
            });
            
            const decreaseButtons = document.querySelectorAll('.decrease');
            decreaseButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const itemId = event.target.dataset.itemId;
                    this.decreaseQuantity(itemId); // Corrected function call
                });
            });
            
            const quantityInputs = document.querySelectorAll('.quantity');
quantityInputs.forEach(input => {
    input.addEventListener('input', event => {
        const itemId = event.target.id.split('-')[1];
        const newQuantity = parseInt(event.target.value);
        this.updateCartItemQuantity(itemId, newQuantity); 
    });
});

            
        } else {
            console.error('Cart container element not found');
        }
    }
}    

// Create an instance of the Cart class
const cart = new Cart();

