import { Media } from "/scripts/components/media.js";

export class Video extends Media {
	constructor (data, photographerFirstName) {
		super (data);
		this.video = data.video;
		this.firstName = photographerFirstName;
	}

	getPhotoCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";

		let videoCardHTML = `
        <a href="#" class="media-card__link">
            <video src="/assets/images/photos/${this.firstName}/${this.video}" alt="${this.title}" class="media-card__media"></video>
        </a>
        <div class="media-card__legend">
        	<h3 class="media-card__legend--title">${this.title}</h3>
            <!-- bouton like -->
            <div class="media-card__legend--like">
				<div class="number__like">${this.likes}</div>
            	<button class="btn__like" title="J'aime"><span>J'AIME</span></button>
        	</div>
        </div>`;

		// article.innerHTML = videoCardHTML;

		// return article;

		return this.getMediaCard(videoCardHTML);

	}
}