// Get SVG Canvas
const svg = document.getElementById('base_svg');
const width = svg.getAttribute('width');
const height = svg.getAttribute('height');

// This creates a nice backdrop for the concentric circles
function drawStars(num) {
    // But I'll also conform these circles to our odd/even rule
    for (let i = 0; i <= num; i++) {
        let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        newCircle.setAttribute("cx", randomInt(width));
        newCircle.setAttribute("cy", randomInt(height));
        newCircle.setAttribute("r", randomInt(3));
        if (isEven(i)){
            newCircle.setAttribute("fill", "rgb(255,255,255)");
        } else {
            newCircle.setAttribute("fill", "rgb(254,254,254)");
        }
        newCircle.setAttribute("class", "star")
        svg.appendChild(newCircle)
    }
}

// This function recursively draws concentric circle
// The colour of each circle fluctuates between all even and all odd RGB values
// The colour also intentionally tends toward black very quickly by using the previous rgb value as an upper limit when randomising the next rgb value
function drawCircle(cx, cy, cr, fillColor) {
    // ensure that an infinite loop doesn't occur by breaking the recursion when the circle's radius = 1
    if (cr <= 1) return;

    /* If no values are given for the cx & cy coordinates, a random position will be generated
    If no value is given for radius, a random radius will be generated and scaled to 0.1 the width of the canvas
    If no value is given for the fill color, random colors will be generated */
    let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCircle.setAttribute("cx", cx ?? constrain(randomInt(width), (0 + cr), (width - cr)));
    newCircle.setAttribute("cy", cy ?? constrain(randomInt(height), (0 + cr), (height - cr*3)));
    newCircle.setAttribute("r", cr ?? constrain(randomInt(100), 20, 500));
    // generate a random even number to begin with
    newCircle.setAttribute("fill", fillColor ?? makeRGB((makeRandomEven(255)), (makeRandomEven(255)), (makeRandomEven(255))));
    newCircle.setAttribute("class", "blackhole")
    svg.appendChild(newCircle);


    /* I want the circles to be concentric, but the original cx and cy positions are random.
    If I simply recursively created more circles they wouldn't align (they'd be randomly positioned around the canvas)
    so I need to grab the current values of our cx and cy positions so I can reuse them 
    I also need to declare cr2 so I can pass the first circle's radius on to manipulate it */
    let cx2 = newCircle.getAttribute("cx");
    let cy2 = newCircle.getAttribute("cy");
    let cr2 = newCircle.getAttribute("r");

    /* I also want to grab the current rgb values for the circle so I can check if they're odd or even
    So I want to split the rgb values into an array and then parse those values as integers 
    so I can apply some math to them */
    let rgbString = newCircle.getAttribute("fill");
    let splitRGB = rgbString.slice(
        rgbString.indexOf("(") + 1,
        rgbString.indexOf(")")
    );
    let colorsArray = splitRGB.split(",");
    let r = parseInt(colorsArray[0]);
    let g = parseInt(colorsArray[1]);
    let b = parseInt(colorsArray[2]);

    /* Now I need to check if I currently have an 'odd' or 'even' colour. 
    As I currently have the strings in in Array, I could use a 'for' loop for this and iterate across each index of the array:
    
    let r1;
    let g1;
    let b1;
    for (let i = 0; i < colorsArray.length; i++) {
        if (i === 0){
            if (isEven(r) === true) {
                r1 = (makeRandomOdd(r));
            } else if (isOdd(r) === true) {
                r1 = constrain((r - 13),0,);
            }
        } else if (i === 1){
            if (isEven(g) === true) {
                g1 = (makeRandomOdd(g));
            } else if (isOdd(g) === true) {
                g1 = constrain((g - 13),0,);
            }
        } else {
            if (isEven(b) === true) {
                b1 = (makeRandomOdd(b));
            } else if (isOdd(b) === true) {
                b1 = constrain((b - 13),0,);
            }
        }
    }
    let nextRGB = `rgb(${r1},${g1},${b1})`;

    But as I are using either 'all even' or 'all odd' strings, its much cleaner to just check the 'r' value like this - 
    */

    let nextRGB;
    if (isEven(r) === true) {
        // (1) generate random odd using the current even value as an upper limit
        nextRGB = makeRGB((makeRandomOdd(r)), (makeRandomOdd(g)), (makeRandomOdd(b)));
    } else if (isOdd(r) === true) {
        // (2) generate even number by subtracting an odd number from an odd number. constrain stops us getting negative values
        // I could just use the same method as above, but using our 'makeRandomEven' function
        nextRGB = makeRGB((constrain((r - 13),0,)), (constrain((g - 13),0,)), (constrain((b - 13),0,)))
    }



    // Recursion of drawCircle() to generate inner circles, reducing radius by 5 every time

    drawCircle(cx2, cy2, cr2 - 5, nextRGB);
}

drawStars(500);
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();