var canvas = null;
var ctx = null;
var direction = {
	LEFT  : 0,
	RIGHT : 1
};

var briqueX = 250,
	briqueY = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    canvas = document.getElementById('cnv1');
    ctx = canvas.getContext('2d');
    var heightCnv = canvas.height;

    var widthCnv = canvas.width;
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, heightCnv);
    ctx.stroke();
    
    //drawSquare(ctx,null);
    
    
    function drawSquare(dir) {
	    ctx.strokeRect(briqueX,briqueY,50,50);
	   // console.log(direction.LEFT);
	    if(dir == direction.LEFT && briqueX>100)
	    {
	    	briqueX-=25;	
	    	console.log(direction.LEFT);
	    }
				
		else if(dir == direction.RIGHT && briqueX+25< 400)
		{
			console.log(direction.RIGHT);
			briqueX+=25;
		}
				
		
		if(briqueY<450)
		{
			
			briqueY+=25;
		}
		
	}


	function animate()
	{
	    ctx.clearRect(100, 0, canvas.width-100, canvas.height);
	    
	    //Tracé de la brique
	    drawSquare(ctx,null);
	}

	setInterval(animate, 500);
    
});


