/**
 * Représente un composant d'interface utilisateur "sticky card" 
 * qui affiche les likes et le prix.
 */
export class StickyCard {
	
	/**
     * Crée une instance de StickyCard.
     * 
     * @param {number} price - Le prix à afficher sur la carte. Valeur par défaut à 0.
     */
	constructor (price = 0) {
		this.likes = 0;
		this.price = price;
	}

	/**
     * Met à jour le nombre de likes sur la sticky card.
     */
	updateLikes(ope) {

		const stickyCardDOM = document.querySelector(".sticky-card__like--number");

		if (ope === "add") {
			this.likes++;
		} else if (ope === "sub") {
			this.likes--;
		} else {
			return;
		}

		stickyCardDOM.innerHTML = this.likes;

	}

	/**
     * Génère et affiche le HTML pour la sticky card dans le DOM.
     */
	getStickyCard() {

		const stickyDOM = document.querySelector(".sticky-card");

		let stickyCardHTML = `
		<div class="sticky-card__like">
        	<div class="sticky-card__like--number">${this.likes}</div>
			<svg class="sticky-card__like--svg" aria-hidden="true">
				<use xlink:href="assets/images/icons/icons.svg#heart"></use>
			</svg>
		</div>
		<div class="sticky-card__price">
			${this.price}€ / jour
		</div>`;

		stickyDOM.innerHTML = stickyCardHTML;

	}

}