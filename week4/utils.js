
// // Get SVG Canvas
// // This can be commented out if svg is declared in main script
// const svg = document.getElementById('base_svg');
// const width = svg.getAttribute('width',);
// const height = svg.getAttribute('height',);


///////////////////////////////// RANDOM GENERATOR FUNCTIONS /////////////////////////////////////////////////////////////////

//Create a random Integer
function randomInt(upper) {
    /* the function takes in one paramater - 'upper'
    It uses nullish coalescence to test if the user has provided a specific input, 
    or if no input has been provided (null) it sets 'upper' to '1'
    'upper' is the range, or limit, for the range in which a randomInt can be created
    ie. randomInt(100); would create a random integer between 0 - 100 */

    let output = Math.random();
    output *= upper ?? 1;
    output = Math.round(output);
    return output;
}

//Create a random number (floating)
function random(upper) {
    /* the function takes in one paramater - 'upper'
    It uses nullish coalescence to test if the user has provided a specific input, 
    or if no input has been provided (null) it sets 'upper' to '1'
    'upper' is the range, or limit, for the range in which a random number can be created
    ie. randomInt(100); would create a random number between 0 - 100 */

    let output = Math.random();
    output *= upper ?? 1;
    return output;
}

function makeRGB(redInputValue, greenInputValue, blueInputValue) {
    /* The function takes in three parameters: r, g, and b.
    A nullish coalescence operator (??) tests if the user has provided a specific number as input
    If the null condition tests true, then randomInt(); is used to create a random number
    This is passed into a string, which is the output of the function. 
    
    Backticks are used to create a string literal using the output values */

    let redOutputValue = redInputValue ?? randomInt(255);
    let greenOutputValue = greenInputValue ?? randomInt(255);
    let blueOutputValue = blueInputValue ?? randomInt(255);

    return `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`
}

// Make a random Odd number based on an upper limit
function makeRandomOdd(upper) {
    /* the function takes in one paramater - 'upper'
    Upper is the upper limit for the range in which an odd number can be created, ie. makerandomOdd(100); will 
    create a random odd number between 0 - 100 */
    return (Math.round(Math.random() * (upper / 2)) * 2) + 1;
}

// Output odd numbers within a given range
function printOddInRange(low, high) {
    /* the function takes in two parameters, 'low' & 'high', and then prints only the odd numbers within that range
    based on the remainder when divided by 2 (if the mod !== 0 then the number is odd and should be printed) */
    for (let i = low; i <= high; i++) {
        if (i % 2 !== 0) {
            console.log(i);
        };
    };
}

// Test if a number is odd
function isOdd(num) {
    /* An odd number will always have a remainder when divided by 2
    So we test the mod (%) of the input number divided by 2 
    If it doesn't equal zero, the number is odd */
    return num % 2 != 0;
}

// Make a random Even number based on an upper limit
function makeRandomEven(upper) {
    /* the function takes in one paramater - 'upper'
   Upper is the upper limit for the range in which an even number can be created, ie. makerandomEven(100); will 
   create a random even number between 0 - 100 */
    return (Math.round(Math.random() * (upper / 2)) * 2);
}

// Output even numbers within a given range
function printEvenInRange(low, high) {
    /* the function takes in two parameters, 'low' & 'high', and then prints only the even numbers within that range
    based on the remainder when divided by 2 (if the mod === 0 then the number is even and should be printed) */
    for (let i = low; i <= high; i++) {
        if (i % 2 === 0) {
            console.log(i);
        };
    };
}

// Test if a number is even
function isEven(num) {
    /* An even number will always be divisible by 2 and have no remainder
    So we test the mod (%) of the input number divided by 2 
    If it equals zero, the number is even */
    return num % 2 == 0;
}

function makeRandomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

///////////////////////////////// SVG DRAWING FUNCTIONS /////////////////////////////////////////////////////////////////


