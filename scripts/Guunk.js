function Guunk() {
    var self=this;
    screen_w = screen.width;
    screen_h = screen.height;
    this.keys = {
        left:false,
        right:false,
        leftheld:false,
        rightheld:false,
        up:false,
        space:false
    };
    //the leftheld and rightheld are only to be used to remember that a key is being held while we are halting movement because another key was just pressed.
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
            if(gg.keys.left) {
                console.log("we are holding left, and we just pressed right, so we will hold left");
                gg.keys.leftheld = true;
                gg.keys.left = false;
            }

        }
        if(event.keyCode == action.LEFT){
            gg.keys.left = true;
            if(gg.keys.right) {
                gg.keys.rightheld = true;
                gg.keys.right = false;
            }
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
            gg.keys.rightheld = false;
            if(gg.keys.leftheld)
                gg.keys.left=true;
        }
        if(event.keyCode == action.LEFT){
            gg.keys.left = false;
            if(gg.keys.rightheld) {
                console.log("janky fix happened");
                gg.keys.right = true;
            }
            gg.keys.leftheld=false;
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
