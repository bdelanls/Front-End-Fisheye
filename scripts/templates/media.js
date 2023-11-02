export function mediaTemplate(data, firstName) {
	
	const { id, photographerId, title, image, likes, date, price } = data;

	const picture = `/assets/images/photos/${firstName}/${image}`;


	function getPhotoCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";

		let photoCardHTML = `
          <a href="#" class="media-card__link">
            <img src="${picture}" alt="${title}" class="media-card__media">
          </a>
          <div class="media-card__legend">
            <h3 class="media-card__legend--title">${title}</h3>
            <div class="media-card__legend--like">
              <a href="#">
			    ${likes}
                <svg class="media-card__legend--svg">
                <use xlink:href="assets/images/icons/icons.svg#heart"></use>
              </svg>
              </a>
            </div>
          </div>`;

		article.innerHTML = photoCardHTML;
		return (article);

	}

	function getVideoCard() {

		const article = document.createElement( "article" );
		article.classList = "media-card";

		let videoCardHTML = `
          <a href="#" class="media-card__link">
            <img src="${picture}" alt="${title}" class="media-card__media">
          </a>
          <div class="media-card__legend">
            <h3 class="media-card__legend--title">${title}</h3>
            <div class="media-card__legend--like">
              <a href="#">
			    ${likes}
                <svg class="media-card__legend--svg">
                <use xlink:href="assets/images/icons/icons.svg#heart"></use>
              </svg>
              </a>
            </div>
          </div>`;

		article.innerHTML = videoCardHTML;
		return (article);

	}

	return { getPhotoCard, getVideoCard };
	
	
}