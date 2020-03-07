var Guunk = function() {
    var self=this;
    screen_w = screen.width;
    screen_h = screen.height;
    this.options={
        width: screen_w,
        height: screen_h,
        gravity: 1,

    }
    let locX = 0;
    let locY = 0;
    let velocX = 0;
    let velocY = 0;

    this.player = new Player();

    const action = {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        SPACE: 32,
    };

    let keys = {};
    document.addEventListener("keydown", function (event) {
        /*if (
            event.keyCode == action.RIGHT ||
            event.keyCode == action.LEFT ||
            event.keyCode == action.SPACE ||
            event.keyCode == action.UP
        ) {
            keys[event.keyCode] = true;
        }*/
        if (event.keyCode == action.RIGHT) {
            locX += 1;
            player.x += 1;
        }
        if (event.keyCode == action.LEFT) {
            locX -= 1;
        }
        if (event.keyCode == action.UP) {
            locY += 1;
        }
        console.log(locX, locY);
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

    function reset(document) {
        document.style.left = screen_w * .5 + "px";
        document.style.top = screen_h * .5 + "px";
        document.style.width = 100 + "px";
        document.style.height = 100 + "px";
    }

    $(document).ready(function () {
        const player = document.getElementById("slime");
        reset(player);
    });
}


var Player = function(){

}
