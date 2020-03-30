function Guunk() {
    var self=this;
    screen_w = screen.width;
    screen_h = screen.height;
    this.keys = {
        left:false,
        right:false,
        up:false,
        space:false
    };
    this.options={
        width: screen_w,
        height: screen_h,
        gravity: 1,
    }
    this.player = new Player();
    const action = {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        SPACE: 32,
    };

    this.initilize=function(){
        requestAnimationFrame(mainLoop);
    };

    this.checkCollision = function ($div1, $div2){
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        }
        else{
            return true;
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.keyCode == action.RIGHT) {
            gg.keys.right = true;
            gg.keys.left = false;
        }
        if(event.keyCode == action.LEFT){
            gg.keys.left = true;
            gg.keys.right = false;
        }
        if(event.keyCode == action.SPACE){
            gg.keys.space = true;
        }
        if(event.keyCode == action.UP){
            gg.keys.up = true;
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.keyCode == action.RIGHT) {
            gg.keys.right = false;
        }
        if(event.keyCode == action.LEFT){
            gg.keys.left = false;
        }
        if(event.keyCode == action.SPACE){
            gg.keys.space = false;
        }
        if(event.keyCode == action.UP){
            gg.keys.up = false;
        }
    });


    this.initilize();
    console.log("initialized properly");
}

function check_collision_side(player, $div2){
    /// Calcualte the distance in x and y, between the center point of cat and obstacle
    var dx  =  (player.locX + 100/2) - (obstacle.xPos + obstacle.width/2);
    var dy = (cat.yPos + cat.height/2) - (obstacle.yPos + obstacle.height/2);
  
    var width = (cat.width + obstacle.width)/2;
    var height = (cat.height + obstacle.height)/2;
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    var collide_side = 'none';
  
    if(Math.abs(dx) <= width && Math.abs(dy) <= height){
        if (crossWidth > crossHeight){
          collide_side = (crossWidth > ( -crossHeight))?'bottom':'left';
        } else {
          collide_side = (crossWidth >  - (crossHeight))?'right':'top';
        }
    }
    return(collide_side);
  }

function mainLoop(){
    $('#slime').css('left', gg.player.locX);
    $('#slime').css('top', gg.player.locY);
    //console.log(1);
    gg.player.update(gg.keys);
    //  console.log("tick");
    //$('#slime').css('left', player.locX);
    requestAnimationFrame(mainLoop);
}
