import { Sprite, Texture, Point } from 'pixi.js';

export class Player {
	position: Point;
	rotation: number;
	width: number;
	height: number;
	carSprite: Sprite;
	
	speed: number;
	maxSpeed: number;
	x_speed: number;
	y_speed: number;
	
	gas_acc: number;
	brake_acc: number;
	dec: number;
	
	steeringAngle: number;
	d_steeringAngle: number;
	maxSteeringAngle: number;
	
	gear: number;
	n_gears: number
	
	currentRPM: number;
	idleRPM: number;
	maxRPM: number;
	
	constructor(x_init: number = 0, y_init: number = 0, rotation: number = 0, carTexture: Texture) {
		this.position = new Point(x_init, y_init);
		this.rotation = rotation;
		this.carSprite = new Sprite(carTexture);
		this.carSprite.width = 170;
		this.carSprite.height = 170;
		this.carSprite.anchor.set(0.38,0.5);
		this.carSprite.position.x = this.position.x;
		this.carSprite.position.y = this.position.y;
		
		this.speed = 0;
		this.x_speed = 0;
		this.y_speed = 0;
		this.maxSpeed = 20;
		
		this.gas_acc = 1/30;
		this.brake_acc = 1/10;
		this.dec = 1/180;
		
		this.steeringAngle = 0;
		
		this.gear = 1;
		this.n_gears = 5;

		this.idleRPM = 800;
		this.currentRPM = this.idleRPM;
		this.maxRPM = 8200;
	}
	
	move(dx: number, dy: number): void {
		this.position.x += dx;
		this.position.y += dy;
	}
	
	moveTo(x: number, y: number): void {
		this.position.x = x;
		this.position.y = y;
	}
	
	applyInput(gas: boolean, brake: boolean, steering: number): void {

		if( gas ) {
			if( this.speed <= this.maxSpeed ) { this.speed += this.gas_acc; }
			else { this.speed = this.maxSpeed; }
		}
		else if ( brake ) {
			if (this.speed > 0) { this.speed -= this.brake_acc; }
			else { this.speed = 0; }
		}
		else {
			if( this.speed > 0 ) { this.speed -= this.dec; }
			else { this.speed = 0; }
		}
		
		let d_steeringAngle: number = 0.0;

		if( this.speed > 0 ) {
			d_steeringAngle = 0.02;
		}
		
		this.steeringAngle = d_steeringAngle*steering;
	}
	
	drive(isOnRoad: boolean): void {
		if( isOnRoad ) {
			this.speed = this.speed;
			this.steeringAngle = this.steeringAngle;
		}
		
		else {
			
			if( this.speed <= 0.1*this.maxSpeed ) {
				this.speed = this.speed;
			}
			
			else {
				this.speed -= 1/10;
			}
			
			this.steeringAngle = this.steeringAngle*0.5;
		}
	}
	
	powertrainDrive(): void {
		
		let g1_r: number = 2333;
		let g2_r: number = 1166;
		let g3_r: number = 778;
		let g4_r: number = 583;
		let g5_r: number = 350;
		
		let ratio: number = g1_r;
		
		if( (0 <= this.speed) && (this.speed < 3.0) ) { 
			this.gear = 1;
			ratio = g1_r;
		}
		else if( (3.0 <= this.speed) && (this.speed < 6.0) ) {
			this.gear = 2;
			ratio = g2_r;
		}
		else if( (6.0 <= this.speed) && (this.speed < 9.0) ) {
			this.gear = 3;
			ratio = g3_r;
		}
		else if( (9.0 <= this.speed) && (this.speed < 12.0) ) {
			this.gear = 4;
			ratio = g4_r;
		}
		else if( 12.0 <= this.speed ) {
			this.gear = 5;
			ratio = g5_r;
		}
		else {
			this.gear = 1;
			ratio = gr1_r;
		}
	
		this.currentRPM = this.idleRPM + (ratio*this.speed);
	
	}
	
	update(): void {
		this.rotation += this.steeringAngle;
		this.x_speed = this.speed * Math.cos(this.rotation);
		this.y_speed = this.speed * Math.sin(this.rotation);
		this.position.x += this.x_speed;
		this.position.y += this.y_speed;
		
		this.carSprite.position.x = this.position.x;
		this.carSprite.position.y = this.position.y;
		this.carSprite.rotation = this.rotation;
		
	}
}
