'use strict';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a simple function for rounding to a unit
// takes the number input, and a rounding value - which could be 10, 100, 1000 etc.
function round(num, roundTo) {
    let roundedNum = Math.round(num / roundTo) * roundTo
    return roundedNum;
}

// random number in a specified range
function randomNum(lower, upper) {
    let num = lower + Math.random() * (upper - lower);
    return num;
}

// returns a 0 or a 1 - using for randomly generating rulesets
function randBinary() {
    return Math.round(Math.random());
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUTTON / PLAY-STATE FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function togglePlayState() {
    playBtn.style.backgroundColor = 'rgb(240, 236, 233)';
    playBtn.style.color = 'rgb(0, 0, 0)';
    playBtn.innerHTML = 'GENERATING'
}

function resetMusicState() {
    stopBtn.style.backgroundColor = 'rgb(0, 0, 0)';
    stopBtn.style.color = 'rgb(240, 236, 233)';
    stopBtn.innerHTML = 'PLAY MUSIC'
}

function resetPlay() {
    playBtn.style.backgroundColor = 'rgb(0,0,0)'
    playBtn.style.color = 'rgb(240, 236, 233)';
    playBtn.innerHTML = 'GENERATE'
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SVG OBJECT CREATION FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// draw square - using for the CA, as well as the bgCells and the loading cells
function square(x, y, size, colour) {
    let square = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
    square.setAttribute('x', x);
    square.setAttribute('y', y);
    square.setAttribute('width', size);
    square.setAttribute('height', size);
    square.setAttribute('fill', colour);

    return square;
}


// leveraging the WK8 tutorial to create blinking cells on the bg canvas
class BGCell {
    constructor(xPos, yPos, size, colour) {
        this.x = xPos;
        this.y = yPos;
        this.size = size;
        this.colour = colour;

        this.svgElement;

        // how fast the bg cells blink
        this.animDuration = randomNum(3, 5);
    }

    makeBgCell() {
        this.svgElement = square(this.x, this.y, this.size, this.colour);
        bgSvg.appendChild(this.svgElement);
        this.blinkCell();
    }

    blinkCell() {
        let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animElement.setAttribute('attributeName', 'opacity');
        animElement.setAttribute('values', '0;0.2;0');
        animElement.setAttribute('dur', `${this.animDuration}`);
        animElement.setAttribute('repeatCount', 'indefinite');
        this.svgElement.appendChild(animElement);
    }
}

function createCellsArray(num) {
    let bgCellsize = resolution;
    let cellInstances = [];

    for (let i = 0; i < num; i++) {
        let cellX = (Math.round(Math.random() * (containerWidth / resolution))) * bgCellsize;
        let cellY = (Math.round(Math.random() * (containerHeight / resolution))) * bgCellsize;
        let newSize = bgCellsize;
        let newCol = 'rgb(0, 0, 0)';

        cellInstances.push(new BGCell(cellX, cellY, newSize, newCol));
    }

    return cellInstances;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AUTOMATA IMPLEMENTATION
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ECA {
    constructor(ruleSet, rowLength) {
        this.rules = ruleSet;
        this.row = new Array(rowLength).fill(0)
        for (let i = 0; i < this.row.length; i++) {
            this.row[i] = Math.round(Math.random());
        }
    }

    // Take a triplet and return the result using the current rule set
    transformCell(triple) {
        return this.rules[triple.join('')]
    }

    generateNextRow() {
        // start the next gen as an all 0 row
        let nextGeneration = new Array(this.row.length).fill(0);

        // Iterate through triplets
        for (let i = 1; i < this.row.length - 1; i++) {
            let triple = this.row.slice(i - 1, i + 2)
            nextGeneration[i] = this.transformCell(triple)
        }

        // Replace with the nextGeneration
        this.row = nextGeneration
    }
}

// this generates a random rule set each time the ECA is called
function ruleSetGen() {
    let randomRuleSet = {
        "000": randBinary(),
        "001": randBinary(),
        "010": randBinary(),
        "011": randBinary(),
        "100": randBinary(),
        "101": randBinary(),
        "110": randBinary(),
        "111": randBinary()
    }
    return randomRuleSet;
}
