function TetriminosO(ctx, direction, canvas) {
	"use strict";

	var self = this;
	this.squares = [];
	var square0 = new Square(0, 6);
	var square1 = new Square(0, 7);
	var square2 = new Square(1, 6);
	var square3 = new Square(1, 7);
	var test = false;
	self.squares.push(square0);
	self.squares.push(square1);
	self.squares.push(square2);
	self.squares.push(square3);
	var tabColor = ["yellow", "blue", "red", "green"];
	var stop = false;
	this.drawSquare = function() {
		for (var k = 0; k < self.squares.length; k++) {
			ctx.fillStyle = tabColor[k];
			if (self.squares[k].i <= 19) {
				ctx.fillRect((self.squares[k].j * 25), self.squares[k].i * 25, 25, 25);
				test = true;
			} else {
				test = false;
				//self.drawSquare();
			}

			//console.log("ici");
		}
	};

	this.animateSquare = function(dir, grid) {
		var oldSquares = [];
		if (self.squares[2].i < 19 && !self.checkCollision(grid)) {
			
			oldSquares.push(self.squares[0]);
			oldSquares.push(self.squares[1]);
			oldSquares.push(self.squares[2]);
			oldSquares.push(self.squares[3]);
			
			
			for (var k = 0; k < self.squares.length; k++) {
				if (test)
					ctx.clearRect((self.squares[k].j * 25), self.squares[k].i * 25, 25, 25);
			}

			// On déplace la brique
			if (dir == direction.LEFT && self.squares[2].j > 0) {
				for (var k = 0; k < self.squares.length; k++) {
					self.squares[k].j--;
				}
			} else if (dir == direction.RIGHT && self.squares[3].j < 13) {
				for (var k = 0; k < self.squares.length; k++) {
					self.squares[k].j++;
				}
			}
			/*else if (dir == direction.DOWN && tab[a].posY < 425) {
			 tab[a].posY += 50;
			 }*/
			for (var k = 0; k < self.squares.length; k++) {
				if (test)
					self.squares[k].i++;

			}

			//console.log(grid[self.squares[2].i][self.squares[2].j]);
			//console.log(grid[self.squares[3].i][self.squares[3].j]);

			// S'il n'y a aucune collision on rafraichit  la vue
			for (var k = 0; k < self.squares.length; k++) {
				grid[oldSquares.squares[k].i][oldSquares.squares[k].j] = false;
				grid[self.squares[k].i][self.squares[k].j] = true;
			}
			self.drawSquare();	
			
		} else {
			for (var i = 0; i < self.squares.length; i++) {
				self.squares[i] = oldSquares[i];
			}
			stop = true;
			
		}
		
	};

	this.checkCollision = function(grid) {
		var collision = false;

		if (grid[self.squares[2].i+1][self.squares[2].j] == true && grid[self.squares[3].i+1][self.squares[3].j] == true)
			collision = true;

		return collision;
	};

}