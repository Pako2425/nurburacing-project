import { Application, Assets, Texture, Sprite, Graphics, Container} from 'pixi.js';
import { Camera } from './Camera.ts';
import { Player } from './Player.ts';
import { Keyboard } from './Keyboard.ts';

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
	
	let keyboard = new Keyboard();
	let a: Record<string, boolean>; 
	
	app.stage.addChild(worldContainer);
	MainCamera.moveTo(0,0);
	MainCamera.zoom = 1;
	app.ticker.add(() => {

		a = keyboard.readInput();
		if(a['d']) {
			//player.carSprite.position.x += 5;
			player.move(5,0);
		}
		if(a['a']) {
			//player.carSprite.position.x -= 5;
			player.move(-5,0);
		}
		if(a['w']) {
			//player.carSprite.position.y -= 5;
			player.move(0,-5);
		}
		if(a['s']) {
			//player.carSprite.position.y += 5;
			player.move(0,5);
		}
	});
}



main();
