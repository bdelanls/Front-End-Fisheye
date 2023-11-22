import { mediaList } from "/scripts/pages/photographer.js";
import { applyBlurFilterToBackground, removeBlurFilterFromBackground } from "/scripts/utils/utils.js";

/**
 * Affiche la modale lightbox avec le média correspondant à l'ID fourni.
 *
 * @param {number} id - L'ID du média à afficher dans la lightbox.
 * @param {string} firstName - Le prénom du photographe associé au média.
 */
export function displayLightbox(id, firstName) {

	// inititalisation
	let mediaIndex = mediaList.mediaList.findIndex(media => media.id === id);
	let media = mediaList.mediaList[mediaIndex];

	// le media qui a le focus dans la galerie 
	let focusedElement = document.activeElement ;

	// Affichage de la lightbox
	const lightboxModal = document.getElementById("lightbox-modal");
	lightboxModal.style.display = "flex";

	// Flou à l'arrière plan
	applyBlurFilterToBackground();

	// Attribut ARIA de la modal lightbox
	lightboxModal.setAttribute("aria-modal", "true");
	lightboxModal.setAttribute("aria-labelledby", "lightboxTitle");
	lightboxModal.setAttribute("aria-hidden", "false");

	// la lightbox est focusable
	lightboxModal.setAttribute("tabindex", "-1");
	lightboxModal.focus();


	// Contenu HTML de la lightbox
	let lightboxHTML = `
	<div class="lightbox">
        <button class="lightbox__btn lightbox__btn--close" aria-label="Fermer la lightbox">
          <svg class="svg" aria-hidden="true">
              <use xlink:href="/assets/images/icons/icons.svg#xmark"></use>
          </svg>
        </button>
        <button class="lightbox__btn lightbox__btn--back" aria-label="Image précédente">
          <svg class="svg" aria-hidden="true">
              <use xlink:href="/assets/images/icons/icons.svg#chevron-left"></use>
          </svg>
        </button>
        <figure class="lightbox__figure">
        </figure>
        <button class="lightbox__btn lightbox__btn--next" aria-label="Image suivante">
          <svg class="svg" aria-hidden="true">
              <use xlink:href="/assets/images/icons/icons.svg#chevron-right"></use>
          </svg>
        </button>
      </div>
	`;

	lightboxModal.innerHTML = lightboxHTML;


	/**
	 * Ajoute un écouteur d'événements sur l'objet document pour gérer les frappes au clavier.
	 * Escape => ferme la modale
	 * Flèche gauche => média précédant
	 * Flèche droite => média suivant
	 * Espace => lecture de la vidéo
	 */
	lightboxModal.addEventListener("keydown", handleKeydownEvent);

	/**
     * Gère les événements de frappe au clavier dans la lightbox.
     *
     * @param {KeyboardEvent} event - L'événement du clavier à traiter.
     */
	function handleKeydownEvent(event) {

		switch (event.key) {
		case "Escape":
			closeLightboxModal();
			break;
		case "ArrowLeft":
			goToPreviousMedia();
			break;
		case "ArrowRight":
			goToTheNextMedia();
			break;
		case " " || "Space":
			playVideo();
			break;
		}
	}


	/**
     * Joue ou met en pause la vidéo affichée dans la lightbox, 
	 * si le média courant est une vidéo.
     */
	function playVideo() {
		if (media.video) {
			let video = document.querySelector(".lightbox__figure--picture");
			video.paused ? video.play() : video.pause();
		}
	}



	/**
	 * Écouteur d'événement de clic sur le bouton de fermeture de la modale.
	 * Lorsque le bouton est cliqué, cela efface le contenu de la modale et supprime
	 * les styles pour la masquer.
	 */
	const closeBtn = document.querySelector(".lightbox__btn--close");
	closeBtn.addEventListener("click", closeLightboxModal);


	function closeLightboxModal() {
		lightboxModal.innerHTML = "";
		lightboxModal.removeAttribute("style");

		// Attributs ARIA
		lightboxModal.removeAttribute("aria-modal");
		lightboxModal.removeAttribute("aria-labelledby");
		lightboxModal.setAttribute("aria-hidden", "true");

		lightboxModal.removeAttribute("tabindex");
		if (focusedElement) {
			focusedElement.focus();
		}
		
		// Supprime le flou à l'arrère plan
		removeBlurFilterFromBackground();

		// Supprime les écouteurs de la lightbox
		closeBtn.removeEventListener("click", closeLightboxModal);
		backBtn.removeEventListener("click", goToPreviousMedia);
		nextBtn.removeEventListener("click", goToTheNextMedia);
		lightboxModal.removeEventListener("keydown", handleKeydownEvent);

	}


	/**
	 * Événement de clic sur le bouton "back"
	 * Cela met à jour l'affichage de la modale en passant au média précédent dans la liste.
	 */
	const backBtn = document.querySelector(".lightbox__btn--back");
	backBtn.addEventListener("click", goToPreviousMedia);

	function goToPreviousMedia() {
		if (mediaIndex > 0) {
			mediaIndex--;
		} else {
			mediaIndex = mediaList.mediaList.length - 1;
		}
		media = mediaList.mediaList[mediaIndex];
		updateDisplayLightbox(media, firstName);
	}

	/**
	 * Événement de clic sur le bouton "next"
	 * Cela met à jour l'affichage de la modale en passant au média suivant dans la liste.
	 */
	const nextBtn = document.querySelector(".lightbox__btn--next");
	nextBtn.addEventListener("click", goToTheNextMedia);

	function goToTheNextMedia() {
		if (mediaIndex < mediaList.mediaList.length - 1) {
			mediaIndex++;
		} else {
			mediaIndex = 0;
		}
		media = mediaList.mediaList[mediaIndex];
		updateDisplayLightbox(media, firstName);
	}


	updateDisplayLightbox(media, firstName);

}

/**
 * Met à jour l'affichage de la modale lightbox en fonction du média fourni
 *
 * @param {object} media - L'objet média à afficher dans la lightbox.
 * @param {string} firstName - Le prénom du photographe associé au média.
 */
function updateDisplayLightbox(media, firstName) {

	const figureDOM = document.querySelector(".lightbox__figure");
	let mediaHTML;

	if (media.image) {
		mediaHTML = `
		<div class="img-loader">Chargement</div>
		<img src="/assets/images/photos/${firstName}/${media.image}" alt="${media.title}" class="lightbox__figure--picture">
        <figcaption id="lightboxTitle" class="lightbox__figure--legend">${media.title}</figcaption>
		`;

		figureDOM.innerHTML = mediaHTML;
		
		// Loader - attente du chargement de l'image
		let image = new Image();
		image.src = `/assets/images/photos/${firstName}/${media.image}`;
		image.onload = () => {
			const imgLoader = document.querySelector(".img-loader");
			if (imgLoader) {
				imgLoader.style.display = "none";
			}
		};
		image.onerror = () => {
			console.log("Problème lors du chargement de l'image");
		};


	} else {
		mediaHTML = `
		<video controls src="/assets/images/photos/${firstName}/${media.video}" type="vido/mp4"  title="${media.title}" class="lightbox__figure--picture" /></video>
        <figcaption id="lightboxTitle" class="lightbox__figure--legend">${media.title}</figcaption>
		`;	
		
		figureDOM.innerHTML = mediaHTML;
	}

	
}
