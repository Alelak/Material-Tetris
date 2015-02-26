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
    var dir = null;
    var widthCnv = canvas.width;
    init();

    // On teste les touches du clavier
    document.onkeydown = function (e) {
        // 
        switch (e.keyCode) {
	        case 37:
	            dir = direction.LEFT;
	           // animate();
	            break;
	        case 39:
	            dir = direction.RIGHT;
	           // animate();
	            break;
	        case 40:
	            dir = direction.DOWN;
	            //animate();
	            break;
	        case 38:
	        dir = direction.UP;
	        //animate();
	        break;
        }
    };

    // On bouge la brique carré
    function moveSquare() {

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

    // On dessine la brique carré
    function drawSquare() {
        ctx.strokeRect(briqueX, briqueY, 50, 50);
    }

    
    // On dessine la brique carré
    function drawT() 
    {	
        ctx.strokeRect(briqueX, briqueY, 75, 25); 
        ctx.strokeRect(briqueX+25, briqueY+25, 25, 25);
    }
    
    // On bouge la brique carré
	function moveT() {
		
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
	
	// On bouge la brique carré
	function rotateT() {
        ctx.rotate(90*Math.PI/180);  	
        dir = null; // On annule la direction tant qu'on appuye sur aucune touche directionnelle
	}

    // On anime la brique
    function animateSquare(){
        ctx.clearRect(100, 0, canvas.width - 100, canvas.height);

        //Tracé de la brique carré
        moveSquare();
        drawSquare();
    }
    
    // On anime la brique
    function animateT(){
        ctx.clearRect(100, 0, canvas.width - 100, canvas.height);

        //Tracé de la brique T
        if(dir == direction.UP)
        {
        	//rotateT();
        	drawT();
        	console.log("up");
        }
        	
        moveT();
        drawT();
    }

    // initialisation du canvas
    function init() {
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, heightCnv);
        ctx.stroke();
        //drawSquare();
        drawT();
    }

    //setInterval(animateSquare, 200);
    setInterval(animateT, 200);

});