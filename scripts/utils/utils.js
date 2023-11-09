

/**
 * Applique un filtre flou sur l'arrière plan  
 * le modal reste net
 */
export function applyBlurFilterToBackground() {
	const bodyDOM = document.querySelector("body");
	bodyDOM.style.overflow = "hidden";

	const headerDOM = document.querySelector("header");
	const mainDOM = document.querySelector("main");
	const stickyDOM = document.querySelector(".sticky-card");

	headerDOM.classList.add("blur");
	mainDOM.classList.add("blur");
	stickyDOM.classList.add("blur");
}

/**
 * Supprime le filtre flou
 */
export function removeBlurFilterFromBackground() {
	const bodyDOM = document.querySelector("body");
	bodyDOM.removeAttribute("style");


	const headerDOM = document.querySelector("header");
	const mainDOM = document.querySelector("main");
	const stickyDOM = document.querySelector(".sticky-card");

	headerDOM.classList.remove("blur");
	mainDOM.classList.remove("blur");
	stickyDOM.classList.remove("blur");
}