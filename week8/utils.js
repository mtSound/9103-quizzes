function random() {
    switch (arguments.length) {
        // random number
        case 0:
            return Math.random();
            break;
        // random with upper limit
        case 1:
            return Math.random() * arguments[0];
            break;
        // random with upper and lower limit
        case 2:
            return arguments[0] + Math.random() * (arguments[1] - arguments[0]);
            break;
        // random with upper and lower limit with optional flag for positive or negative
        case 3:
            return arguments[0] + (Math.random() * 2 - 1) * (arguments[1] - arguments[0]);
            break;
        // error handling
        default:
            console.error("too many arguments passed to random()");
            break;
    }
}

// random rbg colour string generator
function makeRGB() {
    let redOut = Math.round(random(255));
    let greenOut = Math.round(random(255));
    let blueOut = Math.round(random(255));
    return `rgb(${redOut},${greenOut},${blueOut})`
}

//svg draw function
function drawCircle(x, y, radius) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", makeRGB());
    return circle;
}

// random path
function gravityPath() {

    let randomVeloc = random(30, 800);
    let randomAngle = random(30, 150);
    let angleX = 180 - 90 - randomAngle;

    let dY2;
    let dX2;
    let dX1;

    // depending on value of randomAngle, dX1 and dX2 BOTH need to be either negative or positive

    if (randomAngle === 90) {
        // edge case, just in case randomAngle === 90deg
        randomAngle - 20;
        dY2 = -1 * Math.abs(Math.sin(randomAngle) * (randomVeloc / Math.sin(90)));
        dX2 = Math.abs(Math.sin(angleX) * (randomVeloc / Math.sin(90)));
        dX1 = Math.abs((Math.sin(angleX) * ((height / 2) / Math.sin(randomAngle)))) + dX2;
    } else if (randomAngle < 90) {
        // force both dX1 & dX2 to be positive
        dY2 = -1 * Math.abs(Math.sin(randomAngle) * (randomVeloc / Math.sin(90)));
        dX2 = Math.abs(Math.sin(angleX) * (randomVeloc / Math.sin(90)));
        dX1 = Math.abs((Math.sin(angleX) * ((height / 2) / Math.sin(randomAngle)))) + dX2;
    } else {
        // force both dX1 & dX2 to be negative
        dY2 = -1 * Math.abs(Math.sin(randomAngle) * (randomVeloc / Math.sin(90)));
        dX2 = -1 * Math.abs(Math.sin(angleX) * (randomVeloc / Math.sin(90)));
        dX1 = -1 * Math.abs((Math.sin(angleX) * ((height / 2) / Math.sin(randomAngle)))) + dX2;
    }

    let randomCurve = `M 0,0 s ${dX2},${dY2} ${dX1},${height}`
    return randomCurve;
} 