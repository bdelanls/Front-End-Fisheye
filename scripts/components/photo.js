import { Media } from "./media.js";

/**
 * Représente une photo associée à un photographe, étend la classe Media.
 */
export class Photo extends Media {
	
	/**
     * Crée une instance de Photo.
     * 
     * @param {Object} data - Les données de la photo.
     * @param {string} photographerFirstName - Le prénom du photographe associé à la photo.
     */
	constructor (data, photographerFirstName) {
		super (data, photographerFirstName);
		this.image = data.image;
	}

	/**
     * Crée une carte photo HTML en utilisant les propriétés de l'instance 
	 * et la méthode getMediaCard de la classe parente.
     */
	getPhotoCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";

		const likeActive = this.likeActive ? " btn__like--on" : "";

		let photoCardHTML = `
        <div class="media-card__link" tabindex="0" role="button">
        	<img src="/assets/images/thumbnails/${this.firstName}/${this.image}" alt="${this.title}" aria-label="${this.title}" class="media-card__media">
        </div>
        <div class="media-card__legend">
        	<h3 class="media-card__legend--title">${this.title}</h3>
            <!-- bouton like -->
            <div class="media-card__legend--like">
				<div class="number__like">${this.likes}</div>
            	<button class="btn__like${likeActive}" title="J'aime" aria-label="J'aime cette photo"><span>J'AIME</span></button>
        	</div>
        </div>`;

		return this.getMediaCard(photoCardHTML);

	}
}