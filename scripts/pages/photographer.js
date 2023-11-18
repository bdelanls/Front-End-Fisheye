import { dataStorage } from "/scripts/pages/index.js";
import { sortMenu } from "/scripts/utils/sortMenu.js";
import { photographerTemplate } from "/scripts/templates/photographer.js";
import { MediaFactory } from "/scripts/components/mediaFactory.js";
import { StickyCard } from "/scripts/components/stickyCard.js";
import { SortMedia } from "/scripts/components/sortMedia.js";
import { displayContactForm } from "/scripts/utils/contactForm.js";



export const mediaList = new SortMedia();
export const stickyCard = new StickyCard();

/**
 * Transforme une liste de médias en objets médias et configure la liste
 *
 * @param {Array} medias - La liste des médias à transformer en objets médias
 * @param {string} photographerName - Le nom du photographe lié à ces médias
 */
async function createCardMedia(medias, photographerName) {

	// Récupère le prénom du photographe pour le dossier des photos
	const photographerFirstName = photographerName.split(" ")[0];

	// Ajout de ARIA LABEL sur la section
	const mediaSection = document.querySelector(".section-media-cards");
	mediaSection.setAttribute("ariaLabel", "Galerie de " + photographerName);

	const list = [];

	medias.forEach( media => {

		// Photo ou vidéo ?
		let type;
		"image" in media ? type = "photo": type = "video";

		const factory = new MediaFactory();
		const mediaChild = factory.createMedia(type, media, photographerFirstName);
		
		list.push(mediaChild);
	});

	mediaList.configure(list);
	mediaList.getListMedia();
}


/**
 * Affiche la carte "Sticky" avec le prix et le nombre total de likes.
 */
async function displayStickyCard(medias, price) {

	let totalLikes = 0;

	medias.forEach( media => {
		totalLikes += media.likes;
	});
	stickyCard.likes = totalLikes;
	stickyCard.price = price;
	stickyCard.getStickyCard();
}



/**
 * Affiche la liste des médias dans la section des médias
 * 
 * @param {Array} mediaList - La liste des médias à afficher
 */
export function displayMedia(mediaList) {
	const mediaSection = document.querySelector(".section-media-cards");
	mediaSection.innerHTML = "";

	for(let i=0; i < mediaList.length; i++) {
		const mediaCard = mediaList[i].getPhotoCard();
		mediaSection.appendChild(mediaCard);
	}
}


/**
* Affiche les informations sur le photographe dans photographer-header
*/
async function displayPhotographer(photographer) {

	const photographerHeaderSection = document.querySelector(".photographer-header");
	const photographerModel = photographerTemplate(photographer);
	const photographerHeader = photographerModel.getPhotographerHeader();
	photographerHeaderSection.innerHTML = photographerHeader;

	// bouton de contact
	const contactButton = document.querySelector(".contact_button");
	contactButton.addEventListener("click", () => {
		displayContactForm(photographer.name);
	});
		
}


async function getPhotographerByID(photographerID, photographersData) {
	
	const photographerToFind = photographersData.find(photographe => photographe.id === photographerID);

	if (photographerToFind) {
		return photographerToFind;
	} else {
		// photographe non trouvé, retour sur la page d'accueil
		window.location.href = "index.html";
	}
}


async function getID(currentURL) {
	const urlParams = new URL(currentURL);
	return parseInt(urlParams.searchParams.get("id"));
}


/**
 * Initialise la page du photographe en récupérant les données nécessaires
 */
export async function initPhotographerPage() {

	// Lecture du fichier JSON si besoin
	await dataStorage();

	const photographersData = JSON.parse(sessionStorage.getItem("photographers"));
	const mediaData = JSON.parse(sessionStorage.getItem("media"));

	// Récupère l'ID
	const currentURL = window.location.href;
	const photographerID = await getID(currentURL);

	// Récupère le photographe par son ID
	const photographerToFind = await getPhotographerByID(photographerID, photographersData);
	
	// Affiche le header
	displayPhotographer(photographerToFind);

	// Récupère les dédia du photographe et fabrique les objets et la mediaList
	const photographerMedia = mediaData.filter(media => media.photographerId === photographerID);
	await createCardMedia(photographerMedia, photographerToFind.name);

	// Initialise et affiche la Sticky Card
	await displayStickyCard(photographerMedia, photographerToFind.price);

	// initialise le menu de tri
	sortMenu(mediaList); 


}



