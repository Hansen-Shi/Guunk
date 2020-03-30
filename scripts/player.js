var Player = function(){
    var self = this;
    this.locX = 0;
    this.locY = 0;
    this.velocX = 0;
    this.velocY = 0;
    this.jumpCnt = 0;
    this.canJump = true;

    this.initilize=function(){
        this.locX = 100;
        this.locY = 525;
        this.velocX = 0;
        this.velocY = 0;
    }

    this.update = function(keys){
        if (keys.left){
            $('#slime').css('-transform', 'scaleX(1)');
            if(this.velocX > -5){
                this.velocX -= 2;
            }
            this.locX+=this.velocX;
        }

        if (keys.right){
            $('#slime').css('-transform', 'scaleX(-1)');
            if(this.velocX < 5){
                this.velocX += 2;
            }
            this.locX+=this.velocX;
        }
        
        if(keys.up){
            if(this.canJump == true && this.jumpCnt < 2){
                this.velocY = -14;
                this.jumpCnt += 1;
                this.canJump = false;
                this.locY += this.velocY;
            }
        }
        if(keys.up == false){
            this.canJump = true;
        }
        
        if(this.locY >= 525){
            this.locY = 525;
            this.velocY = 0;
            this.jumpCnt = 0;
        } else{
            this.velocY = this.velocY + .8;
        }
        
        this.locY += this.velocY;
        
        console.log(this.canJump);
    };

    
    this.initilize()
    console.log("proper player");
}
