// ---------------- Imports ------------------
import { fetchPurchaseProducts, fetchWatchlistProducts } from './fetch.js';
import displayPage, { displayProducts } from './displayWatchlistProducts.js';
import displayPurchasePage from './displayPurchaseProducts.js';

// ---------------- Variables ------------------

const bookmarkBtn = document.querySelector('[data-bookmark-btn]');
const bookmarkIcon = document.querySelector('[data-bookmark-icon]');
const naviBtns = document.querySelectorAll('[data-navi-btns] > li > a');
const sidebarBtns = document.querySelectorAll('[data-sidebar]  li > button');
const mainBody = document.querySelector('[data-main-body]');
// const watchlistBtn = document.querySelector('[data-sidebarShow="watchlist"]');
// const purchaseBtn = document.querySelector('[data-sidebarShow="purchase"]');

// ---------------- Functions ------------------

function changeIconColor() {
	bookmarkIcon.classList.toggle('bi-bookmark');
	bookmarkIcon.classList.toggle('bi-bookmark-fill');
}

function changeActiveLink(e, arr) {
	arr.forEach((btn) => btn.classList.remove('active'));
	e.target.classList.add('active');
}

async function loadPage(isWatchlistActive = true) {
	let page;

	if (isWatchlistActive) {
		const products = await fetchWatchlistProducts();
		page = products ? await displayPage(products) : '';
	} else {
		const products = await fetchPurchaseProducts();
		page = products ? await displayPurchasePage(products) : '';
	}

	if (page === '') {
		mainBody.innerHTML = `<h1 class="text-center">No products in your ${isWatchlistActive ? 'Watchlist' : 'Purchase'}</h1>`;
	} else {
		mainBody.innerHTML = page;
		addCategoryBtnsFunctionality();
	}
}

const addCategoryBtnsFunctionality = async () => {
	const categoriesBtns = document.querySelectorAll('[data-category]');
	categoriesBtns.forEach((btn) => {
		btn.addEventListener('click', async (e) => {
			const category = e.target.dataset.category;
			const products = await fetchWatchlistProducts();
			const filteredProducts =
				category === 'all categories'
					? products
					: products.filter((product) => product.category === category);
			const productContainer = document.querySelector('[data-products-container]');
			productContainer.innerHTML = displayProducts(filteredProducts);
		});
	});
};

loadPage();
// ---------------- Event Listeners ------------------

bookmarkBtn.addEventListener('click', changeIconColor);

naviBtns.forEach((btn) => btn.addEventListener('click', (e) => changeActiveLink(e, naviBtns)));
sidebarBtns.forEach((btn) =>
	btn.addEventListener('click', (e) => {
		changeActiveLink(e, sidebarBtns);
		const isWatchlistActive = e.target.dataset.sidebarShow === 'watchlist' ? true : false;
		loadPage(isWatchlistActive);
	}),
);

// watchlistBtn.addEventListener('click', loadPage);
