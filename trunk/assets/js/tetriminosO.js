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
    this.stop = false;

    //fonction dissiner brique
    this.drawSquare = function () {
        for (var k = 0; k < self.squares.length; k++) {
            ctx.fillStyle = "#FFEB3B";
            if (self.squares[k].i <= 19) {
                ctx.lineWidth = 1.5;
                ctx.fillRect((self.squares[k].j * 25), self.squares[k].i * 25, 25, 25);
                ctx.strokeRect((self.squares[k].j * 25) + 1, self.squares[k].i * 25 + 1, 23, 23);
                test = true;
            } else {
                test = false;
            }

        }
    };

    //fonction animé brique
    this.animateSquare = function (dir, grid) {
        var oldSquares = [];

        if (self.squares[2].i < 19 && !self.checkCollisionNormal(grid)) {
            for (var k = 0; k < self.squares.length; k++) {
                grid[self.squares[k].i][self.squares[k].j] = false;
            }
            oldSquares.push(self.squares[0]);
            oldSquares.push(self.squares[1]);
            oldSquares.push(self.squares[2]);
            oldSquares.push(self.squares[3]);


            for (var k = 0; k < self.squares.length; k++) {
                if (test) {
                    ctx.clearRect((self.squares[k].j * 25), self.squares[k].i * 25, 25, 25);
                    if (dir != direction.DOWN) {
                        self.squares[k].i++;
                    }
                }
            }

            // On déplace la brique

            if (dir == direction.LEFT && self.squares[2].j > 0 && !self.checkCollisionLeft(grid)) {
                for (var k = 0; k < self.squares.length; k++) {
                    self.squares[k].j--;
                }
            } else if (dir == direction.RIGHT && self.squares[3].j < 13 && !self.checkCollisionRight(grid)) {
                for (var k = 0; k < self.squares.length; k++) {
                    self.squares[k].j++;
                }
            } else if (dir == direction.DOWN && !self.checkCollisionNormal(grid)) {
                self.bottomPosition(grid);
            }

            // S'il n'y a aucune collision on rafraichit  la vue
            for (var k = 0; k < self.squares.length; k++) {
                grid[oldSquares[k].i][oldSquares[k].j] = false;
                grid[self.squares[k].i][self.squares[k].j] = true;
            }
            self.drawSquare();
        } else {
            for (var i = 0; i < oldSquares.length; i++) {
                self.squares[i] = oldSquares[i];
            }
            self.stop = true;

        }

    };

    // vérifie la collision sur la lignes suivante
    this.checkCollisionNormal = function (grid) {
        var collision = false;
        if (self.squares[2].i + 1 <= 19 &&
            (grid[self.squares[2].i + 1][self.squares[2].j] == true ||
                grid[self.squares[3].i + 1][self.squares[3].j] == true)) {
            collision = true;
        }

        return collision;
    };

    // vérifie la collision sur la colonne de gauche
    this.checkCollisionLeft = function (grid) {
        var collision = false;
        if (self.squares[0].j - 1 >= 0 &&
            (grid[self.squares[0].i][self.squares[0].j - 1] == true ||
                grid[self.squares[2].i][self.squares[2].j - 1] == true)) {
            collision = true;
        }
        return collision;
    };

    // vérifie la collision sur la colonne de droite
    this.checkCollisionRight = function (grid) {

        var collision = false;
        if (self.squares[1].j + 1 <= 13 &&
            (grid[self.squares[1].i][self.squares[1].j + 1] == true ||
                grid[self.squares[3].i][self.squares[3].j + 1] == true)) {
            collision = true;
        }
        return collision;
    }

    // vérifie si c'est game over
    this.isOver = function (grid) {
        var isOver = false;
        for (var k = 0; k < grid[2].length; k++) {
            if (grid[2][k] == true && (self.squares[2].j == k || self.squares[3].j == k)) {
                isOver = true;
            }
        }
        return isOver;
    };

    // met la brique en bas 
    this.bottomPosition = function (grid) {
        while (self.squares[0].i < 19 && self.squares[1].i < 19 &&
            self.squares[2].i < 19 && self.squares[3].i < 19 &&
            !self.checkCollisionNormal(grid)) {
            for (var k = 0; k < self.squares.length; k++) {
                self.squares[k].i++;
            }
        }
    };
}