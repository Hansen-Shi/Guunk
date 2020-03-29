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
        //this.reset(document);
        console.log("initilize called");
        requestAnimationFrame(mainLoop);
    };

    /*$(document).ready(function () {
        const player = document.getElementById("slime");
        reset(player);
    });*/

    /*function reset(document) {
        document.style.left = screen_w * .5 + "px";
        document.style.top = screen_h * .5 + "px";
        document.style.width = 100 + "px";
        document.style.height = 100 + "px";
    };*/
    

    document.addEventListener("keydown", function (event) {
        if (event.keyCode == action.RIGHT) {
            gg.keys.right = true;
        }
        if(event.keyCode == action.LEFT){
            gg.keys.left = true;
        }
        if(event.keyCode == action.SPACE){
            gg.keys.space = true;
        }
        if(event.keyCode == action.UP){
            gg.keys.up = true;
        }
        //console.log(gg.keys);
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
        //console.log(gg.keys);
    });


    this.initilize();
    console.log("initilized properly");
}

function mainLoop(){
    $('#slime').css('left', gg.player.locX);
    //console.log(1);
    gg.player.update(gg.keys);
    //  console.log("tick");
    //$('#slime').css('left', player.locX);
    requestAnimationFrame(mainLoop);
}