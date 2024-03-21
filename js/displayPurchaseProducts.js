// ------------------- Imports -------------------
import fetchProducts from './fetch.js';

// ------------------- Variables & Nodes -------------------

// ------------------- Functions ---------------------------

export default async function displayPurchasePage() {
	const products = await fetchProducts();
	const returnedData = purchaseTemplate(products);
	return returnedData;
}
const purchaseTemplate = function (products) {
	return `
						<div class="row w-100 align-items-center justify-content-end">
							<div class="col-6">
								<h2 class="h4 m-0 fw-bold">My eBay - Purchase</h2>
							</div>
							<div class="col-6 text-end">
								<form class="d-flex form-floating justify-content-end">
									<div class="form-floating me-3">
										<input
											type="email"
											class="form-control"
											id="floatingInput"
											placeholder="name@example.com"
										/>
										<label for="floatingInput" class="fs-7">Search your Watchlist</label>
									</div>
									<button class="btn btn-primary" type="submit">Search</button>
								</form>
							</div>
						</div>
						<div
							class="d-flex overflow-x-scroll gap-3 mt-3 py-3 px-4 border-top border-bottom justify-content-start overflow-x"
							data-category-btns
						>

              ${displayCategoryBtns(products)}
            </div>

						<div data-products-container>
              ${displayProducts(products)}
            </div>
					
`;
};

function displayCategoryBtns() {
	let purchaseCategories = [
		'all purchases',
		'processing',
		'unpaid items',
		'returned & Cancelled',
		'show hidden',
		'shipped',
		'Ready for feedback',
		'Payment Failed',
	];

	const categoriesBtns = purchaseCategories
		.map((category) => {
			return purchaseCategoryBtn(category);
		})
		.join('');
	return categoriesBtns;
	// categoryBtnsContainer.innerHTML = categoriesBtns;
}

const purchaseCategoryBtn = (category) => {
	return `
		<button class="btn btn-sm px-3 btn-outline-secondary rounded-5 fs-8 text-capitalize text-nowrap" type="button" data-category="${category}">
        ${category} 
		</button>
	`;
};

function displayProducts(products) {
	const productsList = products.map((product) => watchlistProductTemplate(product)).join('');
	// productContainer.innerHTML = productsList;

	return productsList;
}

const watchlistProductTemplate = ({
	title,
	condition = 'Pre-owned',
	thumbnail,
	price,
	discountPercentage,
	shippingPrice = 10.0,
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
	return `<div class="d-flex gap-3 align-items-center justify-content-center border-bottom py-3">
              <div class="col-2 align-self-center" style="height: 150px;"> 
                <img src="${thumbnail}" alt="Product Image" class="img-fluid rounded-start border border-2 border-secondary border-opacity-25 object-cover w-100 h-100">
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
						</div>
`;
};

// ------------------- Event Listeners ---------------------

// ------------------- Export ---------------------
