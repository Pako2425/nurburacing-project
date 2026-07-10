import { Container } from 'pixi.js';

export class Camera {
	xpos: number;
	ypos: number;
	attachedContainer: Container;
	zoom: number;
	width: number;
	height: number;
	
	moveTo(x: number, y: number): void {
		this.xpos = x;
		this.ypos = y;
		//this.attachedContainer.position.x = this.xpos + this.width/2;
		//this.attachedContainer.position.y = this.ypos + this.height/2;
	}
	
	move(dx: number, dy: number): void {
		this.xpos += dx;
		this.ypos += dy;
		//this.attachedContainer.position.x = this.xpos + this.width/2;
		//this.attachedContainer.position.y = this.ypos + this.height/2;
	}
	
	setZoom(zoomValue: number): void {
		this.zoom = zoomValue;
		this.attachedContainer.scale.set(this.zoom);
	}
	
	attachContainer(container: Container): void {
		this.attachedContainer = container;
	}
	
	constructor(init_xpos: number = 0, init_ypos: number = 0) {
		this.xpos = init_xpos;
		this.ypos = init_ypos;
		this.width = 1024;
		this.height = 768;
	}
	
	update(): void {
		this.attachedContainer.position.x = this.xpos + this.width/2;
		this.attachedContainer.position.y = this.ypos + this.height/2;
	}
	
};
