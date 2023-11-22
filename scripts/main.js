/**
 * Fichier principal de l'application Fisheye - octobre 2023.
 * 
 * Ce fichier sert de point d'entrée pour l'application Fisheye. Il détermine la page actuellement 
 * chargée (accueil ou page de photographe) et initialise l'application en conséquence.
 * 
 */


import { initHomePage } from "./pages/index.js";
import { initPhotographerPage } from "./pages/photographer.js";



/**
 * Initialise l'application en fonction de la page actuellement affichée.
 * Détecte si l'utilisateur se trouve sur la page d'accueil ou sur une page de photographe 
 * et lance l'initialisation appropriée.
 */
async function initApp() {
		
	const currentPage = window.location.pathname;

	if (currentPage === "/photographer.html") {
		initPhotographerPage();
	} else {
		initHomePage();
	}
}


// Démarrage de l'application
initApp();





