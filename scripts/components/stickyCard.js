export class StickyCard {
	constructor (price = 0) {
		this.likes = 0;
		this.price = price;
	}

	likesModify(ope) {

		const stickyCardDOM = document.querySelector(".sticky-card__like--number");

		if (ope === "add") {
			this.likes++;
		} else if (ope === "sub") {
			this.likes--;
		} else {
			return;
		}

		stickyCardDOM.innerHTML = this.likes;

	}

	getStickyCard() {

		const stickyDOM = document.querySelector(".sticky-card");

		let stickyCardHTML = `
		<div class="sticky-card__like">
        	<div class="sticky-card__like--number">${this.likes}</div>
			<svg class="sticky-card__like--svg">
				<use xlink:href="assets/images/icons/icons.svg#heart"></use>
			</svg>
		</div>
		<div class="sticky-card__price">
			${this.price}€ / jour
		</div>`;

		stickyDOM.innerHTML = stickyCardHTML;

	}

}