// this function draws a new line and takes input values for the coordinates, stroke color and stroke width
function drawLine(x1, y1, x2, y2, lineColor, strWidth) {
    /* If no values are given for the x & y coordinates, random positions will be generated
    If no value is given for stroke, a random color will be generated
    If no value is given for stroke width, it will default to '1' */
    let newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    newLine.setAttribute("x1", x1 ?? (randomInt(width)));
    newLine.setAttribute("y1", y1 ?? (randomInt(height)));
    newLine.setAttribute("x2", x2 ?? (randomInt(width)));
    newLine.setAttribute("y2", y2 ?? (randomInt(height)));
    newLine.setAttribute("stroke", lineColor ?? makeRGB());
    newLine.setAttribute("stroke-width", strWidth ?? 1);
    svg.appendChild(newLine);
}

// //This function draws a new circle with position cx/cy, a radius r, and a fill of fillColor
// function drawCircle(cx, cy, r, fillColor, fillOpac) {
//     /* If no values are given for the cx & cy coordinates, a random position will be generated
//     If no value is given for radius, a random radius will be generated and scaled to 0.1 the width of the canvas
//     If no value is given for the fill color, random colors will be generated */
//     let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     newCircle.setAttribute("cx", cx ?? (randomInt(width)));
//     newCircle.setAttribute("cy", cy ?? (randomInt(height)));
//     newCircle.setAttribute("r", r ?? (randomInt((width / 10))));
//     newCircle.setAttribute("fill", fillColor ?? makeRGB());
//     newCircle.setAttribute("fill-opacity", fillOpac ?? 1);
//     svg.appendChild(newCircle);

// }

//This function draws a new rectangle with position x/y, a radius r, and a fill of fillColor
function drawRect(x1, y1, rectWidth, rectHeight, rX, fillColor, fillOpac) {
    /* If no values are given for the x & y coordinates, a random position will be generated
    If no value is given for width and height, a random width & height will be generated
    If no value is given for the corner rounding (rx), it will default to 0
    If no value is given for the fill color, random colors will be generated 
    If no value is given for the fill opacity, it will default to 1*/
    let newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newRect.setAttribute("x", x1 ?? (randomInt(width)));
    newRect.setAttribute("y", y1 ?? (randomInt(height)));
    newRect.setAttribute("width", rectWidth ?? (randomInt(width)));
    newRect.setAttribute("height", rectHeight ?? (randomInt(height)));
    newRect.setAttribute("rx", rX ?? 0);
    newRect.setAttribute("fill", fillColor ?? makeRGB());
    newRect.setAttribute("fill-opacity", fillOpac ?? 1);
    svg.appendChild(newRect);

}

// This function draws a new polygon with 3 sets of coordinates (a triangle)
function drawTriangle(point1x, point1y, point2x, point2y, point3x, point3y, fillColor, fillOpac) {
    /* If no values are given for the 3 pairs of x & y coordinates, random positions will be generated
    If no value is given for the fill color, random colors will be generated 
    If no value is given for the fill opacity, it will default to 1*/
    let newTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    newTriangle.setAttribute("points", `${point1x ?? randomInt(width)},${point1y ?? randomInt(height)},${point2x ?? randomInt(width)},${point2y ?? randomInt(height)},${point3x ?? randomInt(width)},${point3y ?? randomInt(height)}`);
    newTriangle.setAttribute("fill", fillColor ?? makeRGB());
    newTriangle.setAttribute("fill-opacity", fillOpac ?? 1);
    svg.appendChild(newTriangle);
}


///////////////////////////////// CONSTRAINT FUNCTIONS /////////////////////////////////////////////////////////////////

// Constrain
function constrain(input, lowerLimit, upperLimit) {
    /* Can be used in various ways to constrain random positions to within the canvas, or 
    colors to a specific range. It takes an input, a lowerLimit (which could be the 
    width or height of the canvas or even a color palette), and an upperLimit (which could be the width 
    or height of the canvas or even a color palette) */
    
    if (input > upperLimit) {
        input = upperLimit;
    }

    if (input < lowerLimit) {
        input = lowerLimit;
    }

    return input;
}



