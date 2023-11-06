import { displayMedia } from "/scripts/pages/photographer.js";


/**
 * Classe permettant de trier une liste de médias selon différents critères
 */
export class SortMedia {
	
	// Configure la liste de médias à trier
	configure(data) {
		this.mediaList = data;
	}

	getMediaList(){
		return this.mediaList;
	}

	// Trie la liste de médias en fonction du critère spécifié
	getListMedia(tri = "popularity") {

		if (tri === "date") {
			this.mediaList.forEach((media) => {
				media.parsedDate = parseDate(media.date); // Crée une nouvelle propriété "parsedDate"			
			});
			this.mediaList.sort((a, b) => {
				return b.parsedDate - a.parsedDate;
			});

		} else if (tri === "title") {
			this.mediaList.sort((a, b) => {
				const titleA = a.title.trim().toLowerCase(); // Convertit le titre en minuscules
				const titleB = b.title.trim().toLowerCase(); 
				return titleA.localeCompare(titleB); // Compare les titres en respectant l'ordre alphabétique
			});

		} else {
			this.mediaList.sort((a, b) => {
				if (typeof a.likes === "number" && typeof b.likes === "number" && a.likes >= 0 && b.likes >= 0) {
					return b.likes - a.likes;
				} else {
					return 0;
				}
			});
		}
	
		displayMedia(this.mediaList);
	
	}

}


/**
 * Analyse une chaîne de caractères de date au format "YYYY-MM-DD" en objet Date
 *
 * @param {string} dateString - La chaîne de caractères de date à analyser
 * @returns {Date|null} Un objet Date si l'analyse réussit, sinon null
 */
function parseDate(dateString) {
	const parts = dateString.split("-");
	if (parts.length === 3) {
		const year = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // Les mois sont 0-indexés
		const day = parseInt(parts[2], 10);
		const parsedDate = new Date(year, month, day);

		// console.log(dateString + " => " + parsedDate);

		if (!isNaN(parsedDate.getTime())) {
			return parsedDate;
		}
	}

	// Si la date n'est pas valide, retournez une date équivalente au 1er janvier 1970
	return new Date(0);
	
}