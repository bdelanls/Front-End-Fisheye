import { applyBlurFilterToBackground, removeBlurFilterFromBackground } from "/scripts/utils/utils.js";

const contactModal = document.getElementById("contact-modal");


/**
 * Affiche le formulaire de contact et gère son interaction.
 * 
 * @param {string} name - Le nom du photographe pour lequel afficher le formulaire de contact.
 */
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
				<form name="contact" class="contact__form">
					<div class="contact__form--data">
						<label for="firstname" class="contact__form--label">Prénom</label>
						<input id="firstname" class="contact__form--input" type="text" name="firstname" minlength="2" required aria-required="true" aria-describedby="firstnameDesc firstnameError" />
						<div id="firstnameError" class="contact__form--error"></div>
						<div id="firstnameDesc" class="contact__form--hidden">Entrez votre prénom. Minimum 2 caractères.</div>
					</div>
					<div class="contact__form--data">
						<label for="lastname" class="contact__form--label">Nom</label>
						<input id="lastname" class="contact__form--input" type="text" name="lastname" minlength="2" required aria-required="true" aria-describedby="lastnameDesc lastnameError" />
						<div id="lastnameError" class="contact__form--error"></div>
						<div id="lastnameDesc" class="contact__form--hidden">Entrez votre nom. Minimum 2 caractères.</div>
					</div>
					<div class="contact__form--data">
						<label for="email" class="contact__form--label">Email</label>
						<input id="email" class="contact__form--input" type="email" name="email" required aria-required="true" aria-describedby="emailDesc emailError" />
						<div id="emailError" class="contact__form--error"></div>
						<div id="emailDesc" class="contact__form--hidden">Entrez votre adresse email.</div>
					</div>
					<div class="contact__form--data">
						<label for="message" class="contact__form--label">Votre message</label>
						<textarea id="message" class="contact__form--input" name="message" rows="3" required aria-required="true" aria-describedby="messageDesc messageError"></textarea>
						<div id="messageError" class="contact__form--error"></div>
						<div id="messageDesc" class="contact__form--hidden">Entrez le message que vous souhaitez envoyer.</div>
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

/**
 * Ferme le formulaire de contact et rétablit l'état initial de la page.
 */
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



/**
 * Valide les champs du formulaire de contact et affiche les messages d'erreur si nécessaire.
 */
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

			const closeModalBtn = document.querySelector(".contact__msg--btn");
			closeModalBtn.addEventListener("click", () => closeModalContact(focusedElement) );

		} else {
			
			const firstInvalidField = document.querySelector("input[aria-invalid]");
			firstInvalidField.focus();
		}
		
		

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

		const inputError = input.nextElementSibling;
		inputError.textContent = message;
		inputError.style = "display: block";

		input.setAttribute("aria-invalid", "true");
		validForm = false;
	}

	function eraseError(input){

		const inputError = input.nextElementSibling;
		inputError.textContent = "";
		inputError.style = "";

		input.removeAttribute("aria-invalid");
		input.parentNode.removeAttribute("data-error-visible");
	}


}




