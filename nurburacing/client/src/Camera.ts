export class Camera {
	xpos: number;
	ypos: number;
	attachedContainer: Container;
	zoom: number;
	
	moveTo(x: number, y: number): void {
		this.xpos = x;
		this.ypos = y;
		this.attachedContainer.position.x = this.xpos;
		this.attachedContainer.position.y = this.ypos;
	}
	
	move(dx: number, dy: number): void {
		this.xpos += dx;
		this.ypos += dy;
		this.attachedContainer.position.x = this.xpos;
		this.attachedContainer.position.y = this.ypos;
	}
	
	setZoom(zoomValue: number) {
		this.zoom = zoomValue;
		this.attachedContainer.scale.set(this.zoom);
	}
	
	constructor(init_xpos: number = 0, init_ypos: number = 0, attachedContainer: Container) {
		this.xpos = init_xpos;
		this.ypos = init_ypos;
		this.attachedContainer = attachedContainer;
		
	}
};
