import { applyBlurFilterToBackground, removeBlurFilterFromBackground } from "/scripts/utils/utils.js";

const contactModal = document.getElementById("contact-modal");


export function displayContactForm(name) {

	// le media qui a le focus dans la galerie 
	const focusedElement = document.activeElement ;

	// Affichage de la lightbox
	contactModal.style.display = "flex";

	// Flou à l'arrière plan
	applyBlurFilterToBackground();

	// Attributs ARIA de la modal contact
	contactModal.setAttribute("aria-modal", "true");
	contactModal.setAttribute("aria-labelledby", "contactFormTitle");
	contactModal.setAttribute("aria-hidden", "false");

	// la modale contact est focusable
	contactModal.setAttribute("tabindex", "-1");
	contactModal.focus();


	let contactFormHTML = `
	<div class="contact">
		<header class="contact__header">
          <h2 id="contactFormTitle" class="contact__header--title">
		  	Contactez-moi<br>${name}
		  </h2>
          <button class="contact__header--btn" aria-label="Fermer le formulaire de contact" tabindex="0">
            <svg class="svg" aria-hidden="true">
                <use xlink:href="/assets/images/icons/icons.svg#xmark"></use>
            </svg>
          </button>
        </header>
			<section class="contact__section">
				<form name="contact" action="photographer.html" method="get" class="contact__form">
					<div class="contact__form--data">
						<label for="firstname" class="contact__form--label">Prénom</label>
						<input id="firstname" class="contact__form--input" type="text" id="firstname" name="firstname" minlength="2" aria-required="true" />
					</div>
					<div class="contact__form--data">
						<label for="lastname" class="contact__form--label">Nom</label>
						<input id="lastname" class="contact__form--input" type="text" id="lastname" name="lastname" minlength="2" aria-required="true" />
					</div>
					<div class="contact__form--data">
						<label for="email" class="contact__form--label">Email</label>
						<input id="email" class="contact__form--input" type="email" id="email" name="email" aria-required="true" />
					</div>
					<div class="contact__form--data">
						<label for="message" class="contact__form--label">Votre message</label>
						<textarea id="message" class="contact__form--input" name="message" id="message" rows="3" aria-required="true"></textarea>
					</div>
					<input class="contact__form--submit" type="submit" value="Envoyer" />
				</form>
			</section>
		</div>`;

	contactModal.innerHTML = contactFormHTML;

	

	/**
	 * Ajoute un écouteur d'événements sur l'objet document pour gérer les frappes au clavier.
	 * "Escape" => ferme la modale
	 */
	contactModal.addEventListener("keydown", function(event) {

		switch (event.key) {
		case "Escape":
			closeModalContact(focusedElement);
			break;
		}

	});

	

	/**
	 * Écouteur d'événement de clic sur le bouton de fermeture de la modale.
	 * Lorsque le bouton est cliqué, cela efface le contenu de la modale et supprime
	 * les styles pour la masquer.
	 */
	const closeBtn = document.querySelector(".contact__header--btn");
	closeBtn.addEventListener("click", () => closeModalContact() );

	validateForm(name, focusedElement);
}

function closeModalContact(focusedElement) {
	contactModal.innerHTML = "";
	contactModal.removeAttribute("style");

	contactModal.removeAttribute("tabindex");
	if (focusedElement) {
		focusedElement.focus();
	}
	
	// Supprime le flou à l'arrère plan
	removeBlurFilterFromBackground();

	// Attributs ARIA
	contactModal.removeAttribute("aria-modal");
	contactModal.removeAttribute("aria-labelledby");
	contactModal.setAttribute("aria-hidden", "true");
}



function validateForm(name, focusedElement) {

	const btnSubmit = document.querySelector(".contact__form--submit");

	let validForm;
	let formResult = {};


	btnSubmit.addEventListener("click", event => {
		event.preventDefault();

		validForm = true;

		// test prénom
		const firstName = document.getElementById("firstname");
		validateTextField(firstName);

		// test nom
		const lastName = document.getElementById("lastname");
		validateTextField(lastName);

		// test email
		const email = document.getElementById("email");
		validateEmail(email);
  
		// test message
		const message = document.getElementById("message");
		validateTextField(message);


		if (validForm) {
			console.log("formulaire validé", formResult);

			const contactMain = document.querySelector(".contact__section");

			contactMain.innerHTML = `
			<div class="contact__msg">
				<h3 class="contact__msg--title">Merci,<br>votre message a été envoyé à<br>${name}</h3>
				<button class="contact__msg--btn">Fermer</button>
			</div>`;

		}
		
		const closeModalBtn = document.querySelector(".contact__msg--btn");
		closeModalBtn.addEventListener("click", () => closeModalContact(focusedElement) );

	});



	function validateTextField(input){

		let inputValue = input.value.trim();
		try {
			if(inputValue === ""){
				throw new Error("Ce champ est obligatoire.");
			}else if(inputValue.length < 2){
				throw new Error("La réponse est trop courte.");
			}else{
				validEntry(input, inputValue);
			}
		} catch(error) {
			displayError(input, error.message);
		}
	}


	// Validation du champ Email
	function validateEmail(input){

		let inputValue = input.value.trim();
		const emailRegex = new RegExp("[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\\.[A-Za-z0-9._-]+");
	
		try {
			if(inputValue === ""){
				throw new Error("Ce champ est obligatoire.");
			}else if(!emailRegex.test(inputValue)){
				throw new Error("L'email n'est pas valide.");
			}else{
				validEntry(input, inputValue);
			}
		} catch(error) {
			displayError(input, error.message);
		}
	}

	
	// Fonction pour traiter une entrée valide
	function validEntry(input, inputValue){
		let inputName = input.name;
		eraseError(input);
		formResult[inputName] = inputValue;
	}

	

	function displayError(input, message){
		console.log("input", input);
		console.log("message", message);
		input.parentNode.setAttribute("data-error", message);
		//input.parentNode.setAttribute("data-error-visible", "true");
		validForm = false;
	}

	function eraseError(input){
		input.parentNode.removeAttribute("data-error");
		input.parentNode.removeAttribute("data-error-visible");
	}


}




