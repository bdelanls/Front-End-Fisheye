import { Media } from "./media.js";

export class Photo extends Media {
	constructor (data, photographerFirstName) {
		super (data);
		this.image = data.image;
		this.firstName = photographerFirstName;
		this.loaded = false;
		this.loader = null;
		this.src = `/assets/images/photos/${this.firstName}/${this.image}`;
		this.srcSub = "/assets/images/photos/photo.jpg";

	}

	loadImage() {
		return new Promise((resolve) => {
			this.loader = document.querySelector(`#id-${this.id} .media-card__loader`);
			
			const image = new Image();
			image.src = `/assets/images/photos/${this.firstName}/${this.image}`;
			image.onload = () => {
				this.loaded = true; // L'image est chargée avec succès
				setTimeout(() => {
					this.loader.classList.add("hidden");
				}, 800); // 
				resolve(image);
			};
			image.onerror = () => {
				// En cas d'erreur de chargement, afficher l'image de substitution
				const fallbackImage = new Image();
				fallbackImage.src = "/assets/images/photos/photo.jpg"; // Chemin de l'image de substitution
				fallbackImage.classList.add("media-card__media");

				const parentElement = this.loader.parentElement; // Récupérez l'élément parent du loader
				parentElement.innerHTML = "";
				parentElement.appendChild(fallbackImage); // Ajoutez l'image de substitution à l'élément parent
				
			};
		});
	}
	

	getCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";
		article.id = `id-${this.id}`;

		let photoCardHTML = `
          <a href="#" class="media-card__link">
			<div class="media-card__loader${this.loaded ? " hidden" : ""}"></div>
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