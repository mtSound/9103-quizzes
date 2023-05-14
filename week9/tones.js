'use strict';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TONE IMPLEMENTATION FOR CA GENERATION
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// set the bpm for playback
Tone.Transport.bpm.value = 180;

// set up some gain nodes for volume adjstment
const gainNode = new Tone.Gain(0.2).toDestination();
const gainNode2 = new Tone.Gain(0.5).toDestination();

// this is the synth that's played for each row of the CA
const synth = new Tone.Synth().connect(gainNode);
let descAMinorScale = ['G6', 'F6', 'E6', 'D6', 'C6', 'B6', 'A6'];

function nextPitch() {
    let n = descAMinorScale.shift()
    descAMinorScale.push(n)
    return n
}

//
//let playButton = document.getElementById("play");
playBtn.onclick = play;

document.getElementById("stop").addEventListener("click", function () {
    if (Tone.Transport.state !== 'started') {
        Tone.Transport.start();
        // change state of music btn
        stopBtn.style.backgroundColor = 'rgb(240, 236, 233)';
        stopBtn.style.color = 'rgb(0, 0, 0)';
        stopBtn.innerHTML = 'STOP MUSIC'
    } else {
        Tone.Transport.stop();
        resetMusicState();
    }
});


const mainMelody = [
    //////////
    // INTRO
    // bar 1
    { 'time': 0, 'note': 'E5', 'duration': '8n' },
    { 'time': '0:0:2', 'note': 'E5', 'duration': '8n' },
    { 'time': '0:1:2', 'note': 'E5', 'duration': '8n' },
    { 'time': '0:2:2', 'note': 'C5', 'duration': '8n' },
    { 'time': '0:3:0', 'note': 'E5', 'duration': '4n' },
    // bar 2
    { 'time': '1:0:0', 'note': 'G5', 'duration': '4n' },
    { 'time': '1:2:0', 'note': 'G4', 'duration': '4n' },

    //////////
    // MAIN
    // bar 3
    { 'time': '2:0:0', 'note': 'C5', 'duration': '4n' },
    { 'time': '2:1:2', 'note': 'G4', 'duration': '4n' },
    { 'time': '2:3:0', 'note': 'E4', 'duration': '4n' },
    // bar 4
    { 'time': '3:0:2', 'note': 'A4', 'duration': '4n' },
    { 'time': '3:1:2', 'note': 'B4', 'duration': '4n' },
    { 'time': '3:2:2', 'note': 'Bb4', 'duration': '8n' },
    { 'time': '3:3:0', 'note': 'A4', 'duration': '4n' },
    // bar 5
    { 'time': '4:0:0', 'note': 'G4', 'duration': '4t' },
    { 'time': '4:0:2.333', 'note': 'E5', 'duration': '4t' },
    { 'time': '4:1:1.333', 'note': 'G5', 'duration': '4t' },
    { 'time': '4:2:0', 'note': 'A5', 'duration': '4n' },
    { 'time': '4:3:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '4:3:2', 'note': 'G5', 'duration': '8n' },
    // bar 6
    { 'time': '5:0:2', 'note': 'E5', 'duration': '4n' },
    { 'time': '5:1:2', 'note': 'C5', 'duration': '8n' },
    { 'time': '5:2:0', 'note': 'D5', 'duration': '8n' },
    { 'time': '5:2:2', 'note': 'B4', 'duration': '4n' },

    //////////
    // REPEAT
    // bar 3
    { 'time': '6:0:0', 'note': 'C5', 'duration': '4n' },
    { 'time': '6:1:2', 'note': 'G4', 'duration': '4n' },
    { 'time': '6:3:0', 'note': 'E4', 'duration': '4n' },
    // bar 4
    { 'time': '7:0:2', 'note': 'A4', 'duration': '4n' },
    { 'time': '7:1:2', 'note': 'B4', 'duration': '4n' },
    { 'time': '7:2:2', 'note': 'Bb4', 'duration': '8n' },
    { 'time': '7:3:0', 'note': 'A4', 'duration': '4n' },
    // bar 5
    { 'time': '8:0:0', 'note': 'G4', 'duration': '4t' },
    { 'time': '8:0:2.333', 'note': 'E5', 'duration': '4t' },
    { 'time': '8:1:1.333', 'note': 'G5', 'duration': '4t' },
    { 'time': '8:2:0', 'note': 'A5', 'duration': '4n' },
    { 'time': '8:3:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '8:3:2', 'note': 'G5', 'duration': '8n' },
    // bar 6
    { 'time': '9:0:2', 'note': 'E5', 'duration': '4n' },
    { 'time': '9:1:2', 'note': 'C5', 'duration': '8n' },
    { 'time': '9:2:0', 'note': 'D5', 'duration': '8n' },
    { 'time': '9:2:2', 'note': 'B4', 'duration': '4n' },


    //////////
    // PT2
    // bar 7
    { 'time': '10:1:0', 'note': 'G5', 'duration': '8n' },
    { 'time': '10:1:2', 'note': 'F#5', 'duration': '8n' },
    { 'time': '10:2:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '10:2:2', 'note': 'D#5', 'duration': '4n' },
    { 'time': '10:3:2', 'note': 'E5', 'duration': '8n' },

    // bar 8
    { 'time': '11:0:2', 'note': 'G#4', 'duration': '8n' },
    { 'time': '11:1:0', 'note': 'A4', 'duration': '8n' },
    { 'time': '11:1:2', 'note': 'C5', 'duration': '8n' },
    { 'time': '11:2:2', 'note': 'A4', 'duration': '8n' },
    { 'time': '11:3:0', 'note': 'C5', 'duration': '8n' },
    { 'time': '11:3:2', 'note': 'D5', 'duration': '8n' },

    // bar 9
    { 'time': '12:1:0', 'note': 'G5', 'duration': '8n' },
    { 'time': '12:1:2', 'note': 'F#5', 'duration': '8n' },
    { 'time': '12:2:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '12:2:2', 'note': 'D#5', 'duration': '4n' },
    { 'time': '12:3:2', 'note': 'E5', 'duration': '8n' },

    //////
    // bar 10
    { 'time': '13:0:2', 'note': 'G4', 'duration': '4n' },
    { 'time': '13:1:2', 'note': 'G4', 'duration': '8n' },
    { 'time': '13:2:0', 'note': 'G4', 'duration': '4n' },

    // bar 11
    { 'time': '14:1:0', 'note': 'G5', 'duration': '8n' },
    { 'time': '14:1:2', 'note': 'F#5', 'duration': '8n' },
    { 'time': '14:2:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '14:2:2', 'note': 'D#5', 'duration': '4n' },
    { 'time': '14:3:2', 'note': 'E5', 'duration': '8n' },

    // bar 12
    { 'time': '15:0:2', 'note': 'G#4', 'duration': '8n' },
    { 'time': '15:1:0', 'note': 'A4', 'duration': '8n' },
    { 'time': '15:1:2', 'note': 'C5', 'duration': '8n' },
    { 'time': '15:2:2', 'note': 'A4', 'duration': '8n' },
    { 'time': '15:3:0', 'note': 'C5', 'duration': '8n' },
    { 'time': '15:3:2', 'note': 'D5', 'duration': '8n' },

    // bar 13
    { 'time': '16:1:0', 'note': 'Eb5', 'duration': '4n' },
    { 'time': '16:2:2', 'note': 'D5', 'duration': '4n' },

    // bar 14
    { 'time': '17:0:0', 'note': 'C5', 'duration': '4n' },

    //////////
    // PT2 - REPEAT
    // bar 7
    { 'time': '18:1:0', 'note': 'G5', 'duration': '8n' },
    { 'time': '18:1:2', 'note': 'F#5', 'duration': '8n' },
    { 'time': '18:2:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '18:2:2', 'note': 'D#5', 'duration': '4n' },
    { 'time': '18:3:2', 'note': 'E5', 'duration': '8n' },

    // bar 8
    { 'time': '19:0:2', 'note': 'G#4', 'duration': '8n' },
    { 'time': '19:1:0', 'note': 'A4', 'duration': '8n' },
    { 'time': '19:1:2', 'note': 'C5', 'duration': '8n' },
    { 'time': '19:2:2', 'note': 'A4', 'duration': '8n' },
    { 'time': '19:3:0', 'note': 'C5', 'duration': '8n' },
    { 'time': '19:3:2', 'note': 'D5', 'duration': '8n' },

    // bar 9
    { 'time': '20:1:0', 'note': 'G5', 'duration': '8n' },
    { 'time': '20:1:2', 'note': 'F#5', 'duration': '8n' },
    { 'time': '20:2:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '20:2:2', 'note': 'D#5', 'duration': '4n' },
    { 'time': '20:3:2', 'note': 'E5', 'duration': '8n' },

    //////
    // bar 10
    { 'time': '21:0:2', 'note': 'G4', 'duration': '4n' },
    { 'time': '21:1:2', 'note': 'G4', 'duration': '8n' },
    { 'time': '21:2:0', 'note': 'G4', 'duration': '4n' },

    // bar 11
    { 'time': '22:1:0', 'note': 'G5', 'duration': '8n' },
    { 'time': '22:1:2', 'note': 'F#5', 'duration': '8n' },
    { 'time': '22:2:0', 'note': 'F5', 'duration': '8n' },
    { 'time': '22:2:2', 'note': 'D#5', 'duration': '4n' },
    { 'time': '22:3:2', 'note': 'E5', 'duration': '8n' },

    // bar 12
    { 'time': '23:0:2', 'note': 'G#4', 'duration': '8n' },
    { 'time': '23:1:0', 'note': 'A4', 'duration': '8n' },
    { 'time': '23:1:2', 'note': 'C5', 'duration': '8n' },
    { 'time': '23:2:2', 'note': 'A4', 'duration': '8n' },
    { 'time': '23:3:0', 'note': 'C5', 'duration': '8n' },
    { 'time': '23:3:2', 'note': 'D5', 'duration': '8n' },

    // bar 13
    { 'time': '24:1:0', 'note': 'Eb5', 'duration': '4n' },
    { 'time': '24:2:2', 'note': 'D5', 'duration': '4n' },

    // bar 14
    { 'time': '25:0:0', 'note': 'C5', 'duration': '4n' },

];

const suppLine = [
    //////
    // bar 10
    { 'time': '13:0:2', 'note': 'C6', 'duration': '4n' },
    { 'time': '13:1:2', 'note': 'C6', 'duration': '8n' },
    { 'time': '13:2:0', 'note': 'C6', 'duration': '4n' },
]

const bassline = [
    //////////
    // INTRO
    // bar 1
    { 'time': 0, 'note': 'D2', 'duration': '8n' },
    { 'time': '0:0:2', 'note': 'D2', 'duration': '8n' },
    { 'time': '0:1:2', 'note': 'D2', 'duration': '8n' },
    { 'time': '0:2:2', 'note': 'D2', 'duration': '8n' },
    { 'time': '0:3:0', 'note': 'D2', 'duration': '4n' },
    // bar 2
    { 'time': '1:0:0', 'note': 'G3', 'duration': '4n' },
    { 'time': '1:2:0', 'note': 'G2', 'duration': '4n' },

    //////////
    // MAIN
    // bar 3
    { 'time': '2:0:0', 'note': 'G3', 'duration': '4n' },
    { 'time': '2:1:2', 'note': 'E3', 'duration': '4n' },
    { 'time': '2:3:0', 'note': 'C3', 'duration': '4n' },
    // bar 4
    { 'time': '3:0:2', 'note': 'F3', 'duration': '4n' },
    { 'time': '3:1:2', 'note': 'G3', 'duration': '4n' },
    { 'time': '3:2:2', 'note': 'Gb3', 'duration': '8n' },
    { 'time': '3:3:0', 'note': 'F3', 'duration': '4n' },
    // bar 5
    { 'time': '4:0:0', 'note': 'E3', 'duration': '4t' },
    { 'time': '4:0:2.333', 'note': 'C4', 'duration': '4t' },
    { 'time': '4:1:1.333', 'note': 'E4', 'duration': '4t' },
    { 'time': '4:2:0', 'note': 'F4', 'duration': '4n' },
    { 'time': '4:3:0', 'note': 'D4', 'duration': '8n' },
    { 'time': '4:3:2', 'note': 'E4', 'duration': '8n' },
    // bar 6
    { 'time': '5:0:2', 'note': 'C4', 'duration': '4n' },
    { 'time': '5:1:2', 'note': 'A3', 'duration': '8n' },
    { 'time': '5:2:0', 'note': 'B3', 'duration': '8n' },
    { 'time': '5:2:2', 'note': 'G3', 'duration': '4n' },

    //////////
    // REPEAT
    // bar 3
    { 'time': '6:0:0', 'note': 'G3', 'duration': '4n' },
    { 'time': '6:1:2', 'note': 'E3', 'duration': '4n' },
    { 'time': '6:3:0', 'note': 'C3', 'duration': '4n' },
    // bar 4
    { 'time': '7:0:2', 'note': 'F3', 'duration': '4n' },
    { 'time': '7:1:2', 'note': 'G3', 'duration': '4n' },
    { 'time': '7:2:2', 'note': 'Gb3', 'duration': '8n' },
    { 'time': '7:3:0', 'note': 'F3', 'duration': '4n' },
    // bar 5
    { 'time': '8:0:0', 'note': 'E3', 'duration': '4t' },
    { 'time': '8:0:2.333', 'note': 'C4', 'duration': '4t' },
    { 'time': '8:1:1.333', 'note': 'E4', 'duration': '4t' },
    { 'time': '8:2:0', 'note': 'F4', 'duration': '4n' },
    { 'time': '8:3:0', 'note': 'D4', 'duration': '8n' },
    { 'time': '8:3:2', 'note': 'E4', 'duration': '8n' },
    // bar 6
    { 'time': '9:0:2', 'note': 'C4', 'duration': '4n' },
    { 'time': '9:1:2', 'note': 'A3', 'duration': '8n' },
    { 'time': '9:2:0', 'note': 'B3', 'duration': '8n' },
    { 'time': '9:2:2', 'note': 'G3', 'duration': '4n' },


    //////////
    // PT2
    // bar 7
    { 'time': '10:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '10:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '10:3:0', 'note': 'C4', 'duration': '4n' },

    // bar 8
    { 'time': '11:0:0', 'note': 'F3', 'duration': '4n' },
    { 'time': '11:1:2', 'note': 'C4', 'duration': '8n' },
    { 'time': '11:2:0', 'note': 'C4', 'duration': '4n' },
    { 'time': '11:3:0', 'note': 'F3', 'duration': '4n' },

    // bar 9
    { 'time': '12:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '12:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '12:3:0', 'note': 'G3', 'duration': '8n' },
    { 'time': '12:3:0', 'note': 'C4', 'duration': '8n' },

    // bar 10
    { 'time': '13:3:0', 'note': 'G3', 'duration': '4n' },

    // bar 11
    { 'time': '14:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '14:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '14:3:0', 'note': 'C4', 'duration': '4n' },

    // bar 12
    { 'time': '15:0:0', 'note': 'F3', 'duration': '4n' },
    { 'time': '15:1:2', 'note': 'C4', 'duration': '8n' },
    { 'time': '15:2:0', 'note': 'C4', 'duration': '4n' },
    { 'time': '15:3:0', 'note': 'F3', 'duration': '4n' },

    // bar 13
    { 'time': '16:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '16:1:0', 'note': 'Ab3', 'duration': '4n' },
    { 'time': '16:2:2', 'note': 'Bb3', 'duration': '4n' },

    // bar 14
    { 'time': '17:0:0', 'note': 'C4', 'duration': '4n' },
    { 'time': '17:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '17:2:0', 'note': 'G3', 'duration': '4n' },
    { 'time': '17:3:0', 'note': 'C3', 'duration': '4n' },

    //////////
    // PT2
    // bar 7
    { 'time': '18:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '18:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '18:3:0', 'note': 'C4', 'duration': '4n' },

    // bar 8
    { 'time': '19:0:0', 'note': 'F3', 'duration': '4n' },
    { 'time': '19:1:2', 'note': 'C4', 'duration': '8n' },
    { 'time': '19:2:0', 'note': 'C4', 'duration': '4n' },
    { 'time': '19:3:0', 'note': 'F3', 'duration': '4n' },

    // bar 9
    { 'time': '20:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '20:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '20:3:0', 'note': 'G3', 'duration': '8n' },
    { 'time': '20:3:0', 'note': 'C4', 'duration': '8n' },

    // bar 10
    { 'time': '21:3:0', 'note': 'G3', 'duration': '4n' },

    // bar 11
    { 'time': '22:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '22:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '22:3:0', 'note': 'C4', 'duration': '4n' },

    // bar 12
    { 'time': '23:0:0', 'note': 'F3', 'duration': '4n' },
    { 'time': '23:1:2', 'note': 'C4', 'duration': '8n' },
    { 'time': '23:2:0', 'note': 'C4', 'duration': '4n' },
    { 'time': '23:3:0', 'note': 'F3', 'duration': '4n' },

    // bar 13
    { 'time': '24:0:0', 'note': 'C3', 'duration': '4n' },
    { 'time': '24:1:0', 'note': 'Ab3', 'duration': '4n' },
    { 'time': '24:2:2', 'note': 'Bb3', 'duration': '4n' },

    // bar 14
    { 'time': '25:0:0', 'note': 'C4', 'duration': '4n' },
    { 'time': '25:1:2', 'note': 'G3', 'duration': '8n' },
    { 'time': '25:2:0', 'note': 'G3', 'duration': '4n' },
    { 'time': '25:3:0', 'note': 'C3', 'duration': '4n' },
];

const lead = new Tone.AMSynth({
    oscillator: {
        volume: 5,
        count: 3,
        spread: 40,
        type: "fatsawtooth"
    }
}).connect(gainNode2);

const mainMelodyPart = new Tone.Part(function (time, note) {
    lead.triggerAttackRelease(note.note, note.duration, time);
}, mainMelody).start(0);

const suppLead = new Tone.AMSynth({
    oscillator: {
        volume: 5,
        count: 3,
        spread: 40,
        type: "fatsawtooth"
    }
}).connect(gainNode2);

const suppMelodyPart = new Tone.Part(function (time, note) {
    suppLead.triggerAttackRelease(note.note, note.duration, time);
}, suppLine).start(0);


const bass = new Tone.AMSynth({
    oscillator: {
        volume: 5,
        count: 3,
        spread: 40,
        type: "triangle"
    }
}).connect(gainNode2);

const bassPart = new Tone.Part(function (time, note) {
    bass.triggerAttackRelease(note.note, note.duration, time);
}, bassline).start(0);
