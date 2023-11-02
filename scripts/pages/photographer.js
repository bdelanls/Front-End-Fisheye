import { dataStorage } from "/scripts/pages/index.js";
//import { sortMenu } from "/scripts/utils/sortMenu.js";
import { photographerTemplate } from "/scripts/templates/photographer.js";
import { mediaTemplate } from "/scripts/templates/media.js";



/*

1 - récupérer l'ID du photographe
2 - Lire le fichier JSON et récupérer les données du photographe
3 - Envoyer les données au template
4 - Lire le fichier JSON et récupérer les données média liées au photographe
5 - Envoyer les données au template media

*/


// initialise le menu de tri
//sortMenu();


async function displayMedia(medias, photographerFirstName) {

	// faire le tri
	// vérifier si c'est une photo ou une vidéo
	// proposer un loader ?
	

	const mediaSection = document.querySelector(".section-media-cards");
	medias.forEach( media => {
		
		const mediaModel = mediaTemplate(media, photographerFirstName);
		const userCardDOM = mediaModel.getPhotoCard();
		mediaSection.appendChild(userCardDOM);
		
	});
}


async function getFirstName(photographer) {
	const photographerName = photographer.name;
	return photographerName.split(" ")[0];
}

/**
* Affiche les informations sur le photographe dans photographer-header
*/
async function displayPhotographer(photographer) {

	const photographerHeaderSection = document.querySelector(".photographer-header");
	const photographerModel = photographerTemplate(photographer);
	const photographerHeader = photographerModel.getPhotographerHeader();
	photographerHeaderSection.innerHTML = photographerHeader;
		
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

	// Récupère le prénom du photographe pour le dossier photos
	const photographerFirstName = await getFirstName(photographerToFind);

	// Récupère les dédia du photographe
	const photographerMedia = mediaData.filter(media => media.photographerId === photographerID);
	displayMedia(photographerMedia, photographerFirstName);

	// const result = await getPhotographer();
	console.log(photographerFirstName);
}


