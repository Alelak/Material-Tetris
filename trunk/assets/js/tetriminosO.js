function TetriminosO(ctx, direction, canvas) {
    "use strict";
    
    var self = this;
    this.squares = new Array();
    var square0 = new Square(0,6);
    var square1 = new Square(0,7);
    var square2 = new Square(1,6);
    var square3 = new Square(1,7);
    
	squares.push(square0);
	squares.push(square1);
	squares.push(square2);
	squares.push(square3);

	console.log("ici");
    /*this.setXY = function (x, y) {
        this.posX = x;
        this.posY = y;
    };

    this.getX = function () {
        return this.posX;
    };

    this.getY = function () {
        return this.posY;
    };*/
    this.drawSquare = function () {
    	for(var k=0; k<self.squares.length;k++)
    	{
    		ctx.strokeRect((self.squares[k].i*25)+100, self.squares[k].j*25, 25, 25);
    	}
    };

    this.animateSquare = function (dir,grid) {
    	for(var k=0; k<self.squares.length;k++)
    	{
    		ctx.clearRect((self.squares[k].i*25)+100, self.squares[k].j*25, 25, 25);
    	}
    	
    	// On déplace la brique
        if (dir == direction.LEFT) {
        	for(var k=0; k<self.squares.length;k++)
        	{
        		self.squares[k].i--;
        	}
        } else if (dir == direction.RIGHT) {
            for(var k=0; k<self.squares.length;k++)
        	{
        		self.squares[k].i++;
        	}
        } /*else if (dir == direction.DOWN && tab[a].posY < 425) {
            tab[a].posY += 50;
        }*/
		for(var k=0; k<self.squares.length;k++)
    	{
    		self.squares[k].j++;
    	}
    	
    	// S'il n'y a aucune collision on rafraichit  la vue
        if(!self.checkCollision(grid))
        	self.drawSquare();
        
    };
    
    this.checkCollision = function (grid) {
    	var collision = false;
    	for(var k =0; k<squares.length;k++)
    	{
    		for(var l=0; l<squares[k].length;l++)
    		{
    			if(grid[squares[k][l]]==true)
    				collision = true;
    		}
    	}

    	return collision;
    };
    
    

}