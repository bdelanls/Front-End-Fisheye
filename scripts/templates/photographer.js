
/**
 * Fournit les templates pour les cartes et l'en-tête des photographes.
 */
export function photographerTemplate(data) {
	
	const { name, id, city, country, tagline, price, portrait } = data;

	const picture = `/assets/images/photographers/${portrait}`;

	/**
	* Création de la carte du photographe pour la page d'accueil
	*/
	function getUserCardDOM() {
		const article = document.createElement( "article" );
		article.classList = "photographer";

		let articleHTML = `
			<a href="photographer.html?id=${id}" class="photographer__identity" aria-label="Page du photographe ${name}">
				<img src="${picture}" alt="Photo de ${name}" class="photographer__identity--picture">
				<h2 class="photographer__identity--name">${name}</h2>
			</a>
			<p class="photographer__location">${city}, ${country}</p>
			<p class="photographer__tagline">${tagline}</p>
			<p class="photographer__price">${price}€/jour</p>`;
		
		article.innerHTML = articleHTML;
		return (article);
		
	}

	/**
     * Crée l'en-tête pour la page photographe.
     */
	function getPhotographerHeader() {

		let photographerHeaderHTML = `
		<div class="photographer-header__info">
          <h1 class="photographer-header__info--name">${name}</h1>
          <h2 class="photographer-header__info--location">${city}, ${country}</h2>
          <p class="photographer-header__info--tagline">${tagline}</p>
        </div>
        <button class="contact_button" aria-label="Contactez ${name}">Contactez-moi</button>
        <picture>
          <img src="${picture}" alt="Portrait de ${name}" class="photographer-header__picture">
        </picture>`;

		return (photographerHeaderHTML);

	}

	return { name, picture, getUserCardDOM, getPhotographerHeader };
	
}