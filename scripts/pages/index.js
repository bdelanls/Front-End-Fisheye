import { photographerTemplate } from "/scripts/templates/photographer.js";




async function getPhotographers() {
	try {
		const reponse = await fetch("/data/photographers.json");
		if (!reponse.ok) {
			throw new Error("Impossible de lire les données");
		}
		const photographers = await reponse.json();
		console.log("photographers", photographers);
		return photographers;

	} catch (error) {
		showError(error.message);
	}	
}

function showError(error) {
	let main = document.querySelector("main");
	let message = `<p class="error-message">${error}</p>`;
	main.innerHTML = message;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographers");
	let num = 0;
	photographers.forEach( photographer => {
		num++;
		
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM(num);
		console.log(userCardDOM);
		photographersSection.appendChild(userCardDOM);
		
	});
}

async function init() {
	// Récupère les datas des photographes
	const {photographers} = await getPhotographers();
	displayData(photographers);
}
    
init();
    
