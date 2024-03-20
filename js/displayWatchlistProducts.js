// ------------------- Imports -------------------
import fetchProducts from './fetch.js';

// ------------------- Variables & Nodes -------------------
const categoryBtnsContainer = document.querySelector('[data-category-btns]');
const productContainer = document.querySelector('[data-products-container]');

// ------------------- Functions ---------------------------

async function displayPage() {
	const products = await fetchProducts();
	displayCategoryBtns(products);
	displayProducts(products);
}
displayPage();

function displayCategoryBtns(products) {
	let categoriesCount = new Map();
	categoriesCount.set('All Categories', products.length);
	products.forEach(({ category }) => {
		categoriesCount.set(category, (categoriesCount.get(category) || 0) + 1);
	});

	categoriesCount = Array.from(categoriesCount.entries());

	const categoriesBtns = categoriesCount
		.map(([category, count]) => {
			return watchlistCategoryBtn(category, count);
		})
		.join('');

	categoryBtnsContainer.innerHTML = categoriesBtns;
}

const watchlistCategoryBtn = (category, count) => {
	return `
		<button class="btn btn-sm px-3 btn-outline-secondary rounded-5 fs-8" type="button">
        ${category} <span>(${count})</span>
		</button>
	`;
};

async function displayProducts(products) {
	const productsList = products.map((product) => watchlistProductTemplate(product)).join('');
	productContainer.innerHTML = productsList;
}

const watchlistProductTemplate = ({
	title,
	condition = 'Pre-owned',
	thumbnail,
	price,
	discountPercentage,
	shippingPrice,
	time = new Date(2024, 3, 6, 10, 49),
	seller = 'thewatchoutlet- user ID (3272)',
	sellerFeedback = '100% positive feedback',
}) => {
	const oldPrice = Math.round(price * discountPercentage);
	const timeEnds = new Date(time).toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit',
	});
	const timeEndsHour = new Date(time).toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return `<div class="d-flex gap-3 align-items-start border-bottom py-3">
							<div class="me-2 align-self-center">
								<input class="form-check-input" type="checkbox" id="addToCustomList" data-watchlist-checkbox>
							</div>
							<div class="col-2">
                <img src="${thumbnail}" alt="Product Image" class="img-fluid rounded-start border border-2 border-secondary border-opacity-25">
                
							</div>
							<div class="">
								<div class="">
                  <h3 class="fs-5 text-secondary mb-1">${title}</h3>
                  <p class="fs-8 text-secondary-emphasis">Condition: <span>${condition}</span></p>
								</div>
								<div class="d-flex justify-content-between align-items-center mt-3">
									<div class="item-info">
										<ul class="d-flex list-unstyled gap-3">
											<li class="price-info">
												<div class="d-flex flex-column border-end pe-4">
													<span class="text-secondary-emphasis fs-8">ITEM PRICE:</span>
                          <span class="fw-bolder">US &dollar;${price}</span>
													<div class="info-price-other fs-9">
                            <span class="text-decoration-line-through">US &dollar;${oldPrice}</span>
                            |<span class="fw-bolder ms-1">${discountPercentage}% OFF</span>
                          </div>
                            <span class="text-secondary-emphasis fs-8">+US &dollar;${shippingPrice}</span>
												</div>
											</li>
											<li class="time-info">
												<div class="d-flex flex-column border-end pe-4">
													<span class="text-secondary-emphasis fs-8">TIME ENDS:</span>
                          <span class="fw-bolder">${timeEnds}</span>
                          <span class="fs-8 text-secondary-emphasis">${timeEndsHour}</span>
												</div>
											</li>

											<li class="seller-info">
												<div class="d-flex flex-column gap-1">
													<span class="text-secondary-emphasis fs-8">SELLER:</span>
                          <a href="#" role="button" class="fs-8 cursor-pointer text-decoration-underline">${seller}</a>
                          <span class="fs-9 text-secondary-emphasis">${sellerFeedback}</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="d-flex flex-column gap-3 justify-content-center align-items-center align-self-center ms-5">
								<button class="btn btn-sm px-3 btn-primary rounded-5 w-100" type="button">
									Buy it now
								</button>
								<button class="btn btn-sm px-3 btn-outline-primary rounded-5 w-100" type="button">
									View seller's other items
								</button>

								<div class="dropdown w-100">
									<button class="btn btn-sm btn-outline-primary dropdown-toggle rounded-5 w-100 px-3" type="button" id="dropdownStatus" data-bs-toggle="dropdown" aria-expanded="false">
										More Action
									</button>
									<ul class="dropdown-menu dropdown-menu-end absolute p-0 fs-7" style="">
										<li>
											<a class="dropdown-item" href="#">View similar items</a>
											<a class="dropdown-item" href="#">Contact seller</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
`;
};
// ------------------- Event Listeners ---------------------
