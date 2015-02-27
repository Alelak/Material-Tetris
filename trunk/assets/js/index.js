// Déclaration des variables utiles
var canvas = null;
var ctx = null;
var direction = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2,
    UP: 3
};
var briqueX = 250,
    briqueY = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    canvas = document.getElementById('cnv1');
    ctx = canvas.getContext('2d');
    var heightCnv = canvas.height;
    var widthCnv = canvas.width;
    var test = new TetriminosO(briqueX, briqueY, ctx, direction, canvas);
    init();

    function init() {
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, heightCnv);
        ctx.stroke();
    }
    test.setXY(250, 10);
    test.animateSquare();
});