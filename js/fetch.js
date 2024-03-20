const url = '../data.json';

async function fetchProducts() {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

export default fetchProducts;
