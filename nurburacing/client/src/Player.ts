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
	maxSteeringAngle: number;
	
	constructor(x_init: number = 0, y_init: number = 0, carTexture: Texture) {
		this.position = new Point(x_init, y_init);
		this.rotation = 0;
		this.carSprite = new Sprite(carTexture);
		this.carSprite.width = 100;
		this.carSprite.height = 100;
		this.carSprite.anchor.set(0.5,0.5);
		this.carSprite.position.x = this.position.x;
		this.carSprite.position.y = this.position.y;
		
		this.speed = 0;
		this.x_speed = 0;
		this.y_speed = 0;
		this.maxSpeed = 15;
		
		this.gas_acc = 1/60;
		this.brake_acc = 1/30;
		this.dec = 1/180;
		
		this.steeringAngle = 0;
		this.maxSteeringAngle = 30;
	}
	
	move(dx: number, dy: number): void {
		this.position.x += dx;
		this.position.y += dy;
	}
	
	moveTo(x: number, y: number): void {
		this.position.x = x;
		this.position.y = y;
	}
	
	drive(gas: boolean, brake: boolean, steeringAngle: number) {
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
		
		this.x_speed = this.speed * Math.cos(this.rotation);
		this.y_speed = this.y_speed * Math.sin(this.rotation);
		this.position.x += this.x_speed;
		this.position.y += this.y_speed;
	}
	
	update(): void {
		this.carSprite.position.x = this.position.x;
		this.carSprite.position.y = this.position.y;
	}
}
