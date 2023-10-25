//import { photographerTemplate } from "../templates/photographers.js";





async function getPhotographers() {
	try {
		const reponse = await fetch("/data/photographers.json");
		if (!reponse.ok) {
			throw new Error("Impossible de lire les données");
		}
		const photographers = await reponse.json();
		return photographers;
	} catch (error) {
		console.error("Erreur :", error);
	}	
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographers");


	photographers.forEach( photographer => {
		console.log(photographer);
		/*
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
		*/
	});
}

async function init() {
	// Récupère les datas des photographes
	const {photographers} = await getPhotographers();
	console.log(photographers);
	//displayData(photographers);
}
    
init();
    
