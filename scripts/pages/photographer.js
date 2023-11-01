import { sortMenu } from "../utils/sortMenu.js";

/*

1 - récupérer l'ID du photographe
2 - Lire le fichier JSON et récupérer les données du photographe
3 - Envoyer les données au template
4 - Lire le fichier JSON et récupérer les données média liées au photographe
5 - Envoyer les données au template media

*/


// initialise le menu de tri
//sortMenu();

async function getPhotographerByID() {
	const reponse = await fetch("/data/photographers.json");
	const photographer = await reponse.json();
	return photographers;
}

export async function initPhotographerPage() {

	const currentURL = window.location.href;
	const urlParams = new URL(currentURL);
	const photographerID = urlParams.searchParams.get("id");

	console.log(photographerID);


	// const result = await getPhotographer();

}


