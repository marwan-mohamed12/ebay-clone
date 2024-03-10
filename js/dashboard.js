// ---------------- Variables ------------------

const bookmarkBtn = document.querySelector('[data-bookmark-btn]');
const bookmarkIcon = document.querySelector('[data-bookmark-icon]');

console.log(bookmarkBtn, bookmarkIcon);

// ---------------- Functions ------------------

function changeIconColor() {
	bookmarkIcon.classList.toggle('bi-bookmark');
	bookmarkIcon.classList.toggle('bi-bookmark-fill');
}

// ---------------- Event Listeners ------------------

bookmarkBtn.addEventListener('click', changeIconColor);
