// Function to fetch product data from JSON file

import { Cart } from "../js/cart.js";

document.addEventListener("DOMContentLoaded", function () {
    const cartInstance = new Cart();

async function fetchData() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        //fatching json data
        const response = await fetch('../data.json');
        const data = await response.json();
        const products = data.products;
        console.log(products);

      // Function to fetch product by ID
      function fetchProductById(id) {
          const product = products.find(prod => prod.id == id);
          if (product) {
              updateProductDetails(product);
              addEventListeners(); // Adding event listeners after updating details
          } else {
              console.error('Product not found');
          }
      }

      // Fetch product with ID 8 initially
      fetchProductById(id);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Function to add click event listeners to side images
function addEventListeners() {
  const sideImages = document.querySelectorAll('.img-side');
  const mainImage = document.querySelector('.img-main');

  sideImages.forEach(img => {
      img.addEventListener("click", function (e) {
          mainImage.src = e.target.src;
      });
  });
}

// Function to update product details in HTML
function updateProductDetails(product) {
  const sideImagesContainer = document.querySelector('.side-images');
  const carouselInner = document.querySelector('.carousel-inner');
  const productDetailsContainer = document.getElementById('productDetails');

  // Generate HTML for side images
    let sideImagesHTML = ''; // Initialize an empty string to store HTML for side images

    for (let i = 0; i < 4; i++) { // Iterate from 0 to 3 to match array indices
        const imageSrc = product.imageUrl[i]; // Access image URL directly using index i
    
        // Construct HTML for each side image and concatenate to sideImagesHTML
        sideImagesHTML += `
            <div class="inner mb-3">
                <img class="img-side" src="${imageSrc}" alt="">
            </div>`;
    }

  // Set side images HTML
  sideImagesContainer.innerHTML = sideImagesHTML;

  // Generate HTML for carousel images
  const carouselImagesHTML = product.imageUrl.map((imgUrl, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${imgUrl}" class="d-block w-100 img-main" alt="...">
      </div>
  `).join('');

  // Set carousel images HTML
  carouselInner.innerHTML = carouselImagesHTML;

  // Set product details HTML
  productDetailsContainer.innerHTML = `
      <h4 class="fs-2 text-center">${product.name}</h4>
      <p class="fs-5">${product.details}</p>
      <div>
          <h6 class="text-danger fs-5 fw-bold"><i class="fa-solid fa-fire"></i> 30 watched in the last 24 hours</h6>
          <p class="text-success">Buy It Now+$37.56 shipping <br> from United States</p>
      </div>
      <div class="price-section">
          <h4 class="price fs-3 fw-bold mt-2">US $${product.price}/ea</h4>
          <p class="pt-2 fs-6">Condition: <span class="fw-bolder">${product.condition}</span></p>
          <div class="quantity-box">
              <label for="quantity">Quantity:</label>
              <input class="input-box" type="number" id="quantity" name="quantity" value="1" min="1">
              <label for="quantity"><p class="text-danger fw-bold">Last One / 35 sold <i class="fa-solid fa-hourglass-end"></i></p></label>
          </div>
      </div>
      <div class="actions">
          <a href="https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&ru=https%3A%2F%2Fcart.payments.ebay.com%2F">
              <button class="btn btn-primary active my-2 p-5 rounded-pill py-2" type="button"><span class="fw-bold">Buy It Now</span></button>
          </a>
          <a href="https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&ru=https%3A%2F%2Fcart.payments.ebay.com%2F">
              <button class="btn btn-primary my-2 py- rounded-pill py-2">Add to cart</button>
          </a>
          <button class="btn btn-outline-primary p-5 rounded-pill py-2"><i class="fa-regular fa-heart"></i> Add to watchlist</button>
      </div>
  `;

  var addToCartBtn = document.createElement('button');
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.className = 'add-to-cart';

                addToCartBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    window.location.href = "./CartPage.html";
                    cartInstance.addItem(product);
                });

        } 

        fetchData();

});
// Fetch data and initialize


