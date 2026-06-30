import { Application, Assets, Sprite, Graphics } from 'pixi.js'

// Główna pętla
async function main() {
	
	// Utworzenie aplikacji pixi.js
	const app = new Application();
	
	// Inicjalizowanie aplikacji
	await app.init({
		width: 1024,
		height: 768,
		backgroundColor: 0x11FFBB
	});
	
	// Dodawanie do DOM-a
	document.body.appendChild(app.canvas);

	// Wczytanie tekstury samochodu gracza
	//const playerCarTexture = await Assets.load('/assets/cars/fwd_car.png');
	
	// Utworzenie Sprite-a samochodu gracza i wczytanie tekstury
	//const playerCarSprite = new Sprite(playerCarTexture);
	
	//playerCarSprite.width = 240;
	//playerCarSprite.height = 240;
	
	//playerCarSprite.x = 400;
	//playerCarSprite.y = 300;
	
	// app.stage.addChild(playerCarSprite);
	
	
	// Menu główne
	const w_mainMenu = app.screen.width * 0.7;
	const h_mainMenu = app.screen.height * 0.7;
	const mainMenu = new Graphics().rect(
		( app.screen.width/2 - w_mainMenu/2 ), ( app.screen.height/2 - h_mainMenu/2 ),
		w_mainMenu, h_mainMenu)
		.fill(0x0055AA);
		
	const 	
	
	app.stage.addChild(mainMenu);
}

main();
