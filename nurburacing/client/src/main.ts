import { Application, Assets, Texture, Sprite, Graphics, Container} from 'pixi.js';
import { Camera } from './Camera.ts';
import { Player } from './Player.ts';

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
	const worldTexture = await Assets.load<Texture>('/assets/tracks/test_track.png');
	const worldSprite = new Sprite(worldTexture);
	worldSprite.scale = 0.7;
		
	worldContainer.addChild(worldSprite);
	
	// samochód
	const playerCarTexture = await Assets.load<Texture>('/assets/cars/fwd_car.png');
	
	const player = new Player(20, 20, playerCarTexture);
	worldContainer.addChild(player.carSprite);

	const MainCamera = new Camera(0, 0);
	MainCamera.attachContainer(worldContainer);
	
	
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
	});
}

main();
