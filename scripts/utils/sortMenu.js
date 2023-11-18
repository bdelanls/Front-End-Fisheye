//import { medialist as displayAfterSort } from "/scripts/pages/photographer.js";


export function sortMenu(mediaList) {

	const selectedItem = document.querySelector(".sort-menu--selected");
	const menuItems = document.querySelector(".sort-menu--items");

	//popularity - date - title
	let dataValue = "popularity";
	let textValue = "Popularité";
	let topMenuItems = 0;

	// écouteur sur le bouton
	selectedItem.addEventListener("click", event => {
		event.stopPropagation();
		toggleMenu();
	});

	function updateAriaSelected(selectedDataValue) {
		menuItems.querySelectorAll("li").forEach(item => {
			// Vérifiez si l'élément courant a le même data-value que celui sélectionné
			if (item.getAttribute("data-value") === selectedDataValue) {
				item.setAttribute("aria-selected", "true");
			} else {
				item.setAttribute("aria-selected", "false");
			}
		});
	}


	// écouteur sur le menu
	menuItems.addEventListener("click", handleMenuInteraction);
	menuItems.addEventListener("keydown", event => {
		if (event.key === "Enter" && event.target.tagName === "LI") {
			handleMenuInteraction(event);
		}
	});

	function handleMenuInteraction(event) {

		let target = event.target;
		if (target.tagName === "LI") {
			dataValue = target.getAttribute("data-value");
			textValue = target.textContent;
			selectItem(dataValue, textValue);

			// Mise à jour aria-selected
			updateAriaSelected(dataValue);
		}
	}

	// écouteur : clique en dehors du menu
	document.addEventListener("click", event => {

		if (!menuItems.contains(event.target)) {
			closeMenu();
		}
	});



	function toggleMenu() {
		if (menuItems.style.display === "block") {
			closeMenu();
		} else {
			openMenu();
		}
	}

	function openMenu() {

		if (dataValue === "date") {
			topMenuItems = -60;
		} else if (dataValue === "title") {
			topMenuItems = -120;
		} else {
			topMenuItems = 0;
		}

		menuItems.style.cssText = `display: block; top: ${topMenuItems}px;`;
		selectedItem.style.display = "none";

		// Mettre le focus sur l'élément sélectionné
		const selectedElement = menuItems.querySelector("[aria-selected='true']");
		if (selectedElement) {
			selectedElement.focus();
		}

	}

	// Ferme le menu
	function closeMenu() {
		menuItems.style.cssText = "display: none";
		selectedItem.style.removeProperty("display");

		// Mettre le focus sur le bouton
		// setTimeout(() => {
		// 	selectedItem.focus();
		// }, 0);
	}


	// met à jour le texte du bouton et l'affichage des médias
	function selectItem(dataValue, textValue) {
		selectedItem.textContent = textValue;
		toggleMenu();

		mediaList.getListMedia(dataValue);
	}

	/**
	 * 
	 */
	menuItems.addEventListener("keydown", event => {
		let currentFocus = document.activeElement;

		if (event.key === "ArrowDown") {
			event.preventDefault(); // Empêcher le comportement par défaut de la touche fléchée
			let nextFocus = currentFocus.nextElementSibling || menuItems.firstElementChild;
			nextFocus.focus();
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			let prevFocus = currentFocus.previousElementSibling || menuItems.lastElementChild;
			prevFocus.focus();
		} else if (event.key === "Escape") {
			closeMenu();
		}
	});

	const lastMenuItem = menuItems.lastElementChild;
	lastMenuItem.addEventListener("keydown", function (event) {
		if (event.key === "Tab" && !event.shiftKey) {
			closeMenu();
		}
	});

}

