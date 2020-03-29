function Guunk() {
    var self=this;
    screen_w = screen.width;
    screen_h = screen.height;
    let keys = {};
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
        if (
            event.keyCode == action.RIGHT ||
            event.keyCode == action.LEFT ||
            event.keyCode == action.SPACE ||
            event.keyCode == action.UP
        ) {
            keys[event.keyCode] = true;
        }
    });

    document.addEventListener("keyup", function (event) {
        if (
            event.keyCode == action.RIGHT ||
            event.keyCode == action.LEFT ||
            event.keyCode == action.SPACE ||
            event.keyCode == action.UP
        ) {
            keys[event.keyCode] = false;
        }
    });


    this.initilize();
    console.log("initilized properly");
}

function mainLoop(){
    $('#slime').css('left', player.locX);
    //console.log(1);
    gg.player.update(gg.keys);
    console.log("tick");
    //$('#slime').css('left', player.locX);
    requestAnimationFrame(mainLoop);
}