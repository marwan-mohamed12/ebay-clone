// ---------------- Imports ------------------
import fetchProducts from './fetch.js';

// ---------------- Variables ------------------

const bookmarkBtn = document.querySelector('[data-bookmark-btn]');
const bookmarkIcon = document.querySelector('[data-bookmark-icon]');
const naviBtns = document.querySelectorAll('[data-navi-btns] > li > a');
const sidebarBtns = document.querySelectorAll('[data-sidebar]  li > a');

console.log(bookmarkBtn, bookmarkIcon, naviBtns, sidebarBtns);

// ---------------- Functions ------------------

function changeIconColor() {
	bookmarkIcon.classList.toggle('bi-bookmark');
	bookmarkIcon.classList.toggle('bi-bookmark-fill');
}

function changeActiveLink(e, arr) {
	arr.forEach((btn) => btn.classList.remove('active'));
	e.target.classList.add('active');
}

async function displayProducts() {
	const products = await fetchProducts();
	console.log(products);
}

// function createElement() {}

// ---------------- Event Listeners ------------------

document.addEventListener('DOMContentLoaded', () => {
	bookmarkBtn.addEventListener('click', changeIconColor);
});

naviBtns.forEach((btn) => btn.addEventListener('click', (e) => changeActiveLink(e, naviBtns)));
sidebarBtns.forEach((btn) =>
	btn.addEventListener('click', (e) => changeActiveLink(e, sidebarBtns)),
);
