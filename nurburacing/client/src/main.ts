import { Application, Assets, Texture, Sprite, Graphics, Container, Point } from 'pixi.js';
import { Howl } from 'howler';
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
	
	const HUDContainer = new Container;	
	
	const gaugesTexture = await Assets.load<Texture>('/assets/cars/civic-gauges.png');
	const gaugesSprite = new Sprite(gaugesTexture);
	
	const gauge_1_Texture = await Assets.load<Texture>('/assets/cars/gauge_1.png');
	const gauge_2_Texture = await Assets.load<Texture>('/assets/cars/gauge_2.png');
	const gauge_1_Sprite = new Sprite(gauge_1_Texture);
	const gauge_2_Sprite = new Sprite(gauge_2_Texture);
	
	gaugesSprite.position.set(181,571);
	gaugesSprite.scale.set(0.3);
	HUDContainer.addChild(gaugesSprite);
	
	gauge_1_Sprite.position.set(318,697);
	gauge_1_Sprite.scale.set(0.32);
	gauge_1_Sprite.anchor.set(0.49,0.79);
	HUDContainer.addChild(gauge_1_Sprite);
	
	gauge_2_Sprite.position.set(507,695);
	gauge_2_Sprite.scale.set(0.33);
	gauge_2_Sprite.anchor.set(0.49,0.82);
	HUDContainer.addChild(gauge_2_Sprite);
	
	
	
	const player = new Player(2479, 4111, 3.14, playerCarTexture);
	worldContainer.addChild(player.carSprite);

	const camera = new Camera(0, 0);
	camera.attachContainer(worldContainer);
	camera.moveTo(0,0);
	camera.attachedContainer.position.x += 512;
	camera.attachedContainer.position.y += 384;
	
	const keyboard = new Keyboard();
	let keys: Record<string, boolean>; 
	
	app.stage.addChild(worldContainer);
	app.stage.addChild(HUDContainer);
	
	camera.moveTo(0,0);
	camera.zoom = 1;
	camera.followPlayer(player);
	
	let gas: boolean;
	let brake: boolean;
	let steering: number;
	
	const civic_sound = new Howl ({
		src: ['/assets/cars/civic_engine_sound_1.mp3'],
		loop: true
	});
	
	const tire_sound = new Howl({
		src: ['/assets/cars/tire_sound_1.mp3'],
		loop: true
	});
	
	const exhaust_pop_sound = new Howl({
		src: ['/assets/cars/tire_sound_1.mp3'],
		loop: true
	});
	
	const gear_shift_sound = new Howl({
		src: ['/assets/cars/gear_shift_sound.mp3']
	});
	
	const shifterTexture = await Assets.load<Texture>('/assets/cars/gear_shifter.png');
	const knobTexture = await Assets.load<Texture>('/assets/cars/gear_shifter_knob.png');
	const shifterSprite = new Sprite(shifterTexture);
	const knobSprite = new Sprite(knobTexture);
	
	shifterSprite.scale.set(0.1);
	knobSprite.scale.set(0.1);
	
	const c_knob1: Point = { x: 12, y: 8 };
	const c_knob2: Point = { x: 12, y: 68 };
	const c_knob3: Point = { x: 37, y: 8 };
	const c_knob4: Point = { x: 37, y: 68 };
	const c_knob5: Point = { x: 62, y: 8 };
	
	knobSprite.position = c_knob1;
	
	
	const gearShifterContainer = new Container();
	gearShifterContainer.addChild(shifterSprite);
	gearShifterContainer.addChild(knobSprite);
	
	HUDContainer.addChild(gearShifterContainer);
	
	gearShifterContainer.position.x = 830;
	gearShifterContainer.position.y = 620;
	
	civic_sound.rate(0.4);
	civic_sound.volume(0.5);
	civic_sound.play();
	tire_sound.volume(0.1);
	
	
	app.ticker.add(() => {
		gas = false;
		brake = false;
		steering = 0;

		keys = keyboard.readInput();
		if(keys['d']) { 
			steering = 1;
		}
		else if(keys['a']) {
			steering = -1;
		}
		else {
			steering = 0; 
		}
		
		if(keys['w']) {
			gas = true;
		}
		else if(keys['s']) {
			brake = true;
		}
		else { 
			gas = false;
			brake = false; 
		}
		
		player.applyInput(gas, brake, steering);
		let isor: boolean = isOnRoad(player);
		player.drive(isor);
		player.powertrainDrive();
		gauge_1_Sprite.rotation = (0.0005 * player.currentRPM) - 1.8;
		
		let rate: number = (player.currentRPM/6500) + 0.3;
		civic_sound.rate(rate)
		
		if(player.speed > 10.0 && steering != 0) {
			if(tire_sound.play());
		}
		else {tire_sound.stop();}
		
		if(player.f_shiftUp || player.f_shiftDown) {
			gear_shift_sound.play();
		}
		
		player.update();
		camera.update();
	});
}



main();
