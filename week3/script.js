let width = 1500;
let height = 600;

svg = document.getElementById("base_svg")
svg.setAttribute("width", width)
svg.setAttribute("height", height)

const triSide = Math.sqrt(2);

function randomInt(upper) {
    // create a random integer
    // if input is null the multiply it by 1, otherwise multiply it by the input
    // round the integer to the nearest whole number
    let output = Math.random();
    output *= upper ?? 1;
    output = Math.round(output);
    return output;
}

function makeRGB(redInput, greenInput, blueInput) {
    // If the user doesn't provide an input, create a random color
    let redOutput = redInput ?? randomInt(255)
    let greenOutput = greenInput ?? randomInt(255)
    let blueOutput = blueInput ?? randomInt(255)
    return `rgb(${redOutput},${greenOutput},${blueOutput})`
}

function drawCircle(circX, circY, circR, r, g, b) {
    // Create a Circle
    // If the user doesn't provide input, create random colors and position
    // Also assign an ID to be used later when drawing petals
    let xPos = circX ?? randomInt(width);
    let yPos = circY ?? randomInt(height);
    let radius = circR ?? randomInt(100);
    let c = makeRGB(r, g, b);

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", xPos);
    circle.setAttribute("cy", yPos);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", c);
    circle.setAttribute("id", "circ_" + document.getElementsByTagName('circle').length);

    svg.appendChild(circle);

}

