// Déclaration des variables utiles
var canvas = null;
var ctx = null;
var direction = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2
};
var briqueX = 250,
    briqueY = 0;

document.addEventListener("DOMContentLoaded", function (event) 
{
    canvas = document.getElementById('cnv1');
    ctx = canvas.getContext('2d');
    var heightCnv = canvas.height;
    var dir = null;
    var widthCnv = canvas.width;
    init();
    
    // On teste les touches du clavier
    document.onkeydown = function (e) 
    {
    	// 
        switch (e.keyCode) 
        {
	        case 37:
	            dir = direction.LEFT;
	            animate();
	            break;
	        case 39:
	            dir = direction.RIGHT;
	            animate();
	            break;
	        case 40:
	            dir = direction.DOWN;
	            animate();
	            break;
        }
    };
    
    // On bouge la brique carré
	function MoveSquare() {
		
            if (dir == direction.LEFT && briqueX > 100 && briqueY<450) 
            {
                briqueX -= 25;
            } 
            else if (dir == direction.RIGHT && briqueX < 400 && briqueY<450) 
            {
                briqueX += 25;
            } 
            else if (dir == direction.DOWN && briqueY < 425) // augmente la vitesse s'il tape down
            { 
                briqueY += 50;
            }
           
            if (briqueY < 450) 
        	{
            	briqueY += 25;
        	}
        dir = null; // On annule la direction tant qu'on appuye sur aucune touche directionnelle
	}
	
	// On dessine la brique carré
    function drawSquare() {
        ctx.strokeRect(briqueX, briqueY, 50, 50); 
    }
	
	// On anime la brique
    function animate() {
        ctx.clearRect(100, 0, canvas.width - 100, canvas.height);

        //Tracé de la brique
        MoveSquare();
        drawSquare();
    }
    
    // initialisation du canvas
    function init() {
       	ctx.beginPath();
    	ctx.moveTo(100, 0);
    	ctx.lineTo(100, heightCnv);
    	ctx.stroke();
   		drawSquare();
    }

    setInterval(animate, 200);

});