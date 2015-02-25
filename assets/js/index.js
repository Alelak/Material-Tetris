var canvas = null;
var ctx = null;
var direction = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2
};

var briqueX = 250,
    briqueY = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    canvas = document.getElementById('cnv1');
    ctx = canvas.getContext('2d');
    var heightCnv = canvas.height;
    var dir = null;
    var widthCnv = canvas.width;
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, heightCnv);
    ctx.stroke();
    // je teste les touche
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
        }
    };

    function drawSquare() {
        ctx.strokeRect(briqueX, briqueY, 50, 50);
        if (briqueY < 450) {
            if (dir == direction.LEFT && briqueX > 100) {
                briqueX -= 25;
                briqueY -= 25;

            } else if (dir == direction.RIGHT && briqueX < 400) {
                briqueX += 25;
                briqueY -= 25;
            } else if (dir == direction.DOWN) { // augmente la vitesse si il tape down
                briqueY += 50;
            }
            briqueY += 25;

        }
    }

    function animate() {
        ctx.clearRect(100, 0, canvas.width - 100, canvas.height);

        //Tracé de la brique
        drawSquare();
    }

    setInterval(animate, 200);

});