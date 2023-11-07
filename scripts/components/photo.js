import { Media } from "./media.js";

export class Photo extends Media {
	constructor (data, photographerFirstName) {
		super (data);
		this.image = data.image;
		this.firstName = photographerFirstName;
	}

	getPhotoCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";

		const likeActive = this.likeActive ? " btn__like--on" : "";

		let photoCardHTML = `
        <a href="#" class="media-card__link">
        	<img src="/assets/images/thumbnails/${this.firstName}/${this.image}" alt="${this.title}" class="media-card__media">
        </a>
        <div class="media-card__legend">
        	<h3 class="media-card__legend--title">${this.title}</h3>
            <!-- bouton like -->
            <div class="media-card__legend--like">
				<div class="number__like">${this.likes}</div>
            	<button class="btn__like${likeActive}" title="J'aime"><span>J'AIME</span></button>
        	</div>
        </div>`;

		// article.innerHTML = photoCardHTML;

		// return article;

		return this.getMediaCard(photoCardHTML);

	}
}