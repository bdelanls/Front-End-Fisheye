import { Media } from "/scripts/components/media.js";

/**
 * Représente une vidéo associée à un photographe, étend la classe Media.
 */
export class Video extends Media {
	
	/**
     * Crée une instance de Video.
     * 
     * @param {Object} data - Les données de la vidéo.
     * @param {string} photographerFirstName - Le prénom du photographe associé à la vidéo.
     */
	constructor (data, photographerFirstName) {
		super (data, photographerFirstName);
		this.video = data.video;
	}

	/**
     * Crée une carte vidéo HTML en utilisant les propriétés de l'instance 
	 * et la méthode getMediaCard de la classe parente.
     */
	getVideoCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";

		const likeActive = this.likeActive ? " btn__like--on" : "";

		let videoCardHTML = `
        <div class="media-card__link" tabindex="0" role="button">
            <video src="/assets/images/photos/${this.firstName}/${this.video}" title="${this.title}" aria-label="Ouvrir la vidéo ${this.title}" class="media-card__media"></video>
        </div>
        <div class="media-card__legend">
        	<h3 class="media-card__legend--title">${this.title}</h3>
            <!-- bouton like -->
            <div class="media-card__legend--like">
				<div class="number__like">${this.likes}</div>
            	<button class="btn__like${likeActive}" title="J'aime" aria-label="J'aime cette vidéo"><span>J'AIME</span></button>
        	</div>
        </div>`;

		return this.getMediaCard(videoCardHTML);

	}
}