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

		let photoCardHTML = `
          <a href="#" class="media-card__link">
            <img src="/assets/images/photos/${this.firstName}/${this.image}" alt="${this.title}" class="media-card__media">
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

		article.innerHTML = photoCardHTML;

		return article;

	}
}