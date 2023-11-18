import { Media } from "/scripts/components/media.js";

export class Video extends Media {
	constructor (data, photographerFirstName) {
		super (data, photographerFirstName);
		this.video = data.video;
	}

	getPhotoCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";

		const likeActive = this.likeActive ? " btn__like--on" : "";

		let videoCardHTML = `
        <div class="media-card__link" tabindex="0" role="button">
            <video src="/assets/images/photos/${this.firstName}/${this.video}" alt="${this.title}" aria-label="${this.title}" class="media-card__media"></video>
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