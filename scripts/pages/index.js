import { photographerTemplate } from "/scripts/templates/photographer.js";


async function getPhotographers() {
	try {
		const response = await fetch("/data/photographers.json");
		if (!response.ok) {
			throw new Error("Impossible de lire les données");
		}
		const text = await response.text();

		// Vérifie si la réponse est vide ou nulle
		if (!text.trim()) {
			throw new Error("Fichier JSON vide ou non trouvé");
		}

		const photographers = JSON.parse(text);

		// Vérifie si les données JSON sont valides
		if (!photographers || typeof photographers !== "object") {
			throw new Error("Erreur lors de l'analyse des données JSON");
		}

		return photographers;
	} catch (error) {
		showError(error.message);
		return null; 
	}
}
  

function showError(error) {
	const main = document.querySelector("main");
	let message = `<p class="error-message">${error}</p>`;
	main.innerHTML = message;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographers");
	photographers.forEach( photographer => {
		
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
		
	});
}


  
export async function initHomePage() {
	// Récupère les datas des photographes
	const result = await getPhotographers();
  
	if (result !== null) {
		const { photographers } = result;
		displayData(photographers);
	}
}