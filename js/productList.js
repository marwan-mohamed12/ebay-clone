if (JSON.parse(localStorage.getItem("isAuthenticated"))) {
	const username = localStorage.getItem("userName");
	const signBtn = document.querySelector(".sign-btn");
	signBtn.innerHTML = "";
	signBtn.innerHTML = `
	
		Hi! ${username}
	
	`;
}

let products = [];
async function fetchProducts() {
	try {
		const params = new URLSearchParams(window.location.search);
		const category = params.get("category");
		const response = await fetch("../data.json");
		const data = await response.json();
		products =
			category === "seeall"
				? (products = data.products)
				: (products = data.products.filter(
					(prod) => prod.category == category
				));
		const unfilteredProducts = [...products];
		getFiltersData();
		renderProducts();
		document.querySelectorAll("#brandFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				console.log(element);
				const brandValue = element.querySelector("input").value;
				products = products.filter((prod) => prod.brand === brandValue);
				console.log(brandValue);
				renderProducts();
			});
		});

		document.querySelectorAll("#colorFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				const colorValue = element.querySelector("input").value;
				products = products.filter((prod) => prod.color === colorValue);
				renderProducts();
			});
		});

		document.querySelectorAll("#priceFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				const priceValue = element.querySelector("input").value;
				products = products.filter(({ price }) => {
					if (priceValue === "under") {
						return price < 110;
					} else if (priceValue === "inBetween") {
						return price >= 110 && price <= 180;
					} else if (priceValue === "above") {
						return price > 180;
					}
				});
				renderProducts();
			});
		});

		document.querySelectorAll("#conditionFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				const conditionValue = element.querySelector("input").value;
				products = products.filter(
					({ condition }) => condition === conditionValue
				);
				renderProducts();
			});
		});

		document.querySelectorAll("#sortFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				const sortValue = element.querySelector("input").value;
				if (sortValue === "Name (A-Z)") {
					products.sort((a, b) => {
						const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive comparison
						const nameB = b.name.toUpperCase();

						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0; // Names are equal
					});
				} else {
					products.sort((a, b) => {
						const nameA = a.name.toLowerCase();
						const nameB = b.name.toLowerCase();
						if (nameA > nameB) {
							return -1;
						}
						if (nameA < nameB) {
							return 1;
						}
						return 0;
					});
				}
				renderProducts();
			});
		});

		document.querySelectorAll("#shippingFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				const shippingValue = element.querySelector("input").value;
				products = products.filter(({ shipping }) => {
					if (shippingValue == 0) {
						return shipping === 0;
					} else if (shippingValue == 15) {
						return shipping === 15;
					} else {
						return shipping > 15;
					}
				});
				renderProducts();
			});
		});

		document.querySelectorAll("#sponsoredFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				const sponsoredValue = element.querySelector("input").value;
				products = products.filter(({ isSponsored }) => {
					if (sponsoredValue == "sponsored") {
						return isSponsored === true;
					} else {
						return !isSponsored;
					}
				});
				renderProducts();
			});
		});

		document.querySelectorAll("#viewFilter li").forEach((element) => {
			element.addEventListener("click", (e) => {
				const viewValue = element.querySelector("input").value ?? "grid";
				const productsContainer = document.querySelector(".productsContainer");
				const horizontalProductsContainer = document.querySelector(
					".horizontalContainer"
				);
				if (viewValue === "grid") {
					productsContainer.classList.remove("d-none");
					horizontalProductsContainer.classList.add("d-none");
					return;
				}
				productsContainer.classList.add("d-none");
				horizontalProductsContainer.classList.remove("d-none");
				renderProducts();
			});
		});

		const clearBtn = document.querySelector(".clearBtn button");
		clearBtn.addEventListener("click", () => {
			products = [...unfilteredProducts];
			document.querySelectorAll(".filter-section div").forEach((elem) => {
				elem.querySelectorAll("input").forEach((inp) => (inp.checked = false));
			});
			document.querySelector(".productsContainer").classList.remove("d-none");
			document.querySelector(".horizontalContainer").classList.add("d-none");
			renderProducts();
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

async function init() {
	await fetchProducts();
}

const createProductElement = (
	id,
	name,
	price,
	shipping,
	watching,
	isSponsored,
	imageUrl
) => {
	const productElement = document.createElement("div");
	productElement.classList.add("col");
	productElement.id = id;

	productElement.innerHTML = `
		<a href="../pages/ProductDetails.html?id=${id}" class="text-decoration-none text-reset">
			<article class="card h-100">
				<img src="${imageUrl[0]
		}" class="card-img-top img-thumbnail verticalImg" alt="${name}">
				<div class="card-body">
					<h5 class="card-title">${name}</h5>
					<div class="card-text">
						<span class="d-block mb-1 fw-bold">$${price}</span>
						<span class="d-block mb-1 text-muted d-block">${shipping ? "$" + shipping : "Free shipping"
		}</span>
						<span class="d-block mb-1 text-danger">${watching} watching</span>
						<p class="mt-2 mb-0 text-muted">${isSponsored ? "SPONSORED" : ""}</p>
					</div>
				</div>
			</article>
		</a>
  `;

	return productElement;
};

const createHorizontalProduct = (
	id,
	name,
	price,
	shipping,
	watching,
	isSponsored,
	imageUrl
) => {
	const productElement = document.createElement("div");
	productElement.classList.add("card");
	productElement.classList.add("my-4");
	productElement.id = id;
	productElement.innerHTML = `
		<div class="row g-0">
			<div class="col-4">
				<img src="${imageUrl[0]}"
					class="img-fluid rounded-start" alt="${name}" />
			</div>
			<div class="col-8">
				<div class="card-body">
					<h5 class="card-title fs-5 fs-lg-4">
						${name}
					</h5>
					<div class="card-text">
						<span class="fw-bold fs-6 fs-lg-5">$${price}</span>
						<span class="text-muted d-block small">${shipping ? "$" + shipping : "Free shipping"
		}</span>
						<span class="text-danger d-block small">${watching} watching</span>
						<p class="mt-2 mb-0 text-muted small">${isSponsored ? "SPONSORED" : ""}</p>
					</div>
				</div>
			</div>
		</div>
	`;
	return productElement;
};

const renderProducts = () => {
	const productsContainer = document.querySelector(".productsContainer");
	const horizontalProductsContainer = document.querySelector(
		".horizontalContainer"
	);
	if (!productsContainer) {
		productsContainer.appendChild(
			`<h2 class="text-center">No products Found!</h2>`
		);
		return;
	}

	if (!horizontalProductsContainer) {
		console.error("Products container not found");
		return;
	}

	productsContainer.innerHTML = "";
	horizontalProductsContainer.innerHTML = "";

	products.forEach(
		({ id, name, price, shipping, watching, isSponsored, imageUrl }) => {
			const productElement = createProductElement(
				id,
				name,
				price,
				shipping,
				watching,
				isSponsored,
				imageUrl
			);
			productsContainer.appendChild(productElement);
			const horizontalProductElement = createHorizontalProduct(
				id,
				name,
				price,
				shipping,
				watching,
				isSponsored,
				imageUrl
			);
			horizontalProductsContainer.appendChild(horizontalProductElement);
		}
	);
};

const getFiltersData = () => {
	let brandSet = new Set([]);
	let colorSet = new Set([]);
	let conditionSet = new Set([]);
	products.forEach(({ brand, color, condition }) => {
		brandSet.add(brand);
		colorSet.add(color);
		conditionSet.add(condition);
	});
	renderFilterData(brandSet, colorSet, conditionSet);
};

const createFilterElement = (item, isColor, isCondition) => {
	const listItemFilter = document.createElement("li");
	let trimmedItem = item.replace(/ /g, "");
	if (isColor) {
		listItemFilter.innerHTML = `
		<a class="dropdown-item" href="#">
			<div class="form-check">
				<input class="form-check-input" type="radio" value="${item}" id="${trimmedItem}" name="color">
				<label class="form-check-label" for="flexCheckDefault${trimmedItem}">
				<span class="rounded-circle d-inline-block colorOptions" style="background-color: ${trimmedItem};"></span>
				</label>
			</div>
		</a>
`;
	} else {
		listItemFilter.innerHTML = `
		<a class="dropdown-item" href="#" for="${item}">
			<div class="form-check">
				<input class="form-check-input" type="radio" name="${isCondition ? "condition" : "brand"
			}" value="${item}" id="${item}">
				<label class="form-check-label" for="${item}">
					${item}
				</label>
			</div>
		</a>
`;
	}
	return listItemFilter;
};

const renderFilterData = (brandSet, colorSet, conditionSet) => {
	const brandFilter = document.querySelector(".brand ul");
	brandSet.forEach((brand) =>
		brandFilter.appendChild(createFilterElement(brand, false, false))
	);

	const conditionFilter = document.querySelector(".condition ul");
	conditionSet.forEach((condition) =>
		conditionFilter.appendChild(createFilterElement(condition, false, true))
	);

	const colorFilter = document.querySelector(".color ul");
	colorSet.forEach((color) =>
		colorFilter.appendChild(createFilterElement(color, true, false))
	);
};

const filterProducts = () => { };

init();

const handleSearch = () => {
	const searchInput = document.getElementById("searchInput");
	const query = searchInput.value.trim().toLowerCase();

	if (query === "") {
		renderProducts();
		return;
	}

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(query)
	);

	renderFilteredProducts(filteredProducts);
};

const renderFilteredProducts = (filteredProducts) => {
	const productsContainer = document.querySelector(".productsContainer");
	if (!productsContainer) {
		console.error("Products container not found");
		return;
	}

	productsContainer.innerHTML = "";

	filteredProducts.forEach(
		({ id, name, price, shipping, watching, isSponsored, imageUrl }) => {
			const productElement = createProductElement(
				id,
				name,
				price,
				shipping,
				watching,
				isSponsored,
				imageUrl
			);
			productsContainer.appendChild(productElement);
		}
	);
};

const searchInput = document.getElementById("searchInput");
if (searchInput) {
	searchInput.addEventListener("input", handleSearch);
} else {
	console.error("Search input element not found");
}
