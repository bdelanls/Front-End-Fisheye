import { sortMenu } from "../utils/sortMenu.js";
import { photographerTemplate } from "/scripts/templates/photographer.js";



/*

1 - récupérer l'ID du photographe
2 - Lire le fichier JSON et récupérer les données du photographe
3 - Envoyer les données au template
4 - Lire le fichier JSON et récupérer les données média liées au photographe
5 - Envoyer les données au template media

*/


// initialise le menu de tri
//sortMenu();


async function displayPhotographer(photographer) {
	const photographerHeaderSection = document.querySelector(".photographer-header");
		
	const photographerModel = photographerTemplate(photographer);
	
	const photographerHeader = photographerModel.getPhotographerHeader();
	
	photographerHeaderSection.innerHTML = photographerHeader;
		
}


export async function initPhotographerPage() {

	const photographers = JSON.parse(sessionStorage.getItem("photographers"));
	const media = JSON.parse(sessionStorage.getItem("media"));


	const currentURL = window.location.href;
	const urlParams = new URL(currentURL);
	const photographerID = parseInt(urlParams.searchParams.get("id"));

	const photographerToFind = photographers.find(photographe => photographe.id === photographerID);

	if (photographerToFind) {
		console.log(photographerToFind);
	} else {
		// photographe non trouvé, retour sur la page d'accueil
		window.location.href = "index.html";
	}

	displayPhotographer(photographerToFind);


	// const result = await getPhotographer();

}


