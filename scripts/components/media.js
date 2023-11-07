import { stickyCard } from "/scripts/pages/photographer.js";

export class Media {
	constructor (data) {
		this.id = data.id;
		this.photographerId = data.photographerId;
		this.title = data.title;
		this.likes = data.likes;
		this.date = data.date;
		this.price = data.price;

		this.likeActive = false;

	}


	getMediaCard(htmlContent) {
		const article = document.createElement( "article" );
		article.classList = "media-card";
	
		article.innerHTML = htmlContent;
	
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
	
		return article;
	}

	
}