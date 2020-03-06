let locX = 0;
let locY = 0;
let velocX = 0;
let velocY = 0;
let grav = 1;

screen_w = screen.width;
screen_h = screen.height;

const action = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    SPACE: 32,
};

const player = document.getElementById("slime");
reset();

let keys = {};
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

$(document).ready(function () {
});

function reset(){
    player.style.left = screen_w *.5 + "px";
    player.style.top = screen_h *.5 + "px";
    player.style.width = 100 + "px";
    player.style.height = 100 + "px";
}


