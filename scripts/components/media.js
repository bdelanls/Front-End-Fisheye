import { displayLightbox } from "/scripts/utils/lightbox.js";
import { stickyCard } from "/scripts/pages/photographer.js";

export class Media {
	constructor (data, photographerFirstName) {
		this.id = data.id;
		this.photographerId = data.photographerId;
		this.title = data.title;
		this.likes = data.likes;
		this.date = data.date;
		this.price = data.price;
		this.firstName = photographerFirstName;

		this.likeActive = false;

	}


	getMediaCard(htmlContent) {
		const article = document.createElement( "article" );
		article.classList = "media-card";
	
		article.innerHTML = htmlContent;
	
		// likes
		const likeButton = article.querySelector(".btn__like");
		const likeNumber = article.querySelector(".number__like");

		likeButton.addEventListener("click", () => {

			this.likeActive = !this.likeActive;
			
			if (this.likeActive) {
				this.likes++;
				likeButton.classList.add("btn__like--on");
				stickyCard.updateLikes("add");
			} else {
				this.likes--;
				likeButton.classList.remove("btn__like--on");
				stickyCard.updateLikes("sub");
			}

			likeNumber.innerHTML = this.likes;

		});

		// lightbox
		const lightboxButton = article.querySelector(".media-card__link");
		lightboxButton.addEventListener("click", () => {
			displayLightbox(this.id, this.firstName);
		});

		lightboxButton.addEventListener("keydown", (event) => {
			if(event.key === "Enter") {
				displayLightbox(this.id, this.firstName);
			}
		});
	
		return article;
	}

	
}