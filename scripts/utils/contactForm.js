import { applyBlurFilterToBackground, removeBlurFilterFromBackground } from "/scripts/utils/utils.js";


export function displayContactForm(name) {

	// Affichage de la lightbox
	const contactModal = document.getElementById("contact-modal");
	contactModal.style.display = "flex";

	// Flou à l'arrière plan
	applyBlurFilterToBackground();

	let contactFormHTML = `
	<div class="contact">
				<header class="contact__header">
          <h2 class="contact__header--title">
		  	Contactez-moi<br>${name}
		  </h2>
          <button class="contact__header--btn-close">
            <svg class="svg">
                <use xlink:href="/assets/images/icons/icons.svg#xmark"></use>
            </svg>
          </button>
        </header>
				<form name="contact" action="photographer.html" method="get" onsubmit="return validate()" class="contact__form">
					<label class="contact__form--label">Prénom</label>
					<input class="contact__form--input" type="text" id="firstname" name="firstname" minlength="2" />
					<label class="contact__form--label">Nom</label>
					<input class="contact__form--input" type="text" id="lastname" name="lastname" minlength="2" />
					<label class="contact__form--label">Email</label>
					<input class="contact__form--input" type="email" id="email" name="email" />
					<label class="contact__form--label">Votre message</label>
					<textarea class="contact__form--input" name="message" id="message" rows="3"></textarea>
					<input class="contact__form--submit" type="submit" value="Envoyer" />
				</form>
			</div>`;

	contactModal.innerHTML = contactFormHTML;

	/**
	 * Écouteur d'événement de clic sur le bouton de fermeture de la modale.
	 * Lorsque le bouton est cliqué, cela efface le contenu de la modale et supprime
	 * les styles pour la masquer.
	 */
	const closeBtn = document.querySelector(".contact__header--btn-close");
	closeBtn.addEventListener("click", () => {
		contactModal.innerHTML = "";
		contactModal.removeAttribute("style");
		
		// Supprime le flou à l'arrère plan
		removeBlurFilterFromBackground();
	});
}

