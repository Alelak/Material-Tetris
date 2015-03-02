function TetriminosO(ctx, direction, canvas) {
	"use strict";

	var self = this;
	this.squares = new Array();
	var square0 = new Square(0, 6);
	var square1 = new Square(0, 7);
	var square2 = new Square(1, 6);
	var square3 = new Square(1, 7);
	var test = false;
	self.squares.push(square0);
	self.squares.push(square1);
	self.squares.push(square2);
	self.squares.push(square3);
	var arr = [];
	var tabColor = ["yellow", "blue", "red", "green"];

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
		if (self.squares[2].i < 19) {
			var oldSquares = self.squares;

			for (var k = 0; k < piece.squares.length; k++) {
				grid[piece.squares[k].i][piece.squares[k].j] = false;
			}

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
			
			// S'il n'y a aucune collision on rafraichit  la vue
			if (!self.checkCollision(grid))
			{
				for (var k = 0; k < piece.squares.length; k++) {
					grid[piece.squares[k].i][piece.squares[k].j] = true;
				}
				
			}
			else {
				self.squares = oldSquares;
				//self.drawSquare();
			}

			self.drawSquare();

			
			//test =false;
		}
	};

	this.checkCollision = function(grid) {
		var collision = false;
		for (var k = 0; k < squares.length; k++) {
			for (var l = 0; l < squares[k].length; l++) {
				if (grid[squares[k][l]] == true)
					collision = true;
			}
		}

		return collision;
	};

}