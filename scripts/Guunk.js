function Guunk() {


    const postShiftAmt = 7;
    const leftRightCamSpeed = 5;

    //so for the left/right shifting the way it will work is we will have a threshold that once we pass, we will shift everything until we are centered as much as we want.
    var shiftState = 0;//0 means we are not shifting, 1 means we are shifting to the right, and -1 means we are shifting to the left.
    //1920 wide  if we get <384 or > 1536, then we will shift until we're at 576 and 1344 respectively


    var self=this;
    screen_w = screen.width;
    screen_h = screen.height;
    this.keys = {
        left:false,
        right:false,
        leftheld:false,
        rightheld:false,
        up:false,
        space:false,
        shift:false
    };
    //the leftheld and rightheld are only to be used to remember that a key is being held while we are halting movement because another key was just pressed.
    this.options={
        width: screen_w,
        height: screen_h,
        gravity: 1,
    }
    this.player = new Player();
    const action = {
        LEFT: 65,
        RIGHT: 68,
        UP: 87,
        SPACE: 32,
        SHIFT: 16
    };

    this.initialize=function(){
        requestAnimationFrame(mainLoop);
    };


    this.screenShiftUpDown = function(){


        //the player is above a certain point on the screen, so we must shift everything down some amount.
        //for now we are going with 20% of the screen (1080*.2 = 216)


        //screen height * 25%
        if(gg.player.locY < window.innerHeight*1.0/4){
            var allObjectsToShift = $('.object');

            gg.player.locY += postShiftAmt;
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                allObjectsToShift[i].style.top = offsets.top + postShiftAmt + "px";
            }


        //screen height - (screen height * 25%)
        }else if(gg.player.locY > window.innerHeight - (window.innerHeight*1.0/4)){

            var allObjectsToShift = $('.object');
            gg.player.locY -= postShiftAmt;
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                if(gg.player.velocY > 0){
                    allObjectsToShift[i].style.top = offsets.top - postShiftAmt + "px";
                }else{
                    allObjectsToShift[i].style.top = offsets.top - postShiftAmt + "px";
                }
            }


            // $('#slime').css('left', gg.player.locX);
            // $('#slime').css('top', gg.player.locY);

        }

    };

    //we will
    this.screenShiftLeftRight = function(){

        //screen width * 33%
        if(gg.player.locX < window.innerWidth*1.0/3){
            shiftState=1;
            var allObjectsToShift = $('.object');

            gg.player.locX += leftRightCamSpeed;
            console.log("SIZE OF ARRAY: ", allObjectsToShift.length)
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                if(gg.player.velocX < 0){
                    allObjectsToShift[i].style.left = offsets.left + leftRightCamSpeed + "px";
                }else {
                    allObjectsToShift[i].style.left = offsets.left + leftRightCamSpeed + "px";
                }
            }


            //screen width - screen width * 33%
        }else if(gg.player.locX > (window.innerWidth - (window.innerWidth*1.0/3))){


            var allObjectsToShift = $('.object');

            //the player needs to be moved the camspeed, because he doesn't move that.
            gg.player.locX -= leftRightCamSpeed;
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                if(gg.player.velocX > 0){
                    allObjectsToShift[i].style.left = offsets.left - leftRightCamSpeed + "px";
                }else{
                    allObjectsToShift[i].style.left = offsets.left - leftRightCamSpeed + "px";
                }
            }

        }


    };


    window.addEventListener("keydown", function(e) {
        // space, page up, page down and arrow keys:
        if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    document.addEventListener("keydown", function (event) {
        if (event.keyCode == action.RIGHT || event.keyCode == 68) {
            gg.keys.right = true;
            if(gg.keys.left) {
                console.log("we are holding left, and we just pressed right, so we will hold left");
                gg.keys.leftheld = true;
                gg.keys.left = false;
            }

        }
        if(event.keyCode == action.LEFT|| event.keyCode == 65){
            gg.keys.left = true;
            if(gg.keys.right) {
                gg.keys.rightheld = true;
                gg.keys.right = false;
            }
        }
        if(event.keyCode == action.SPACE){
            var offsets = allObjectsToShift[i].getBoundingClientRect();
            //const yposn = offsets.top;
            allObjectsToShift[i].style.top = offsets.top + shiftAmt + "px";
            document.getElementById("background-jank")
            gg.keys.space = true;
        }
        if(event.keyCode == action.UP|| event.keyCode == 87){
            gg.keys.up = true;
        }
        if(event.keyCode == action.SHIFT){
            gg.keys.shift = true;
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.keyCode == action.RIGHT || event.keyCode == 68) {
            gg.keys.right = false;
            gg.keys.rightheld = false;
            if(gg.keys.leftheld)
                gg.keys.left=true;
        }
        if(event.keyCode == action.LEFT || event.keyCode == 65){
            gg.keys.left = false;
            if(gg.keys.rightheld) {
                gg.keys.right = true;
            }
            gg.keys.leftheld=false;
        }
        if(event.keyCode == action.SPACE){
            gg.keys.space = false;
        }
        if(event.keyCode == action.UP  || event.keyCode == 87){
            gg.keys.up = false;
        }
        if(event.keyCode == action.SHIFT){
            gg.keys.shift = false;
        }
    });


    this.initialize();
    console.log("initialized properly");
}

function mainLoop(){
    console.log("This is the screen width", screen_w);
    $('#slime').css('left', gg.player.locX);
    $('#slime').css('top', gg.player.locY);
    //console.log(1);
    gg.player.update(gg.keys);
    console.log("This is the players location: ", gg.player.locX, "::: Velocity: ", gg.player.velocX);

    //in this function/method we check if the blob is
    gg.screenShiftUpDown();
    gg.screenShiftLeftRight();
    //  console.log("tick");
    //$('#slime').css('left', player.locX);
    requestAnimationFrame(mainLoop);
}
