/**
 * Fichier principal de l'application Fisheye
 *
 * octobre 2023
 *
 */

import { initHomePage } from "./pages/index.js";
import { initPhotographerPage } from "./pages/photographer.js";


/**
* Initializes l'application sur la page actuelle
*/
function initApp() {
	const currentPage = window.location.pathname;

	if (currentPage === "/photographer.html") {
		initPhotographerPage();
	} else {
		initHomePage();
	}
}


initApp();





