var arrowCodes = {37: "LEFT", 38: "UP", 39: "RIGHT"};

function trackKeys(codes) {
    var pressed = Object.create(null);
    
    function handler(event){
        if(codes.hasOwnProperty(event.keyCode)){
            var down = event.type == "keydown";
            pressed[codes[event.keyCode]] = down;
            event.preventDefault();
        }
    }

    addEventListener("keydown", handler);
    addEventListener("keyup", handler);

    return pressed;
}

function runAnimation(frameFunc) {
    var lastTime = null;

    function frame(time) {
        var stop = false;

        if(lastTime != null){
            var timeStep = Math.min(time - lastTime, 100) / 1000;
            stop = frameFunc(timeStep) === false;
        }
        lastTime = time;
        if(!stop){
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}

var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);

    runAnimation(function(step){
        level.animate(step, arrows);
        display.drawFrame(step);
        if(level.isFinished()){
            display.clear();
            if(andThen){
                andThen(level.status);
            }
            return false;
        }
    });
}

function runGame(plans, Display){
    function startLevel(n){
        runLevel(new Level(plans[n], n), Display, function(status){
            if(status === Status.LOST){
                startLevel(n);
            } else if(n < plans.length -1){
                startLevel(n+1);
            } else console.log("YOU WON!!!!!!!");
        });
    }
    startLevel(0);
}