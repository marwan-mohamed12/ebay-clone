let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('../utils/products.json');
    const data = await response.json();
    products = data.products;
    getFiltersData();
    renderProducts();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function init() {
  await fetchProducts();
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
                <span class="fw-bold">${price}</span>
                <span class="text-muted d-block">${shipping} shipping</span>
                <span class="text-danger d-block">${watching} watching</span>
                <p class="mt-2 mb-0 text-muted">${isSponsored ? 'SPONSORED' : ''}</p>
            </div>
        </div>
    </article>
  `;

  return productElement;
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
  console.log(brandSet);
  console.log(colorSet);
  console.log(conditionSet);
}

const createFilterElement = (item, isColor) => {

  const listItemFilter = document.createElement('li');
  if (isColor) {
    listItemFilter.innerHTML = `
    <li>
      <a class="dropdown-item" href="#">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${item}" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              <span class="rounded-circle d-inline-block colorOptions" style="background-color: ${item};"></span>
            </label>
        </div>
      </a>
    </li>
  `;
  } else {
    listItemFilter.innerHTML = `
    <li>
      <a class="dropdown-item" href="#">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${item}" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                ${item}
            </label>
        </div>
      </a>
    </li>
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
