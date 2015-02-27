function TetriminosT(briqueX, briqueY, ctx, dir, direction, canvas) {
    'use strict';
    // On dessine la brique carré

    this.drawT = function () {
        ctx.strokeRect(briqueX, briqueY, 75, 25);
        ctx.strokeRect(briqueX + 25, briqueY + 25, 25, 25);
    }

    // On bouge la brique carré
    this.moveT = function () {

            if (dir == direction.LEFT && briqueX > 100 && briqueY < 450) {
                briqueX -= 25;
            } else if (dir == direction.RIGHT && briqueX < 375 && briqueY < 450) {
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
        // On bouge la brique carré
    this.rotateT = function () {
            ctx.rotate(90 * Math.PI / 180);
            dir = null; // On annule la direction tant qu'on appuye sur aucune touche directionnelle
        }
        // On anime la brique
    this.animateT = function () {
        ctx.clearRect(100, 0, canvas.width - 100, canvas.height);

        //Tracé de la brique T
        if (dir == direction.UP) {
            //rotateT();
            this.drawT();
        }

        this.moveT();
        this.drawT();
        if (briqueY == 450) {
            briqueX = 250;
            briqueY = 0;
            this.moveT();
            this.drawT();
        }
    }
    this.init = function () {
        this.drawT();
    }
}