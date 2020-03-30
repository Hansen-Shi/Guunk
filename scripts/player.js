var Player = function(){
    var self = this;
    this.locX = 0;
    this.locY = 0;
    this.velocX = 0;
    this.velocY = 0;
    this.jumpCnt = 0;
    this.canJump = true;
    this.width = 50;
    this.height = 50;
    //this is my current hacky way to introduce this block jumping collision detection
    //im assuming in the future we can concurrently send this array and only send the ones that are on the screen to the player
    //something along those lines. This will have many blocks coordinates in it

    //array of everything that can create collision with the player
    let blockLocations = [[225,400,60]]; // { {X, Y, Width}, {X, Y, Width}, ...}

    this.initilize=function(){
        this.locX = 100;
        this.locY = 525;
        this.velocX = 0;
        this.velocY = 0;
    }


    this.collidingFromSide = function(){
        for(let i = 0; i < blockLocations.length; i++) {
            //when colliding with something left/right we first check if the players position is > or < the blocks position
            const blockX = blockLocations[i][0];
            const blockY = blockLocations[i][1];
            const blockWidth = blockLocations[i][2];
            // console.log(blockX);
            // console.log(blockWidth);
            //
            // console.log(this.locX);
            // console.log(this.velocX);


            //we first check if the bottom of the player is below the top of the block, and above the bottom of block
            //and then we check if the top of the player is above the bottom of the block, and below the top of the block
            if ( (this.locY + this.height > blockY+3) //bottom of player is below top of block
                && (this.locY < blockY + blockWidth)) { //top of player is above bottom of block

                //AY IF YOU START USING THINGS THAT AREN'T SQUARES, DON'T FORGET TO PUT THE HEIGHT HERE AND NOT THE WIDTH, IDIOT TODO

                // console.log("inside up down");
                if (this.locX > blockX + blockWidth) {
                    //we are to the right of this block

                    //check if we will collide next frame
                    if (this.locX + this.velocX < blockX + blockWidth) {
                        console.log("CUTTTHROAT");
                        console.log(this.velocX);
                        return (blockX+blockWidth);
                    }


                } else if (this.locX + this.width < blockX){
                    //we are to the left of this block

                    // console.log("VVVVVVVVVVVVVVVV");
                    // console.log(document.getElementById("slime").offsetHeight);
                    //check if we will collide next frame
                    if (this.locX + this.width + this.velocX > blockX) {
                        console.log("IF YOU SEE THIS YOU FUCKED");
                        return (blockX - this.width);


                        /*this.velocX=0;

                        //move the player so that his right is touching the blocks left
                        this.locX = blockX - 50;*/
                    }

                }

            }
        }
        return(-1);
    }

    this.collidingWithBlockFromTop = function(){
        // console.log("colliding with block from top is called");
        //we are colliding from the top if our halfway point is inside the bounds of x and x+ width, and our locY + our VelY + our height > block Y
        for(let i = 0; i < blockLocations.length; i++){
            //if we are currently on the way up, keep going.
            const blockX = blockLocations[i][0];
            const blockY = blockLocations[i][1];
            const blockWidth = blockLocations[i][2];
            if(this.velocY < 0){
                //TODO: check for upwards bonk

                //this if says we are in the left/right of the block so we can BONK
                if( (this.locX + this.width) > blockX  &&  this.locX < (blockX + blockWidth)){
                    //to know if we are going to bonk with a block we need to check if the top of our character is above the bottom of the block,and the bottom is below the top of the block,
                    if((this.locY + this.velocY) < (blockY+blockWidth) && (this.locY + this.height) > blockY){
                        this.velocY = 1.5;
                        this.locY = blockWidth + blockY;
                    }
                }

                return -1;
            }
            // console.log("for loop iteration")

            // const halfway = this.locX + this.width/2;
            //checking if our halfway point is inside the bounds of x and x+width

            //instead we will check if our right is to the right of the left part of the block, and if our left is to the left of the right part of the block
            if( (this.locX + this.width) > blockX  &&  this.locX < (blockX + blockWidth)){
                //checking if our Y posn + our Y vel + our height is > blockY
                console.log("inside left and right");
                if((this.locY+this.velocY + this.height) >= blockY && this.locY < blockY){
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
         //TODO: check sideways shit
         const XCoordOfBlockThatWeAreCollidingWith = this.collidingFromSide();
         if(XCoordOfBlockThatWeAreCollidingWith !== -1){
             this.locX=XCoordOfBlockThatWeAreCollidingWith;
             this.velocX=0;
         }else {
             this.locX += this.velocX;
         }
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
            this.locY = x - this.height; //to be fucking honest I'm clearly not paying enough attention because I have no fucking idea why 72 is the magic number.. it should be 50..?? or 100? the height? or the height/2?
            this.jumpCnt = 0;
        }


        console.log(this.canJump);
    };
    
    this.initilize()
    console.log("proper player");

}
