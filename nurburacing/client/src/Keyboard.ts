export class Keyboard {
	
	keys: Record<string, boolean>;

		
	constructor() {
		this.keys = {};
		this.keys['w'] = false;
		this.keys['s'] = false;
		this.keys['a'] = false;
		this.keys['d'] = false;
		
		window.addEventListener( 'keydown', (event) => {
			if(event.key in this.keys) {
				this.keys[event.key] = true;
			};
			
		} );
		
		window.addEventListener( 'keyup', (event) => {
			if(event.key in this.keys) {
				this.keys[event.key] = false;
			};
		} );
	}
	
	readInput(): Record<'string', boolean> {
		return this.keys;
	};
	

	
};
