function TetriminosO(briqueX, briqueY, ctx, direction, canvas) {
    "use strict";
    var pos = new Point(250, 0);
    this.posX = pos.x;
    this.posY = pos.y;
    var dir = null;

    document.onkeydown = function (e) {
        switch (e.keyCode) {
        case 37:
            dir = direction.LEFT;
            break;
        case 39:
            dir = direction.RIGHT;
            break;
        case 40:
            dir = direction.DOWN;
            break;
        case 38:
            dir = direction.UP;
            break;
        }
    };
    this.setXY = function (x, y) {
        this.posX = x;
        this.posY = y;
        console.log(x);
        console.log(this.posY);
    }
    this.getX = function () {
        return this.posX;
    }
    this.getY = function () {
        return this.posY;
    }
    this.animateSquare = function () {
        ctx.clearRect(100, 0, canvas.width - 100, canvas.height);
        ctx.strokeRect(this.getX(), this.getY(), 50, 50);
        if (dir == direction.LEFT && briqueX > 100 && briqueY < 450) {
            briqueX -= 25;
        } else if (dir == direction.RIGHT && briqueX < 400 && briqueY < 450) {
            briqueX += 25;
        } else if (dir == direction.DOWN && briqueY < 425) {
            briqueY += 50;
        }

        if (briqueY < 450) {
            briqueY += 25;
        }
        this.setXY(briqueX, briqueY);
    }

}