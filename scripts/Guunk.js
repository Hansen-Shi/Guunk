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

function mainLoop(){
    $('#slime').css('left', gg.player.locX);
    $('#slime').css('top', gg.player.locY);
    //console.log(1);
    gg.player.update(gg.keys);
    //  console.log("tick");
    //$('#slime').css('left', player.locX);
    requestAnimationFrame(mainLoop);
}
