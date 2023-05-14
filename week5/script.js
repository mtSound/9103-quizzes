const svg = document.getElementById("base-svg");
const buttonSquare = document.getElementById("button_Square");
const buttonCircle = document.getElementById("button_Circle");
const buttonEllipse = document.getElementById("button_Ellipse");
const buttonColour = document.getElementById("button_Colour");
const buttonReset = document.getElementById("button_Reset");

let colourButtonName = buttonColour.innerHTML;

buttonSquare.onclick = makeSquare;
buttonCircle.onclick = makeCircle;
buttonEllipse.onclick = makeEllipse;
buttonReset.onclick = resetCanvas;

buttonSquare.onmouseover = displayInfo;
buttonCircle.onmouseover = displayInfo;
buttonEllipse.onmouseover = displayInfo;
buttonColour.onmouseover = displayInfo;
buttonReset.onmouseover = displayInfo;


/* By putting the svg canvas in a flex container, I found issues trying to obtain the width and height of the canvas
for manipulation later. ClientWidth & Client Height seemed to work, but I'm unsure if there are any issues with this method */
let width = svg.clientWidth;
let height = svg.clientHeight;

// make square button
function makeSquare() {
    //clear canvas
    svg.replaceChildren();
    //reset colour button text if necessary
    buttonColour.innerHTML = colourButtonName;
    //drawSquare with border but no colour (so we know its been drawn)
    drawSquare(null, null, null, null, "none", null, "black", 2);
}

// make circle button
function makeCircle() {
    //clear canvas
    svg.replaceChildren();
    //reset colour button text if necessary
    buttonColour.innerHTML = colourButtonName;
    // drawCircle with border but no colour (so we know its been drawn)
    drawCircle(width / 2, height / 2, randomInt(height / 2), "none", null, "black", 2);
}

// make circle button
function makeEllipse() {
    //clear canvas
    svg.replaceChildren();
    //reset colour button text if necessary
    buttonColour.innerHTML = colourButtonName;
    //drawEllipse with border but no colour (so we know its been drawn)
    drawEllipse(width / 2, height / 2, randomInt(width / 2), randomInt(height / 2), "none", null, "black", 2);
}

function displayInfo() {
    //display alt text in canvas
    //document.getElementById(this);
    //console.log(this);
    let buttonName = this;
    if (svg.childElementCount === 0) {

        async function infoCall() {
            /* I wanted to display alt text on the canvas when a button was hovered over, but I wanted this text to disappear
            after a certain amount of time.
            I researched 'async' functions and promise-based behaviours from the below sites
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
            https://www.sitepoint.com/delay-sleep-pause-wait/
            */
            drawText(null, null, buttonName.getAttribute("title"))
            let infoText = document.getElementById("text_info");
            //console.log(infoText);
            await waitForSomething(1000);
            
            /* I found that simply running 'svg.removeChild(infoText)' would throw an error in the console if the user
            clicked one of the draw buttons before the message had been cleared.
            I researched 'try...catch' statements on the MDN as a way to ignore the error
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
            */
            try {
                svg.removeChild(infoText);
            } catch (error) {
            }
        }
        infoCall();
    }
}

// trying arrow notation for this one
buttonColour.onclick = (e) => {
    if (svg.childElementCount === 0) {
        async function infoCall() {
            drawText(null, null, "You need to draw a shape before you can colour it in!");
            let infoText = document.getElementById("text_info");
            await waitForSomething(4000);
            try {
                svg.removeChild(infoText);
            } catch (error) {
            }
        }
        infoCall();
    }
    else if (svg.firstElementChild.id === "text_info") {
        svg.replaceChildren();
        async function infoCall() {
            drawText(null, null, "You need to draw a shape before you can colour it in!");
            let infoText = document.getElementById("text_info");
            await waitForSomething(4000);
            try {
                svg.removeChild(infoText);
            } catch (error) {
            }
        }
        infoCall();
    } else {
        const childShape = svg.firstChild;
        let newButtonName = "Change the colour!"
        childShape.setAttribute("fill", makeRGB());
        buttonColour.innerHTML = newButtonName;
    }
}

function resetCanvas() {
    //clear canvas
    svg.replaceChildren();
    buttonColour.innerHTML = colourButtonName;
}