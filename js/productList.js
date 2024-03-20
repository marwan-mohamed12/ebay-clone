let products = [];

async function fetchProducts() {
	try {
		const response = await fetch('../utils/products.json');
		const data = await response.json();
		products = data.products;
		getFiltersData();
		renderProducts();
		document.querySelectorAll("#brandFilter").forEach(element => {
			element.addEventListener('click', (e) => {
				const brandValue = element.querySelector("input").value;
				products = products.filter(prod => prod.brand === brandValue);
				renderProducts();
			})
		});
		document.querySelectorAll("#colorFilter").forEach(element => {
			element.addEventListener('click', (e) => {
				const colorValue = element.querySelector("input").value;
				products = products.filter(prod => prod.color === colorValue);
				renderProducts();
			})
		});
		document.querySelectorAll("#priceFilter li").forEach(element => {
			element.addEventListener('click', (e) => {
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
			})
		});
		document.querySelectorAll("#conditionFilter li").forEach(element => {
			element.addEventListener('click', (e) => {
				const conditionValue = element.querySelector("input").value;
				products = products.filter(({ condition }) => condition === conditionValue);
				renderProducts();
			})
		});
		document.querySelectorAll("#sortFilter li").forEach(element => {
			element.addEventListener('click', (e) => {
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
			}
			)
		});
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

async function init() {
	await fetchProducts();
}

const createProductElement = (id, name, price, shipping, watching, isSponsored, imageUrl) => {
	const productElement = document.createElement('div');
	productElement.classList.add('col');
	productElement.id = id;

	productElement.innerHTML = `
    <article class="card h-100">
        <img src="${imageUrl}" class="card-img-top img-thumbnail" alt="${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <div class="card-text">
                <span class="d-block mb-1 fw-bold">$${price}</span>
                <span class="d-block mb-1 text-muted d-block">${shipping} shipping</span>
                <span class="d-block mb-1 text-danger">${watching} watching</span>
                <p class="mt-2 mb-0 text-muted">${isSponsored ? 'SPONSORED' : ''}</p>
            </div>
        </div>
    </article>
  `;

	return productElement;
}

const renderProducts = () => {
	const productsContainer = document.querySelector(".productsContainer");
	if (!productsContainer) {
		console.error('Products container not found');
		return;
	}

	productsContainer.innerHTML = '';

	products.forEach(({ id, name, price, shipping, watching, isSponsored, imageUrl }) => {
		const productElement = createProductElement(id, name, price, shipping, watching, isSponsored, imageUrl);
		productsContainer.appendChild(productElement);
	});
}

const getFiltersData = () => {
	let brandSet = new Set([]);
	let colorSet = new Set([]);
	let conditionSet = new Set([]);
	products.forEach(({ brand, color, condition }) => {
		brandSet.add(brand);
		colorSet.add(color);
		conditionSet.add(condition);
	})
	renderFilterData(brandSet, colorSet, conditionSet);
}

const createFilterElement = (item, isColor) => {

	const listItemFilter = document.createElement('li');
	if (isColor) {
		listItemFilter.innerHTML = `
      <a class="dropdown-item" href="#">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${item}" id="flexCheckDefault${item}">
            <label class="form-check-label" for="flexCheckDefault${item}">
              <span class="rounded-circle d-inline-block colorOptions" style="background-color: ${item};"></span>
            </label>
        </div>
      </a>
  `;
	} else {
		listItemFilter.innerHTML = `
      <a class="dropdown-item" href="#" for="flexCheckDefault${item}">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="${item}" value="${item}" id="flexCheckDefault${item}">
            <label class="form-check-label" for="flexCheckDefault${item}">
                ${item}
            </label>
        </div>
      </a>
  `;
	}
	return listItemFilter;
}

const renderFilterData = (brandSet, colorSet, conditionSet) => {
	const brandFilter = document.querySelector(".brand ul");
	brandSet.forEach((brand) => brandFilter.appendChild(createFilterElement(brand, false)));

	const conditionFilter = document.querySelector(".condition ul");
	conditionSet.forEach((condition) => conditionFilter.appendChild(createFilterElement(condition, false)));

	const colorFilter = document.querySelector(".color ul");
	colorSet.forEach((color) => colorFilter.appendChild(createFilterElement(color, true)));
}

const filterProducts = () => {

}

init();


