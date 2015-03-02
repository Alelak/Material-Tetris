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
        piece = new TetriminosO(ctx, direction, canvas),
        dir = null;
	var bool = false;
    // on cree le tableau des lignes
	var grid = new Array();
	
	// on cree les tableaux qui contiennent les colonnes de chaque ligne	
	for(var i=0; i<20; i++)
	   grid[i] = new Array();
	
	// On initialise chaque case de la grille à false puisque au début, elle est vide
	for(var i=0; i<20; i++)
	   for(var j=0; j<14; j++)
	      grid[i][j] = false;


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

    /*function init() {
        ctx.beginPath();
        ctx.moveTo(98, 0);
        ctx.lineWidth = 0.5;
        ctx.lineTo(100, heightCnv);
        ctx.stroke();
       
    }*/
    
    //init();
    
    // Mettre les cases de la brique à true
	for(var k=0; k<piece.squares.length;k++)
	{
		grid[piece.squares[k].i][piece.squares[k].j] = true;
	}
   
    var myVar = setInterval(function () {
		
		piece.animateSquare(dir,grid);
        // dans le cas ou la brique a était déposée, on annule le déplacement
        
        /*if (dir == direction.DOWN) {
        	console.log("blabla");
            clearInterval(myVar);
        }*/
       
       if(piece.squares[3].i == 19)
       {
       		piece = new TetriminosO(ctx, direction, canvas);
       		for(var k=0; k<piece.squares.length;k++)
			{
				grid[piece.squares[k].i][piece.squares[k].j] = true;
			}
       }
       	
        
        //init();     
        dir = null;

    }, 200);
    
    
    
    /*if(piece.squares[3].i>17)
    			clearInterval(myVar);*/
    
    
});