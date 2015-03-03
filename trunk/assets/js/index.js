// Déclaration des variables utiles
var canvas = null;
var ctx = null;
var direction = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2,
    UP: 3
};
//var briqueX = 250,
//    briqueY = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    "use strict";
    canvas = document.getElementById('cnv1');
    ctx = canvas.getContext('2d');
    var heightCnv = canvas.height,
        widthCnv = canvas.width,
        piece = null,
        dir = null;
    var bool = false;
    // on cree le tableau des lignes
    var grid = [];

    // on cree les tableaux qui contiennent les colonnes de chaque ligne	
    for (var i = 0; i < 20; i++)
        grid[i] = [];

    // On initialise chaque case de la grille à false puisque au début, elle est vide
    for (var i = 0; i < 20; i++)
        for (var j = 0; j < 14; j++)
            grid[i][j] = false;

    function randomType() {
        var rnd = Math.floor((Math.random() * 2) + 1);
        switch (rnd) {
        case 1:
            piece = new TetriminosI(ctx, direction, canvas);
            break;
        case 2:
            piece = new TetriminosO(ctx, direction, canvas)
            break;

        }
    }
    randomType();
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


    // Mettre les cases de la brique à true
    for (var k = 0; k < piece.squares.length; k++) {
        grid[piece.squares[k].i][piece.squares[k].j] = true;
    }

    var myVar = setInterval(function () {

            piece.animateSquare(dir, grid);
            // dans le cas ou la brique a était déposée, on annule le déplacement
            if (piece.stop) {
                randomType();
                // piece = new TetriminosI(ctx, direction, canvas);
                for (var k = 0; k < piece.squares.length; k++) {
                    grid[piece.squares[k].i][piece.squares[k].j] = true;
                }
                if (piece.isOver(grid)) {
                    piece.drawSquare(); // pas bon !!!!!!!!!!!
                    console.log('gameover');
                    clearInterval(myVar);

                }

            }

            dir = null;


        },
        200);
});