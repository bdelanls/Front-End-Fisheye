import { Media } from "/scripts/components/media.js";

export class Video extends Media {
	constructor (data, photographerFirstName) {
		super (data);
		this.video = data.video;
		this.firstName = photographerFirstName;
	}

	
	
	getCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";
		article.id = `id-${this.id}`;

		let videoCardHTML = `
          <a href="#" class="media-card__link">
            <video src="/assets/images/photos/${this.firstName}/${this.video}" alt="${this.title}" class="media-card__media"></video>
          </a>
          <div class="media-card__legend">
            <h3 class="media-card__legend--title">${this.title}</h3>
            <div class="media-card__legend--like">
              <a href="#">
			    ${this.likes}
                <svg class="media-card__legend--svg">
                <use xlink:href="assets/images/icons/icons.svg#heart"></use>
              </svg>
              </a>
            </div>
          </div>`;

		article.innerHTML = videoCardHTML;

		return article;

	}
}