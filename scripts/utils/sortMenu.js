
export function sortMenu(){

	const selectedItem = document.querySelector(".sort-menu--selected");
	const menuItems = document.querySelector(".sort-menu--items");

	//popularity - date - title
	let dataValue = "popularity";
	let textValue = "Popularité";
	let topMenuItems = 0;

	selectedItem.addEventListener("click", function() {
		toggleMenu();
	});

	menuItems.addEventListener("click", function(event) {
		if (event.target.tagName === "LI") {
			dataValue = event.target.getAttribute("data-value");
			textValue = event.target.textContent;
			selectItem(dataValue, textValue);
		}
	});

	menuItems.addEventListener("mouseleave", function() {
		closeMenu();
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
	}
	
	function closeMenu() {
		menuItems.style.cssText = "display: none";
		selectedItem.style.removeProperty("display");
	}

	function selectItem(dataValue, textValue) {
		// met à jour le texte du bouton
		selectedItem.textContent = textValue;
		toggleMenu();
		console.log(dataValue);
	}

}

