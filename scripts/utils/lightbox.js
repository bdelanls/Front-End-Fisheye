import { mediaList } from "/scripts/pages/photographer.js";


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

	// Affichage de la lightbox
	const lightboxModal = document.getElementById("lightbox-modal");
	lightboxModal.style.display = "flex";


	// Contenu HTML de la lightbox
	let lightboxHTML = `
	<div class="lightbox">
        <button class="lightbox__btn lightbox__btn--close">
          <svg class="svg">
              <use xlink:href="/assets/images/icons/icons.svg#xmark"></use>
          </svg>
        </button>
        <button class="lightbox__btn lightbox__btn--back">
          <svg class="svg">
              <use xlink:href="/assets/images/icons/icons.svg#chevron-left"></use>
          </svg>
        </button>
        <figure class="lightbox__figure">
        </figure>
        <button class="lightbox__btn lightbox__btn--next">
          <svg class="svg">
              <use xlink:href="/assets/images/icons/icons.svg#chevron-right"></use>
          </svg>
        </button>
      </div>
	`;

	lightboxModal.innerHTML = lightboxHTML;


	/**
	 * Écouteur d'événement de clic sur le bouton de fermeture de la modale.
	 * Lorsque le bouton est cliqué, cela efface le contenu de la modale et supprime
	 * les styles pour la masquer.
	 */
	const closeBtn = document.querySelector(".lightbox__btn--close");
	closeBtn.addEventListener("click", () => {
		lightboxModal.innerHTML = "";
		lightboxModal.removeAttribute("style");
	});

	/**
	 * Événement de clic sur le bouton "back"
	 * Cela met à jour l'affichage de la modale en passant au média précédent dans la liste.
	 */
	const backBtn = document.querySelector(".lightbox__btn--back");
	backBtn.addEventListener("click", () => {
		if (mediaIndex > 0) {
			mediaIndex--;
		} else {
			mediaIndex = mediaList.mediaList.length - 1;
		}
		media = mediaList.mediaList[mediaIndex];
		updateDisplayLightbox(media, firstName);
	});

	/**
	 * Événement de clic sur le bouton "next"
	 * Cela met à jour l'affichage de la modale en passant au média suivant dans la liste.
	 */
	const nextBtn = document.querySelector(".lightbox__btn--next");
	nextBtn.addEventListener("click", () => {
		if (mediaIndex < mediaList.mediaList.length - 1) {
			mediaIndex++;
		} else {
			mediaIndex = 0;
		}
		media = mediaList.mediaList[mediaIndex];
		updateDisplayLightbox(media, firstName);
	});

	
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
		<img src="/assets/images/photos/${firstName}/${media.image}" alt="" class="lightbox__figure--picture">
        <figcaption class="lightbox__figure--legend">${media.title}</figcaption>
		`;
		
		// Loader sur l'image
		let image = new Image();
		image.src = `/assets/images/photos/${firstName}/${media.image}`;
		image.onload = () => {
			let imgLoader = document.querySelector(".img-loader");
			imgLoader.style.display = "none";
		};
		image.onerror = () => {
			console.log("Problème lors du chargement de l'image");
		};


	} else {
		mediaHTML = `
		<video controls src="/assets/images/photos/${firstName}/${media.video}" type="vido/mp4"  alt="" class="lightbox__figure--picture" /></video>
        <figcaption class="lightbox__figure--legend">${media.title}</figcaption>
		`;
	}

	figureDOM.innerHTML = mediaHTML;
}
