var Player = function(){
    var self = this;
    let locX = 0;
    let locY = 0;
    let velocX = 0;
    let velocY = 0;
    const action = {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        SPACE: 32,
    };

    this.initilize=function(){
        self.locX = 100;
        self.locY = 100;
        self.velocX = 0;
        self.velocY = 0;
    }

    this.update = function(keys){
        //console.log("update called");
        if(keys.action.LEFT){
            if(self.velocX > -5){
                self.self.velocX -= 1.5;
            }
            if(self.velocX < 0){
                self.velocX += 1;
            }
            self.locX+=self.velocX;
        }

        if(keys.RIGHT){
            if(self.velocX < 5){
                self.velocX + 1.5;
            }
            if(self.velocX > 0){
                self.velocX -= 1;
            }
            self.locX+=self.velocX;
        }
        //console.log(self.locX, self.locY);
    };

    
    this.initilize()
    console.log("proper player");
}