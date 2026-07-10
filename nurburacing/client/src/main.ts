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
	
	const worldTexture = await Assets.load<Texture>('/assets/tracks/test_track.png');
	const worldSprite = new Sprite(worldTexture);
	worldSprite.scale = 0.7;
		
	worldContainer.addChild(worldSprite);
	
	
	
	const playerCarTexture = await Assets.load<Texture>('/assets/cars/fwd_car.png');
	
	const player = new Player(0, 0, playerCarTexture);
	worldContainer.addChild(player.carSprite);

	const camera = new Camera(0, 0);
	camera.attachContainer(worldContainer);
	camera.moveTo(0,0);
	camera.attachedContainer.position.x += 512;
	camera.attachedContainer.position.y += 384;
	
	let keyboard = new Keyboard();
	let a: Record<string, boolean>; 
	
	app.stage.addChild(worldContainer);
	camera.moveTo(0,0);
	camera.zoom = 1;
	
	
	
	app.ticker.add(() => {

		a = keyboard.readInput();
		if(a['d']) {
			player.move(5,0);
			camera.move(-5,0);
		}
		if(a['a']) {
			player.move(-5,0);
			camera.move(5,0);
		}
		if(a['w']) {
			player.move(0,-5);
			camera.move(0,5);
		}
		if(a['s']) {
			player.move(0,5);
			camera.move(0,-5);
		}
		
		player.update();
		camera.update();
	});
}



main();
