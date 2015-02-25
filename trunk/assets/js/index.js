var canvas = null;
var ctx = null;

document.addEventListener("DOMContentLoaded", function (event) {
    canvas = document.getElementById('cnv1')
    ctx = canvas.getContext('2d');
    var heightCnv = canvas.height;

    var widthCnv = canvas.width;
    ctx.beginPath();
    ctx.moveTo(widthCnv / 4, 0);
    ctx.lineTo(widthCnv / 4, heightCnv);
    ctx.stroke();

});