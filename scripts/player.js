var Player = function(){
    var self = this;
    this.paddingLeftRight = 10;
    this.locX = 100;
    this.locY = 525;
    this.velocX = 0;
    this.velocY = 0;
    this.jumpCnt = 0;
    this.canJump = true;
    this.width = 50;
    this.height = 50;
    this.hoverCounter = 0;
    //this is my current hacky way to introduce this block jumping collision detection
    //im assuming in the future we can concurrently send this array and only send the ones that are on the screen to the player
    //something along those lines. This will have many blocks coordinates in it

    //array of everything that can create collision with the player
    let blockLocations = [[225,400,60,60],[320,450,180,60] ] // { {X, Y, Width, Height}, {X, Y, Width, Height}, ...}
    //testing something again

    //these are the permissions you have to unlock
    this.leftAllow = true;
    this.rightAllow = true;
    this.jumpAllow = true;
    this.doubleJumpAllow = true;
    this.spitAllow = true;
    this.hoverAllow = true;


    this.collidingFromSide = function(){
        for(let i = 0; i < blockLocations.length; i++) {
            //when colliding with something left/right we first check if the players position is > or < the blocks position

            const blockX = blockLocations[i][0];
            const blockY = blockLocations[i][1];
            const blockWidth = blockLocations[i][2];
            const blockHeight = blockLocations[i][3];

            // console.log(blockX);
            // console.log(blockWidth);

            // console.log(this.locX);
            // console.log(this.velocX);



            //we first check if the bottom of the player is below the top of the block, and above the bottom of block
            //and then we check if the top of the player is above the bottom of the block, and below the top of the block
            if ( (this.locY + this.height > blockY+3) //bottom of player is below top of block
                && (this.locY < blockY + blockHeight)) { //top of player is above bottom of block

                if (this.locX > blockX + blockWidth) {
                    //we are to the right of this block

                    //check if we will collide next frame
                    if (this.locX + this.velocX < blockX + blockWidth) {
                        //console.log("CUTTTHROAT");
                        //console.log(this.velocX);
                        return (blockX+blockWidth);
                    }


                } else if (this.locX + this.width < blockX){
                    //we are to the left of this block

                    // console.log("VVVVVVVVVVVVVVVV");
                    // console.log(document.getElementById("slime").offsetHeight);
                    //check if we will collide next frame
                    if (this.locX + this.width + this.velocX > blockX) {
                        //console.log("IF YOU SEE THIS YOU FUCKED");
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
            if(i === 1)
                console.log("I == 1: ", blockLocations[i][0]);
            const blockX = blockLocations[i][0];
            const blockY = blockLocations[i][1];
            const blockWidth = blockLocations[i][2];
            const blockHeight = blockLocations[i][3];

            if(this.velocY < 0){
                //this if says we are in the left/right of the block so we can BONK
                if( (this.locX + this.width - this.paddingLeftRight) > blockX  &&  (this.locX+this.paddingLeftRight) < (blockX + blockWidth)){
                    //to know if we are going to bonk with a block we need to check if the top of our character is above the bottom of the block,and the bottom is below the top of the block,
                    if((this.locY + this.velocY) < (blockY+blockHeight) && (this.locY + this.height) > blockY){
                        this.velocY = 1.5;
                        this.locY = blockHeight + blockY;
                    }
                }

                // HAHAHAHAH WE'RE USING CONTINUE
                continue;
            }
            // console.log("for loop iteration")

            // const halfway = this.locX + this.width/2;
            //checking if our halfway point is inside the bounds of x and x+width

            //we will check if our right is to the right of the left part of the block, and if our left is to the left of the right part of the block
            if((this.locX + this.width - this.paddingLeftRight) > blockX  &&  (this.locX+this.paddingLeftRight) < (blockX + blockWidth)){
                //checking if our Y posn + our Y vel + our height is > blockY
                //console.log("inside left and right");
                if((this.locY+this.velocY + this.height) >= blockY && this.locY < blockY){
                    return(blockY);
                }
            }

        }
        return(-1);
    }

    this.update = function(keys){
        if (keys.left && this.leftAllow){
            $('#slime').css('-transform', 'scaleX(1)');
            if(this.velocX > -6){
                this.velocX -= .5;
            }
            
        }
         if (keys.right && this.rightAllow){
            $('#slime').css('-transform', 'scaleX(-1)');
            if(this.velocX < 6){
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
        
        if(keys.up && this.jumpAllow){
            if(this.canJump == true && this.jumpCnt < 2){
                if(this.jumpCnt == 1 && !this.doubleJumpAllow){}
                else{
                    this.velocY = -17;
                    this.jumpCnt += 1;
                    this.canJump = false;
                    this.locY += this.velocY;
                }
            }
        }
        if(keys.up == false){
            this.canJump = true;
        }

        //here is where we check for collision with blocks that we can land on.
        const x = this.collidingWithBlockFromTop();
        //we are not colliding with a block we can stand on, so we now move on to ground checking.
        if(x === -1){
            this.locY += this.velocY;

            if(this.velocY == 0){
                this.hoverCounter = 0;
            }

            if(this.locY >= 525){
                this.locY = 525;
                this.velocY = 0;
                this.jumpCnt = 0;
            } else{
                if(keys.space && this.hoverAllow && this.velocY > 0 && this.hoverCounter < 50){
                    this.velocY = 1;
                    this.hoverCounter += 1;
                }
                else{
                    this.velocY = this.velocY + .8;
                }
            }

        }else{
            //otherwise, our next position is going to collide with the block, so place ourselves ontop of it.
            this.velocY = 0;
            this.locY = x - this.height; //to be fucking honest I'm clearly not paying enough attention because I have no fucking idea why 72 is the magic number.. it should be 50..?? or 100? the height? or the height/2?
            this.jumpCnt = 0;
        }


        //console.log(this.canJump);
    }; //end update
    
    console.log("proper player");

}