function drawPetals(rows) {
/* Draw Petals for each circle. The user defines whether or not to draw one or two rows of petals.
If no input, or an input greater than two is entered, no petals are drawn.
The Petals decrease in size by half for each row added, and their colour is offset from the original circle. */


    // I've tried my best at some If and For statements, that I learnt using the MDN docs:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for

    let petalRows = rows;
    if (rows <= 2) {
        petalRows = rows;
    } else {
        petalRows = null;
    }

    // if the input of drawPetals is 2, then draw 2 rows of petals for each circle
    if (petalRows === 2) {
        let currentNumOfCircles = document.getElementsByTagName('circle').length;
        // console.log('input equals');
        // console.log(currentNumOfCircles);

        for (let i = 0; i < currentNumOfCircles; i++) {

            // Get the Attributes of the initial 'drawCircle' function
            let centerCircle = document.getElementById("circ_" + i);
            //console.log(centerCircle);
            let xPos = parseInt(centerCircle.getAttribute("cx"));
            let yPos = parseInt(centerCircle.getAttribute("cy"));
            let centerR = parseInt(centerCircle.getAttribute("r"));
            let cFill = centerCircle.getAttribute("fill");

            /* Takes the string from the above 'getAttribute', then splits it using the '()' to remove the 'rgb()' from the string
            Following this, it splits the values using the ',' And then puts them into an Array
            It then takes the separate values of the r, g and b values using the Array indices 
            I found the 'slice', 'indexOf', 'split' and 'parseInt' functions in the MDN docs
            */
            let rgbString = cFill
            let colorsRGB = rgbString.slice(
                rgbString.indexOf("(") + 1,
                rgbString.indexOf(")")
            );
            let colorsArray = colorsRGB.split(",");
            let r0 = parseInt(colorsArray[0]);
            let g0 = parseInt(colorsArray[1]);
            let b0 = parseInt(colorsArray[2]);

            let r1 = r0 + 30, g1 = g0 + 30, b1 = b0 + 30;

            //row1    
            let petal1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal1.setAttribute("cx", xPos + (centerR * 2));
            petal1.setAttribute("cy", yPos + 0);
            petal1.setAttribute("r", (centerR / 2));
            petal1.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal1.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
            

            let petal2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal2.setAttribute("cx", xPos + (centerR * triSide));
            petal2.setAttribute("cy", yPos - (centerR * triSide));
            petal2.setAttribute("r", (centerR / 2));
            petal2.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal2.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
            

            let petal3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal3.setAttribute("cx", xPos + 0);
            petal3.setAttribute("cy", yPos - (centerR * 2));
            petal3.setAttribute("r", (centerR / 2));
            petal3.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal3.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
            

            let petal4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal4.setAttribute("cx", xPos - (centerR * triSide));
            petal4.setAttribute("cy", yPos - (centerR * triSide));
            petal4.setAttribute("r", (centerR / 2));
            petal4.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal4.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
            

            let petal5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal5.setAttribute("cx", xPos - (centerR * 2));
            petal5.setAttribute("cy", yPos + 0);
            petal5.setAttribute("r", (centerR / 2));
            petal5.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal5.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
            

            let petal6 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal6.setAttribute("cx", xPos - (centerR * triSide));
            petal6.setAttribute("cy", yPos + (centerR * triSide));
            petal6.setAttribute("r", (centerR / 2));
            petal6.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal6.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
            

            let petal7 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal7.setAttribute("cx", xPos + 0);
            petal7.setAttribute("cy", yPos + (centerR * 2));
            petal7.setAttribute("r", (centerR / 2));
            petal7.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal7.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
            

            let petal8 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal8.setAttribute("cx", xPos + (centerR * triSide));
            petal8.setAttribute("cy", yPos + (centerR * triSide));
            petal8.setAttribute("r", (centerR / 2));
            petal8.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
            petal8.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);
           

            svg.appendChild(petal1);
            svg.appendChild(petal2);
            svg.appendChild(petal3);
            svg.appendChild(petal4);
            svg.appendChild(petal5);
            svg.appendChild(petal6);
            svg.appendChild(petal7);
            svg.appendChild(petal8);


            //row 2
            // the second row of petals are based on a transform of the attributes of the first row of petals

            let xPos1 = parseInt(petal1.getAttribute("cx"));
            let yPos1 = parseInt(petal1.getAttribute("cy"));
            let centerR1 = parseInt(petal1.getAttribute("r"));
            let xPos2 = parseInt(petal2.getAttribute("cx"));
            let yPos2 = parseInt(petal2.getAttribute("cy"));
            let centerR2 = parseInt(petal2.getAttribute("r"));
            let xPos3 = parseInt(petal3.getAttribute("cx"));
            let yPos3 = parseInt(petal3.getAttribute("cy"));
            let centerR3 = parseInt(petal3.getAttribute("r"));
            let xPos4 = parseInt(petal4.getAttribute("cx"));
            let yPos4 = parseInt(petal4.getAttribute("cy"));
            let centerR4 = parseInt(petal4.getAttribute("r"));
            let xPos5 = parseInt(petal5.getAttribute("cx"));
            let yPos5 = parseInt(petal5.getAttribute("cy"));
            let centerR5 = parseInt(petal5.getAttribute("r"));
            let xPos6 = parseInt(petal6.getAttribute("cx"));
            let yPos6 = parseInt(petal6.getAttribute("cy"));
            let centerR6 = parseInt(petal6.getAttribute("r"));
            let xPos7 = parseInt(petal7.getAttribute("cx"));
            let yPos7 = parseInt(petal7.getAttribute("cy"));
            let centerR7 = parseInt(petal7.getAttribute("r"));
            let xPos8 = parseInt(petal8.getAttribute("cx"));
            let yPos8 = parseInt(petal8.getAttribute("cy"));
            let centerR8 = parseInt(petal8.getAttribute("r"));

            // color offset for row 2
            let r2 = r1 + 50, g2 = g1 + 50, b2 = b1 + 50;


            let petal9 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal9.setAttribute("cx", xPos1 + (centerR1 * 2));
            petal9.setAttribute("cy", yPos1 + 0);
            petal9.setAttribute("r", (centerR1 / 2));
            petal9.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal10 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal10.setAttribute("cx", xPos1 + (centerR1 * triSide));
            petal10.setAttribute("cy", yPos1 - (centerR1 * triSide));
            petal10.setAttribute("r", (centerR1 / 2));
            petal10.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal11 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal11.setAttribute("cx", xPos1 + (centerR1 * triSide));
            petal11.setAttribute("cy", yPos1 + (centerR1 * triSide));
            petal11.setAttribute("r", (centerR1 / 2));
            petal11.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal12 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal12.setAttribute("cx", xPos2 + (centerR2 * 2));
            petal12.setAttribute("cy", yPos2 + 0);
            petal12.setAttribute("r", (centerR2 / 2));
            petal12.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal13 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal13.setAttribute("cx", xPos2 + (centerR2 * triSide));
            petal13.setAttribute("cy", yPos2 - (centerR2 * triSide));
            petal13.setAttribute("r", (centerR2 / 2));
            petal13.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal14 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal14.setAttribute("cx", xPos2 + 0);
            petal14.setAttribute("cy", yPos2 - (centerR2 * 2));
            petal14.setAttribute("r", (centerR2 / 2));
            petal14.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal15 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal15.setAttribute("cx", xPos3 + (centerR3 * triSide));
            petal15.setAttribute("cy", yPos3 - (centerR3 * triSide));
            petal15.setAttribute("r", (centerR3 / 2));
            petal15.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal16 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal16.setAttribute("cx", xPos3 + 0);
            petal16.setAttribute("cy", yPos3 - (centerR3 * 2));
            petal16.setAttribute("r", (centerR3 / 2));
            petal16.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal17 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal17.setAttribute("cx", xPos3 - (centerR3 * triSide));
            petal17.setAttribute("cy", yPos3 - (centerR3 * triSide));
            petal17.setAttribute("r", (centerR3 / 2));
            petal17.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal18 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal18.setAttribute("cx", xPos4 + 0);
            petal18.setAttribute("cy", yPos4 - (centerR4 * 2));
            petal18.setAttribute("r", (centerR4 / 2));
            petal18.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal19 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal19.setAttribute("cx", xPos4 - (centerR4 * triSide));
            petal19.setAttribute("cy", yPos4 - (centerR4 * triSide));
            petal19.setAttribute("r", (centerR4 / 2));
            petal19.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal20 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal20.setAttribute("cx", xPos4 - (centerR4 * 2));
            petal20.setAttribute("cy", yPos4 + 0);
            petal20.setAttribute("r", (centerR4 / 2));
            petal20.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal21 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal21.setAttribute("cx", xPos5 - (centerR5 * triSide));
            petal21.setAttribute("cy", yPos5 - (centerR5 * triSide));
            petal21.setAttribute("r", (centerR5 / 2));
            petal21.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal22 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal22.setAttribute("cx", xPos5 - (centerR5 * 2));
            petal22.setAttribute("cy", yPos5 + 0);
            petal22.setAttribute("r", (centerR5 / 2));
            petal22.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal23 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal23.setAttribute("cx", xPos5 - (centerR5 * triSide));
            petal23.setAttribute("cy", yPos5 + (centerR5 * triSide));
            petal23.setAttribute("r", (centerR5 / 2));
            petal23.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal24 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal24.setAttribute("cx", xPos6 - (centerR6 * 2));
            petal24.setAttribute("cy", yPos6 + 0);
            petal24.setAttribute("r", (centerR6 / 2));
            petal24.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal25 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal25.setAttribute("cx", xPos6 - (centerR6 * triSide));
            petal25.setAttribute("cy", yPos6 + (centerR6 * triSide));
            petal25.setAttribute("r", (centerR6 / 2));
            petal25.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal26 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal26.setAttribute("cx", xPos6 + 0);
            petal26.setAttribute("cy", yPos6 + (centerR6 * 2));
            petal26.setAttribute("r", (centerR6 / 2));
            petal26.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal27 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal27.setAttribute("cx", xPos7 - (centerR7 * triSide));
            petal27.setAttribute("cy", yPos7 + (centerR7 * triSide));
            petal27.setAttribute("r", (centerR7 / 2));
            petal27.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal28 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal28.setAttribute("cx", xPos7 + 0);
            petal28.setAttribute("cy", yPos7 + (centerR7 * 2));
            petal28.setAttribute("r", (centerR7 / 2));
            petal28.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal29 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal29.setAttribute("cx", xPos7 + (centerR7 * triSide));
            petal29.setAttribute("cy", yPos7 + (centerR7 * triSide));
            petal29.setAttribute("r", (centerR7 / 2));
            petal29.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal30 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal30.setAttribute("cx", xPos8 + 0);
            petal30.setAttribute("cy", yPos8 + (centerR8 * 2));
            petal30.setAttribute("r", (centerR8 / 2));
            petal30.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal31 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal31.setAttribute("cx", xPos8 + (centerR8 * triSide));
            petal31.setAttribute("cy", yPos8 + (centerR8 * triSide));
            petal31.setAttribute("r", (centerR8 / 2));
            petal31.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            let petal32 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal32.setAttribute("cx", xPos8 + (centerR8 * 2));
            petal32.setAttribute("cy", yPos8 + 0);
            petal32.setAttribute("r", (centerR8 / 2));
            petal32.setAttribute("fill", `rgb(${r2},${g2},${b2})`);

            svg.appendChild(petal9);
            svg.appendChild(petal10);
            svg.appendChild(petal11);
            svg.appendChild(petal12);
            svg.appendChild(petal13);
            svg.appendChild(petal14);
            svg.appendChild(petal15);
            svg.appendChild(petal16);
            svg.appendChild(petal17);
            svg.appendChild(petal18);
            svg.appendChild(petal19);
            svg.appendChild(petal20);
            svg.appendChild(petal21);
            svg.appendChild(petal22);
            svg.appendChild(petal23);
            svg.appendChild(petal24);
            svg.appendChild(petal25);
            svg.appendChild(petal26);
            svg.appendChild(petal27);
            svg.appendChild(petal28);
            svg.appendChild(petal29);
            svg.appendChild(petal30);
            svg.appendChild(petal31);
            svg.appendChild(petal32);

        }



        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Else, if the input of drawPetals is 1, then only draw 1 row of petals for each circle
    } else {
        if (petalRows === 1) {

            let currentNumOfCircles = document.getElementsByTagName('circle').length;
            // console.log('input equals');
            // console.log(currentNumOfCircles);

            for (let i = 0; i < currentNumOfCircles; i++) {

                // Get the Attributes of the initial 'drawCircle' function
                let centerCircle = document.getElementById("circ_" + i);
                //console.log(centerCircle);
                let xPos = parseInt(centerCircle.getAttribute("cx"));
                let yPos = parseInt(centerCircle.getAttribute("cy"));
                let centerR = parseInt(centerCircle.getAttribute("r"));
                let cFill = centerCircle.getAttribute("fill");

                /* Takes the string from the above 'getAttribute', then splits it using the '()' to remove the 'rgb()' from the string
                Following this, it splits the values using the ',' And then puts them into an Array
                It then takes the separate values of the r, g and b values using the Array indices 
                I found the 'slice', 'indexOf', 'split' and 'parseInt' functions in the MDN docs
                */
                let rgbString = cFill
                let colorsRGB = rgbString.slice(
                    rgbString.indexOf("(") + 1,
                    rgbString.indexOf(")")
                );
                let colorsArray = colorsRGB.split(",");
                let r0 = parseInt(colorsArray[0]);
                let g0 = parseInt(colorsArray[1]);
                let b0 = parseInt(colorsArray[2]);

                let r1 = r0 + 30, g1 = g0 + 30, b1 = b0 + 30;

                //row1    
                let petal1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal1.setAttribute("cx", xPos + (centerR * 2));
                petal1.setAttribute("cy", yPos + 0);
                petal1.setAttribute("r", (centerR / 2));
                petal1.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal1.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                let petal2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal2.setAttribute("cx", xPos + (centerR * triSide));
                petal2.setAttribute("cy", yPos - (centerR * triSide));
                petal2.setAttribute("r", (centerR / 2));
                petal2.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal2.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                let petal3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal3.setAttribute("cx", xPos + 0);
                petal3.setAttribute("cy", yPos - (centerR * 2));
                petal3.setAttribute("r", (centerR / 2));
                petal3.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal3.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                let petal4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal4.setAttribute("cx", xPos - (centerR * triSide));
                petal4.setAttribute("cy", yPos - (centerR * triSide));
                petal4.setAttribute("r", (centerR / 2));
                petal4.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal4.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                let petal5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal5.setAttribute("cx", xPos - (centerR * 2));
                petal5.setAttribute("cy", yPos + 0);
                petal5.setAttribute("r", (centerR / 2));
                petal5.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal5.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                let petal6 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal6.setAttribute("cx", xPos - (centerR * triSide));
                petal6.setAttribute("cy", yPos + (centerR * triSide));
                petal6.setAttribute("r", (centerR / 2));
                petal6.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal6.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                let petal7 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal7.setAttribute("cx", xPos + 0);
                petal7.setAttribute("cy", yPos + (centerR * 2));
                petal7.setAttribute("r", (centerR / 2));
                petal7.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal7.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                let petal8 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                petal8.setAttribute("cx", xPos + (centerR * triSide));
                petal8.setAttribute("cy", yPos + (centerR * triSide));
                petal8.setAttribute("r", (centerR / 2));
                petal8.setAttribute("fill", `rgb(${r1},${g1},${b1})`);
                petal8.setAttribute("id", "petal_" + document.getElementsByTagName('circle').length);

                svg.appendChild(petal1);
                svg.appendChild(petal2);
                svg.appendChild(petal3);
                svg.appendChild(petal4);
                svg.appendChild(petal5);
                svg.appendChild(petal6);
                svg.appendChild(petal7);
                svg.appendChild(petal8);
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // otherwise don't draw any, but check to make sure the user doesn't want any
        } else {
            console.log('are you sure you don\'t want circles with your circles?');
        }
    }

}


drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawCircle();
drawPetals(2);