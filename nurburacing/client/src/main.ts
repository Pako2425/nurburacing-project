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
	const worldTexture_collisionLayer = await Assets.load<Texture>('assets/tracks/test_track_collision_layer.png');
	
	const worldSprite = new Sprite(worldTexture);
	//worldSprite.scale = 0.7;	
	worldContainer.addChild(worldSprite);
	
	const worldCollisionPixels = app.renderer.extract.pixels({
		target: worldTexture_collisionLayer,
	})
	
	const worldCollisionPixelsList = worldCollisionPixels.pixels;
	
	function isOnRoad(player: Player): boolean {
		const px: number = player.position.x;
		const py: number = player.position.y;
		
		const pixel: number = (Math.floor(px) + 5016*Math.floor(py))*4;
		
		const r_det = worldCollisionPixelsList[pixel];
		//const g_det = worldCollisionPixelsList[cnt+1];
		//const b_det = worldCollisionPixelsList[cnt+2];
		
		if( r_det > 0 ) { return true; }
		else { return false; }
	}
	
	
	const playerCarTexture = await Assets.load<Texture>('/assets/cars/fwd_car.png');
	
	const player = new Player(0, 0, playerCarTexture);
	worldContainer.addChild(player.carSprite);

	const camera = new Camera(0, 0);
	camera.attachContainer(worldContainer);
	camera.moveTo(0,0);
	camera.attachedContainer.position.x += 512;
	camera.attachedContainer.position.y += 384;
	
	const keyboard = new Keyboard();
	let keys: Record<string, boolean>; 
	
	app.stage.addChild(worldContainer);
	
	camera.moveTo(0,0);
	camera.zoom = 1;
	camera.followPlayer(player);
	
	let gas: boolean;
	let brake: boolean;
	let steering: number;
	
	
	
	app.ticker.add(() => {
		gas = false;
		brake = false;
		steering = 0;

		keys = keyboard.readInput();
		if(keys['d']) { steering = 1; }
		else if(keys['a']) { steering = -1; }
		else { steering = 0; }
		
		if(keys['w']) { gas = true; }
		else if(keys['s']) { brake = true; }
		else { 
			gas = false;
			brake = false; 
		}
		
		player.applyInput(gas, brake, steering);
		isOnRoad(player);
		player.update();
		camera.update();
		
	});
}



main();
