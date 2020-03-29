var Player = function(){
    var self = this;
    this.locX = 0;
    this.locY = 0;
    this.velocX = 0;
    this.velocY = 0;

    this.initilize=function(){
        this.locX = 100;
        this.locY = 500;
        this.velocX = 0;
        this.velocY = 0;
    }

    this.update = function(keys){
        //console.log("update called");
        if(keys.left){
            if(this.velocX > -5){
                this.velocX -= 2;
            }
            if(this.velocX < 0){
                this.velocX += 1;
            }
            this.locX+=this.velocX;
        }

        if(keys.right){
            if(this.velocX < 5){
                this.velocX += 2;
            }
            if(this.velocX > 0){
                this.velocX -= 1;
            }
            this.locX+=this.velocX;
        }
        console.log(this.locX, this.locY);
    };

    
    this.initilize()
    console.log("proper player");
}