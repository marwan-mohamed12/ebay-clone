// ---------------- Imports ------------------
import displayPage, { displayProducts } from './displayWatchlistProducts.js';
import fetchProducts from './fetch.js';

// ---------------- Variables ------------------

const bookmarkBtn = document.querySelector('[data-bookmark-btn]');
const bookmarkIcon = document.querySelector('[data-bookmark-icon]');
const naviBtns = document.querySelectorAll('[data-navi-btns] > li > a');
const sidebarBtns = document.querySelectorAll('[data-sidebar]  li > a');
const mainBody = document.querySelector('[data-main-body]');
const watchlistBtn = document.querySelector('[data-watchlist]');

console.log(bookmarkBtn, bookmarkIcon, naviBtns, sidebarBtns, mainBody);

// ---------------- Functions ------------------

function changeIconColor() {
	bookmarkIcon.classList.toggle('bi-bookmark');
	bookmarkIcon.classList.toggle('bi-bookmark-fill');
}

function changeActiveLink(e, arr) {
	arr.forEach((btn) => btn.classList.remove('active'));
	e.target.classList.add('active');
}

async function loadPage() {
	const page = await displayPage();
	mainBody.innerHTML = page;
	addCategoryBtnsFunctionality();
}
const addCategoryBtnsFunctionality = () => {
	const categoriesBtns = document.querySelectorAll('[data-category]');
	console.log(categoriesBtns);
	categoriesBtns.forEach((btn) => {
		btn.addEventListener('click', async (e) => {
			const category = e.target.dataset.category;
			const products = await fetchProducts();
			const filteredProducts =
				category === 'all categories'
					? products
					: products.filter((product) => product.category === category);
			const productContainer = document.querySelector('[data-products-container]');
			productContainer.innerHTML = displayProducts(filteredProducts);
		});
	});
};

// loadPage();
// ---------------- Event Listeners ------------------

bookmarkBtn.addEventListener('click', changeIconColor);

naviBtns.forEach((btn) => btn.addEventListener('click', (e) => changeActiveLink(e, naviBtns)));
sidebarBtns.forEach((btn) =>
	btn.addEventListener('click', (e) => {
		changeActiveLink(e, sidebarBtns);
		mainBody.innerHTML = ``;
	}),
);

watchlistBtn.addEventListener('click', loadPage);