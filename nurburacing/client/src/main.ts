import { Application, Assets, Sprite } from 'pixi.js'

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

	// Wczytanie tekstury samochodu gracza
	const playerCarTexture = await Assets.load('/assets/cars/fwd_car.png');
	
	// Utworzenie Sprite-a samochodu gracza i wczytanie tekstury
	const playerCarSprite = new Sprite(playerCarTexture);
	
	playerCarSprite.width = 240;
	playerCarSprite.height = 240;
	
	playerCarSprite.x = 400;
	playerCarSprite.y = 300;
	
	app.stage.addChild(playerCarSprite);
}

main();
