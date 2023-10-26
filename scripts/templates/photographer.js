export function photographerTemplate(data) {
	
	const { name, id, city, country, tagline, price, portrait } = data;

	const picture = `/assets/images/photographers/${portrait}`;

	function getUserCardDOM(num) {
		const article = document.createElement( "article" );
		article.classList = "photographer";

		let articleHTML = `
			<a href="#" class="photographer__identity" role="link" tabindex="${num}">
				<img src="${picture}" alt="" class="photographer__identity--picture">
				<h2 class="photographer__identity--name">${name}</h2>
			</a>
			<p class="photographer__location">${city}, ${country}</p>
			<p class="photographer__tagline">${tagline}</p>
			<p class="photographer__price">${price}€/jour</p>`;
		article.innerHTML = articleHTML;
		return (article);
		
	}
	return { name, picture, getUserCardDOM };
	
	
}