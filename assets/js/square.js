function Square(Point, Dim) {
    "use strict";
    // On dessine la brique carré
    var drawSquare = function () {
            ctx.strokeRect(briqueX, briqueY, 50, 50);
        }
        // On bouge la brique carré
    var moveSquare = function () {
            if (dir == direction.LEFT && briqueX > 100 && briqueY < 450) {
                briqueX -= 25;
            } else if (dir == direction.RIGHT && briqueX < 400 && briqueY < 450) {
                briqueX += 25;
            } else if (dir == direction.DOWN && briqueY < 425) // augmente la vitesse s'il tape down
            {
                briqueY += 50;
            }

            if (briqueY < 450) {
                briqueY += 25;
            }
            dir = null; // On annule la direction tant qu'on appuye sur aucune touche directionnelle
        }
        // On anime la brique
    var animateSquare = function () {
            ctx.clearRect(100, 0, canvas.width - 100, canvas.height);

            //Tracé de la brique carré
            moveSquare();
            drawSquare();
        }
        // initialisation du canvas
    function init() {
        drawSquare();
    }


}