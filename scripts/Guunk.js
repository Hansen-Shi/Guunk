const action = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    SPACE: 32,
};

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

function loop() {
    if (keys[action.RIGHT]) {

    }
}


