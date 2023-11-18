import { Photo } from "../components/photo.js";
import { Video } from "../components/video.js";


/**
* Factory Patterns de media
* 
* @param type - photo ou video
* @param data - les données de la photo ou de la vidéo
* @param photographerFirstName - le prénom du photographe pour l'URL
* 
* @return création d'un objet Photo ou Video
*/
export class MediaFactory {

	createMedia (type, data, photographerFirstName) {
		switch (type) {
		case "photo":
			return new Photo(data, photographerFirstName);
		case "video":
			return new Video(data, photographerFirstName);

		}
	}

}