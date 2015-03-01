function TetriminosO(ctx, direction, canvas) {
    "use strict";
    // var pos = new Point(250, 0);
    this.posX = 250;
    this.posY = 0;
    var self = this


    this.setXY = function (x, y) {
        this.posX = x;
        this.posY = y;
    };

    this.getX = function () {
        return this.posX;
    };

    this.getY = function () {
        return this.posY;
    };
    this.drawSquare = function () {
        ctx.strokeRect(self.posX, self.posY, 50, 50);
    }

    this.animateSquare = function (dir) {
        ctx.clearRect(100, 0, canvas.width - 100, canvas.height);
        self.drawSquare();
        if (dir == direction.LEFT && self.posX > 100 && self.posY < 450) {
            self.posX -= 25;
        } else if (dir == direction.RIGHT && self.posX < 400 && self.posY < 450) {
            self.posX += 25;
        } else if (dir == direction.DOWN && self.posY < 425) {
            self.posY += 50;
        }

        if (self.posY < 450) {
            self.posY += 25;
        }
    };

}