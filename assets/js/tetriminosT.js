function TetriminosT(ctx, direction, canvas) {
    "use strict";

    var self = this;
    var test = false;
    this.squares = [];
    this.state = "down";
    var square0 = new Square(0, 6);
    var square1 = new Square(0, 7);
    var square2 = new Square(0, 8);
    var square3 = new Square(1, 7);


    self.squares.push(square0);
    self.squares.push(square1);
    self.squares.push(square2);
    self.squares.push(square3);

    this.stop = false;

    //fonction dissiner brique
    this.drawSquare = function () {
        for (var k = 0; k < self.squares.length; k++) {
            ctx.fillStyle = "#9C27B0";
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
        var oldsquares = [];



        if (((self.squares[3].i < 19 && (self.state == "right" || self.state == "down" || self.state == "up")) ||
                (self.squares[2].i < 19 && (self.state == "left"))) && !self.checkCollisionNormal(grid)) {

            for (var k = 0; k < self.squares.length; k++) {
                grid[self.squares[k].i][self.squares[k].j] = false;
            }
            oldsquares.push(self.squares[0]);
            oldsquares.push(self.squares[1]);
            oldsquares.push(self.squares[2]);
            oldsquares.push(self.squares[3]);
            // On déplace la brique


            for (var k = 0; k < self.squares.length; k++) {
                if (test) {
                    ctx.clearRect((self.squares[k].j * 25), self.squares[k].i * 25, 25, 25);
                    if (dir != direction.DOWN) {
                        self.squares[k].i++;
                    }
                }
            }

            if (dir == direction.UP) {

                if (self.state == "down") {
                    if (self.squares[0].i - 1 >= 0 && self.squares[0].j + 1 <= 13 &&
                        grid[self.squares[0].i - 1][self.squares[0].j + 1] == false) {

                        self.squares[0].i -= 1;
                        self.squares[0].j += 1;

                        self.state = "right";
                    }
                } else if (self.state == "right") {
                    if (self.squares[3].i - 1 >= 0 && self.squares[3].j - 1 >= 0 &&
                        grid[self.squares[3].i - 1][self.squares[3].j - 1] == false) {

                        self.squares[3].i -= 1;
                        self.squares[3].j -= 1;

                        self.state = "up";
                    }
                } else if (self.state == "up") {
                    if (self.squares[2].i + 1 <= 19 && self.squares[2].j - 1 >= 0 &&
                        grid[self.squares[2].i - 1][self.squares[2].j + 2] == false) {

                        self.squares[2].i += 1;
                        self.squares[2].j -= 1;

                        self.state = "left";
                    }
                } else if (self.state == "left") {
                    if (self.squares[0].i + 1 <= 19 && self.squares[2].i - 1 >= 0 && self.squares[3].i + 1 <= 19 &&
                        self.squares[0].j - 1 >= 0 && self.squares[2].j + 1 <= 13 && self.squares[3].j + 1 <= 13 &&
                        grid[self.squares[0].i + 1][self.squares[0].j - 1] == false &&
                        grid[self.squares[2].i - 1][self.squares[2].j + 1] == false &&
                        grid[self.squares[3].i + 1][self.squares[3].j + 1] == false) {

                        self.squares[0].i += 1;
                        self.squares[0].j -= 1;

                        self.squares[2].i -= 1;
                        self.squares[2].j += 1;

                        self.squares[3].i += 1;
                        self.squares[3].j += 1;

                        self.state = "down";
                    }
                }
                for (var k = 0; k < self.squares.length; k++) {
                    grid[self.squares[k].i][self.squares[k].j] = true;
                }
            } else if (dir == direction.LEFT &&
                ((self.squares[3].j - 1 >= 0 && (self.state == "left" || self.state == "right" || self.state == "up")) ||
                    (self.squares[0].j - 1 >= 0 && self.state == "down")) && !self.checkCollisionLeft(grid)) {
                for (var k = 0; k < self.squares.length; k++) {
                    self.squares[k].j--;
                }
            } else if (dir == direction.RIGHT && self.squares[2].j + 1 <= 13 && !self.checkCollisionRight(grid)) {
                for (var k = 0; k < self.squares.length; k++) {
                    self.squares[k].j++;
                }
            } else if (dir == direction.DOWN && !self.checkCollisionNormal(grid)) {
                self.bottomPosition(grid);
            }

            // S'il n'y a aucune collision on rafraichit  la vue
            for (var k = 0; k < self.squares.length; k++) {
                grid[oldsquares[k].i][oldsquares[k].j] = false;
                grid[self.squares[k].i][self.squares[k].j] = true;
            }
            self.drawSquare();
        } else {
            for (var i = 0; i < oldsquares.length; i++) {
                self.squares[i] = oldsquares[i];
            }
            self.stop = true;
        }
    };

    // vérifie la collision sur la lignes suivante
    this.checkCollisionNormal = function (grid) {

        var collision = false;
        if (self.state == "down") {

            if (self.squares[0].i + 1 <= 19 && self.squares[2].i + 1 <= 19 && self.squares[3].i + 1 <= 19 &&
                (grid[self.squares[0].i + 1][self.squares[0].j] == true ||
                    grid[self.squares[2].i + 1][self.squares[2].j] == true ||
                    grid[self.squares[3].i + 1][self.squares[3].j] == true)) {
                collision = true;
            }
        } else if (self.state == "right") {

            if (self.squares[2].i + 1 <= 19 && self.squares[3].i + 1 <= 19 &&
                (grid[self.squares[2].i + 1][self.squares[2].j] == true ||
                    grid[self.squares[3].i + 1][self.squares[3].j] == true)) {
                collision = true;
            }
        } else if (self.state == "up") {

            if (self.squares[1].i + 1 <= 19 && self.squares[2].i + 1 <= 19 && self.squares[3].i + 1 <= 19 &&
                (grid[self.squares[1].i + 1][self.squares[1].j] == true ||
                    grid[self.squares[2].i + 1][self.squares[2].j] == true ||
                    grid[self.squares[3].i + 1][self.squares[3].j] == true)) {
                collision = true;
            }
        } else if (self.state == "left") {

            if (self.squares[2].i + 1 <= 19 && self.squares[3].i + 1 <= 19 &&
                (grid[self.squares[2].i + 1][self.squares[2].j] == true ||
                    grid[self.squares[3].i + 1][self.squares[3].j] == true)) {
                collision = true;
            }
        }
        return collision;
    };

    // vérifie la collision sur la colonne de gauche
    this.checkCollisionLeft = function (grid) {
        var collision = false;
        if (self.state == "down") {
            if (self.squares[0].j - 1 >= 0 && self.squares[3].j - 1 >= 0 &&
                (grid[self.squares[0].i][self.squares[0].j - 1] == true ||
                    grid[self.squares[3].i][self.squares[3].j - 1] == true)) {
                collision = true;
            }
        } else if (self.state == "right") {

            if (self.squares[0].j - 1 >= 0 && self.squares[1].j - 1 >= 0 && self.squares[3].j - 1 >= 0 &&
                grid[self.squares[0].i][self.squares[0].j - 1] == true || (
                    grid[self.squares[1].i][self.squares[1].j - 1] == true ||
                    grid[self.squares[3].i][self.squares[3].j - 1] == true)) {
                collision = true;
            }
        } else if (self.state == "up") {

            if (self.squares[0].j - 1 >= 0 && self.squares[3].j - 1 >= 0 &&
                (grid[self.squares[0].i][self.squares[0].j - 1] == true ||
                    grid[self.squares[3].i][self.squares[3].j - 1] == true)) {
                collision = true;
            }
        } else if (self.state == "left") {

            if (self.squares[0].j - 1 >= 0 && self.squares[2].j - 1 >= 0 && self.squares[3].j - 1 >= 0 &&
                (grid[self.squares[0].i][self.squares[0].j - 1] == true ||
                    grid[self.squares[2].i][self.squares[2].j - 1] == true ||
                    grid[self.squares[3].i][self.squares[3].j - 1] == true)) {
                collision = true;
            }
        }
        return collision;
    };

    // vérifie la collision sur la colonne de droite
    this.checkCollisionRight = function (grid) {

        var collision = false;
        if (self.state == "down") {
            if (self.squares[2].j + 1 <= 13 && self.squares[3].j + 1 <= 13 &&
                (grid[self.squares[2].i][self.squares[2].j + 1] == true ||
                    grid[self.squares[3].i][self.squares[3].j + 1] == true)) {
                collision = true;
            }
        } else if (self.state == "right") {
            if (self.squares[0].j + 1 <= 13 && self.squares[2].j + 1 <= 13 && self.squares[3].j + 1 <= 13 &&
                (grid[self.squares[0].i][self.squares[0].j + 1] == true ||
                    grid[self.squares[2].i][self.squares[2].j + 1] == true ||
                    grid[self.squares[3].i][self.squares[3].j + 1] == true)) {
                collision = true;
            }
        } else if (self.state == "up") {
            if (self.squares[0].j + 1 <= 13 && self.squares[2].j + 1 <= 13 &&
                (grid[self.squares[0].i][self.squares[0].j + 1] == true ||
                    grid[self.squares[2].i][self.squares[2].j + 1] == true)) {
                collision = true;
            }
        } else if (self.state == "left") {
            if (self.squares[0].j + 1 <= 13 && self.squares[1].j + 1 <= 13 && self.squares[2].j + 1 <= 13 &&
                (grid[self.squares[0].i][self.squares[0].j + 1] == true ||
                    grid[self.squares[1].i][self.squares[1].j + 1] == true ||
                    grid[self.squares[2].i][self.squares[2].j + 1] == true)) {
                collision = true;
            }
        }
        return collision;
    };

    // vérifie si c'est game over
    this.isOver = function (grid) {
        var isOver = false;

        if (self.state == "down") {
            for (var k = 0; k < grid[1].length; k++) {
                if ((grid[1][k] == true && (self.squares[0].j == k || self.squares[2].j == k)) ||
                    (grid[2][k] == true && self.squares[3].j == k)) {
                    isOver = true;

                }
            }
        } else if (self.state == "right") {
            for (var k = 0; k < grid[2].length; k++) {
                if ((grid[2][k] == true && (self.squares[2].j == k)) ||
                    (grid[3][k] == true && self.squares[3].j == k)) {
                    isOver = true;

                }
            }
        } else if (self.state == "up") {
            for (var k = 0; k < grid[2].length; k++) {
                if (grid[2][k] == true && (self.squares[1].j == k || self.squares[2].j == k || self.squares[3].j == k)) {
                    isOver = true;

                }
            }
        } else if (self.state == "left") {
            for (var k = 0; k < grid[2].length; k++) {
                if ((grid[2][k] == true && (self.squares[3].j == k)) ||
                    (grid[3][k] == true && self.squares[2].j == k)) {
                    isOver = true;

                }
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