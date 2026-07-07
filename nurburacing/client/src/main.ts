import { Application, Assets, Sprite, Graphics, Container} from 'pixi.js';
import { Camera } from './Camera.ts';

// Główna pętla
async function main() {
		
	const app = new Application();
	
	await app.init({
		width: 1024,
		height: 768,
		backgroundColor: 0x11FFBB
	});

	document.body.appendChild(app.canvas);

	const worldContainer = new Container;
	
	// tor
	const worldTexture = await Assets.load('/assets/tracks/test_track.png');
	const worldSprite = new Sprite(worldTexture);
	worldSprite.scale = 0.7;
		
	worldContainer.addChild(worldSprite);
	
		// samochód
	const playerCarTexture = await Assets.load('/assets/cars/fwd_car.png');
	const playerCarSprite = new Sprite(playerCarTexture);
	
	playerCarSprite.width = 240;
	playerCarSprite.height = 240;
	playerCarSprite.x = 400;
	playerCarSprite.y = 300;
	
	worldContainer.addChild(playerCarSprite);


	const MainCamera = new Camera(0,0, worldContainer);
	
	
	app.stage.addChild(worldContainer);
	MainCamera.moveTo(0,0);
	MainCamera.zoom = 1;
	app.ticker.add(() => {
		if(MainCamera.zoom < 10) {
			MainCamera.zoom += 0.01;
		}
		else {
			MainCamera.zoom = 1;
		}
		MainCamera.setZoom(MainCamera.zoom);
		console.log(MainCamera.zoom);
	});
}

main();
