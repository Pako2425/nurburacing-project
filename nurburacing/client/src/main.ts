import { Application } from 'pixi.js'

// Główna pętla
async function main() {
	
	// Utworzenie aplikacji pixi.js
	const app = new Application();
	
	// Inicjalizowanie aplikacji
	await app.init({
		width: 1024,
		height: 768,
		backgroundColor: 0xFF0000
	});
	
	// Dodawanie do DOM-a
	document.body.appendChild(app.canvas);

}

main();
