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
        tab = [],
        i = 0,
        dir = null;
    for (i = 0; i < 10; i += 1) {
        tab.push(new TetriminosO(ctx, direction, canvas));
    }


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

    function init() {
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, heightCnv);
        ctx.stroke();
    }
    init();
    var j = 0;
    var arr = [];
    setInterval(function () {
        tab[j].animateSquare(dir);



        if (j != tab.length && tab[j].posY == 450) {
            arr.push(tab[j]);
            j++;

        }
        for (var i = 0; i < arr.length; i++) {

            arr[i].drawSquare();
        }
    }, 200)
});