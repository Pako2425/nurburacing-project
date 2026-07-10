import { Sprite, Texture, Point } from 'pixi.js';

export class Player {
	position: Point;
	width: number;
	height: number;
	carSprite: Sprite;
	
	constructor(x_init: number = 0, y_init: number = 0, carTexture: Texture) {
		this.position = new Point(x_init, y_init);
		this.carSprite = new Sprite(carTexture);
		this.carSprite.width = 100;
		this.carSprite.height = 100;
		this.carSprite.anchor.set(0.5,0.5);
		this.carSprite.position.x = this.position.x;
		this.carSprite.position.y = this.position.y;
	}
	
	move(dx: number, dy: number): void {
		this.position.x += dx;
		this.position.y += dy;
		this.carSprite.position.x = this.position.x;
		this.carSprite.position.y = this.position.y;
	}
	
	moveTo(x: number, y: number): void {
		this.position.x = x;
		this.position.y = y;
		this.carSprite.position.x = this.position.x;
		this.carSprite.position.y = this.position.y;
	}
}
