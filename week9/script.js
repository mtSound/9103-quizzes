'use strict';

const getAudioContext = () => {
    AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();

    return { audioContext, analyser };
}

// buttons

let playBtn = document.getElementById('play');
let resetBtn = document.getElementById('reset');
let stopBtn = document.getElementById('stop');


let rules = ruleSetGen();
let granularity = 500;
let ca = new ECA(rules, granularity);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CANVAS SETUP
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// because I'm overlaying one svg canvas on top of another and I have my buttons in a separate div,
// I take the height of the button element and set the bg canvas to the window height minus the height of the
// button div. 
let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight;
const buttonRow = document.querySelector('.transport');
let buttonRowHeight = buttonRow.offsetHeight;
const bgSvg = document.querySelector('#background-canvas')
bgSvg.style.width = containerWidth;
bgSvg.style.height = containerHeight - buttonRowHeight;


// the svg grid doesn't seem to change canvas size on browser resize, but it will on a refresh - expect it's to do with 
// CSS styling. I prefer a square canvas for this project, so I'm using the window.innerHeight property
// for both the width and height of the canvas. I'm also rounding the dimensions to the nearest hundred.
let width = round((window.innerHeight - buttonRowHeight) * 0.8, 100);
let height = round((window.innerHeight - buttonRowHeight) * 0.8, 100);
let resolution = 10;
const svg = document.querySelector('#grid')
svg.style.width = width;
svg.style.height = height;

let cellSize = width / ca.row.length;
let rowLimit = height / cellSize;

////// CREATE BG CANVAS CELLS
let bgCells = createCellsArray(1500);
for (let bgcell of bgCells) {
    bgcell.makeBgCell();
}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SEQUENCE
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// how quickly each row appears
let stepInterval = 25;

let isPlaying = false;

// need to define rowCount and myAnimation outside of the function scopes so that it's accessible to both startSeq and stopSeq
let rowCount;
let myAnimation;


function stopSeq() {
    isPlaying = false;
    clearInterval(myAnimation);
    svg.replaceChildren();

    // if we don't reset rowCount, the animation gets a bit weird...
    rowCount = 0;

    // reset play button to its initial states
    resetPlay();
    resetMusicState();
    Tone.Transport.stop();
    
}


function startSeq() {
    // if I don't replace the children here, multiple clicks of the 'generate button' will just 
    //append new cells on top of the old ones
    svg.replaceChildren();

    // this changes the styling of the generate button so we know it's running
    togglePlayState();
    

    // only move forward if we're not currently playing
    if (!isPlaying) {

        // Here I call a new random ruleset
        ca.rules = ruleSetGen();
        isPlaying = true;
       
        // need to define the iterator outside of the scope of the below loop
        rowCount = 0;

        let myAnimation = setInterval(function () {
            if (rowCount === rowLimit) {
                clearInterval(myAnimation);
                isPlaying = false;

                // this changes the styling of the generate button back to the original state so we know it's stopped running
                // because I'm using random rule sets, sometimes the output is effectively blank and it's not clear whether or
                // not something is wrong with the loop
                resetPlay();
            }

            // loop through each cell
            if (isPlaying === true){
            synth.triggerAttackRelease(nextPitch(), "64n");
            //console.log("tone called")
            }

            ca.row.forEach((cell, i) => {
                // This draws the alive tiles (and only the alive tiles)
                if (cell === 1) {
                    if (isPlaying === true) {
                        let svgCell = square(
                            i * cellSize,
                            rowCount * cellSize,
                            cellSize,
                            'black'
                        )
                        svg.appendChild(svgCell);
                    }
                }
            });
            // Calculate the next generation of the automata and move the loop ahead one step
            ca.generateNextRow()
            rowCount++
        }, stepInterval);

    }
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GO GO GO GOOOOOO
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('play').addEventListener("click", startSeq);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STOP & RESET
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('reset').addEventListener("click", stopSeq);
