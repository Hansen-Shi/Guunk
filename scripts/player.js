var Player = function(){
    var self = this;
    this.locX = 0;
    this.locY = 0;
    this.velocX = 0;
    this.velocY = 0;
    this.jumpCnt = 0;
    this.canJump = true;

    //this is my current hacky way to introduce this block jumping collision detection
    //im assuming in the future we can concurrently send this array and only send the ones that are on the screen to the player
    //something along those lines. This will have many blocks coordinates in it
    let blockLocations = [[225,400,60]]; // { {X, Y, Width}, {X, Y, Width}, ...}

    this.initilize=function(){
        this.locX = 100;
        this.locY = 525;
        this.velocX = 0;
        this.velocY = 0;
        this.width = 100;
    }

    this.collidingWithBlockFromTop = function(){
        // console.log("colliding with block from top is called");
        //we are colliding from the top if our halfway point is inside the bounds of x and x+ width, and our locY + our VelY + our height > block Y
        for(let i = 0; i < blockLocations.length; i++){
            //if we are currently on the way up, keep going.
            if(this.velocY < 0){
                return -1;
            }
            // console.log("for loop iteration")
            const blockX = blockLocations[i][0];
            const blockY = blockLocations[i][1];
            const blockWidth = blockLocations[i][2];
            const halfway = this.locX + 50;
            //checking if our halfway point is inside the bounds of x and x+width
            if((halfway > blockX) && (halfway < blockX+blockWidth)){
                //checking if our Y posn + our Y vel + our height is > blockY
                console.log("inside left and right");
                if((this.locY+this.velocY + 100) >= blockY && this.locY < blockY){
                    return(blockY);
                }
            }
        }
        return(-1);
    }

    this.update = function(keys){
        if (keys.left){
            $('#slime').css('-transform', 'scaleX(1)');
            if(this.velocX > -5){
                this.velocX -= .5;
            }
            
        }
         if (keys.right){
            $('#slime').css('-transform', 'scaleX(-1)');
            if(this.velocX < 5){
                this.velocX += .5;
            }
            
        }
        this.locX+=this.velocX;
        if(this.velocX > 0){
            if(this.velocX - .2 < 0){
                this.velocX = 0;
            }
            else{
            this.velocX -=.2;
            }
        }
        if(this.velocX < 0){
            if(this.velocX + .2 > 0){
                this.velocX = 0;
            }
            else{
            this.velocX +=.2;
            }
        }
        
        if(keys.up){
            if(this.canJump == true && this.jumpCnt < 2){
                this.velocY = -20;
                this.jumpCnt += 1;
                this.canJump = false;
                this.locY += this.velocY;
            }
        }
        if(keys.up == false){
            this.canJump = true;
        }

        //here is where we check for collision with blocks that we can land on.
        //I recommend only doing collisions on the top of walkable environments.
        //(if you are standing directly below, you can jump up, and get stopped on the way down, but not on the way up.)
        const x = this.collidingWithBlockFromTop();
        //we are not colliding with a block we can stand on, so we now move on to ground checking.
        if(x === -1){
            this.locY += this.velocY;

            if(this.locY >= 525){
                this.locY = 525;
                this.velocY = 0;
                this.jumpCnt = 0;
            } else{
                this.velocY = this.velocY + .8;
            }

        }else{
            //otherwise, our next position is going to collide with the block, so place ourselves ontop of it.
            this.velocY = 0;
            this.locY = x - 72; //to be fucking honest I'm clearly not paying enough attention because I have no fucking idea why 72 is the magic number.. it should be 50..?? or 100? the height? or the height/2?
            this.jumpCnt = 0;
        }






        
        console.log(this.canJump);
    };

    
    this.initilize()
    console.log("proper player");




}
