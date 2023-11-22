import { photographerTemplate } from "/scripts/templates/photographer.js";


/**
* Lecture du fichier JSON et retourne les données
*/
async function getJson() {
	return fetch("/data/photographers.json")
		.then((result) => (result.ok ? result.json() : null))
		.then((data) => {
			if (!data) {
				throw new Error("Impossible de lire les données ou données manquantes.");
			}
			return data;
		});

}


/**
* Affiche un message d'erreur à l'utilisateur en cas d'échec du chargement des données.
* @param error 
*/
function showError(error) {
	const main = document.querySelector("main");
	let message = `<p class="error-message">${error}</p>`;
	main.innerHTML = message;
}



/**
 * Stocke les données des photographes et des médias dans le sessionStorage pour un accès rapide.
 * Si les données ne sont pas déjà stockées, elles sont chargées depuis un fichier JSON.
 */
export async function dataStorage() {

	try {
		// Récupérer les données stockées dans le sessionStorage
		const storedPhotographers = sessionStorage.getItem("photographers");
		const storedMedia = sessionStorage.getItem("media");
	
		// Si les données ne sont pas stockées, on les charge depuis le JSON
		if (!storedPhotographers && !storedMedia) {
			const data = await getJson();
			const { photographers, media } = data;
	
			// Stocker les données dans le sessionStorage
			sessionStorage.setItem("photographers", JSON.stringify(photographers));
			sessionStorage.setItem("media", JSON.stringify(media));
 
			// console.log("Json chargé");
		} else {
			// console.log("Session chargée");
		}
	} catch (error) {
		showError(error.message);
	}
}



/**
 * Affiche les données des photographes sur la page d'accueil.
 * 
 * @param {Array<Object>} photographers - Les données des photographes à afficher.
 */
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographers");
	photographers.forEach( photographer => {
		
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
		
	});
}


/**
 * Initialise la page d'accueil en chargeant les données des photographes et en les affichant.
 */  
export async function initHomePage() {

	// Lecture du fichier JSON si besoin
	await dataStorage();

	// Récupération des données de sessionStorage
	const photographersData = JSON.parse(sessionStorage.getItem("photographers"));
  
	displayData(photographersData);
}