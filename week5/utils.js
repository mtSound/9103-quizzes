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

///////////////////////////////// SVG DRAWING FUNCTIONS /////////////////////////////////////////////////////////////////

//This function draws a new circle with position cx/cy, a radius r, and a fill of fillColor
function drawCircle(cx, cy, r, fillColor, fillOpac, lineColor, strWidth) {
    /* If no values are given for the cx & cy coordinates, a random position will be generated
    If no value is given for radius, a random radius will be generated and scaled to 0.1 the width of the canvas
    If no value is given for the fill color, random colors will be generated */
    let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCircle.setAttribute("cx", cx ?? (randomInt(width)));
    newCircle.setAttribute("cy", cy ?? (randomInt(height)));
    newCircle.setAttribute("r", r ?? (randomInt((width / 10))));
    newCircle.setAttribute("fill", fillColor ?? makeRGB());
    newCircle.setAttribute("fill-opacity", fillOpac ?? 1);
    newCircle.setAttribute("stroke", lineColor ?? makeRGB());
    newCircle.setAttribute("stroke-width", strWidth ?? 1);
    svg.appendChild(newCircle);

}

//This function draws a new ellipse with position cx/cy, a radius r, and a fill of fillColor
function drawEllipse(cx, cy, rx, ry, fillColor, fillOpac, lineColor, strWidth) {
    /* If no values are given for the cx & cy coordinates, a random position will be generated
    If no value is given for radius, random radii will be generated and scaled to 0.1 the width of the canvas
    If no value is given for the fill color, random colors will be generated */
    let newEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    newEllipse.setAttribute("cx", cx ?? (randomInt(width)));
    newEllipse.setAttribute("cy", cy ?? (randomInt(height)));
    newEllipse.setAttribute("rx", rx ?? (randomInt((width / 10))));
    newEllipse.setAttribute("ry", ry ?? (randomInt((width / 20))));
    newEllipse.setAttribute("fill", fillColor ?? makeRGB());
    newEllipse.setAttribute("fill-opacity", fillOpac ?? 1);
    newEllipse.setAttribute("stroke", lineColor ?? makeRGB());
    newEllipse.setAttribute("stroke-width", strWidth ?? 1);
    svg.appendChild(newEllipse);

}

//This function draws a new SQUARE (rectangle with equal proportions)
function drawSquare(x1, y1, squareSide, rX, fillColor, fillOpac, lineColor, strWidth) {
    /* If no values are given for the x & y coordinates, a random position will be generated
    If no value is given for width and height, a random width & height will be generated
    If no value is given for the corner rounding (rx), it will default to 0
    If no value is given for the fill color, random colors will be generated 
    If no value is given for the fill opacity, it will default to 1*/
    let newSquare = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    if (squareSide !== null) {
        newSquare.setAttribute("width", squareSide);
        newSquare.setAttribute("height", squareSide);
    } else {
        squareSide = randomInt(height);
        newSquare.setAttribute("width", squareSide);
        newSquare.setAttribute("height", squareSide);
    }
    newSquare.setAttribute("x", x1 ?? ((width / 2) - (squareSide / 2)));
    newSquare.setAttribute("y", y1 ?? ((height / 2) - (squareSide / 2)));
    newSquare.setAttribute("rx", rX ?? 0);
    newSquare.setAttribute("fill", fillColor ?? makeRGB());
    newSquare.setAttribute("fill-opacity", fillOpac ?? 1);
    newSquare.setAttribute("stroke", lineColor ?? makeRGB());
    newSquare.setAttribute("stroke-width", strWidth ?? 1);
    svg.appendChild(newSquare);

}

//This function appends the SVG with text
function drawText(x1, y1, textMessage) {
    /* If no values are given for the x & y coordinates, a random position will be generated
    If no value is given for width and height, a random width & height will be generated
    If no value is given for the corner rounding (rx), it will default to 0
    If no value is given for the fill color, random colors will be generated 
    If no value is given for the fill opacity, it will default to 1*/
    let newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    newText.setAttributeNS(null,"x", "50%");
    newText.setAttributeNS(null,"y", "50%");
    newText.setAttributeNS(null,"dominant-baseline", "middle")
    newText.setAttributeNS(null,"text-anchor", "middle")
    newText.setAttributeNS(null,"font-family", "Menlo")
    newText.setAttributeNS(null,"font-size", "large")
    newText.setAttributeNS(null,"id","text_info")
    newText.innerHTML = textMessage;
    svg.appendChild(newText);
}

///////////////////////////////// WAIT FUNCTIONS  /////////////////////////////////////////////////////////////////

// Wait
function waitForSomething(waitTime) {
    return new Promise(
        resolve => setTimeout(resolve, waitTime)
      );
    }

