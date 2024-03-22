const url = '../data.json';

async function fetchPurchaseProducts() {
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (data.purchaseProducts.length === 0) {
			return false;
		}
		return data.purchaseProducts;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

async function fetchWatchlistProducts() {
	const watchlist = localStorage.getItem('watchlist');
	return watchlist ? JSON.parse(watchlist) : false;
}

export { fetchPurchaseProducts, fetchWatchlistProducts };
