"use strict";

// Turn theremin on
function thereminOn(oscillator, oscillator2) {
    oscillator.play();
    oscillator2.play();
}

// Control the theremin
function thereminControl(e, oscillator, oscillator2, numSemitones, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;

    let freq = document.getElementById('frequency');
    freq.innerHTML = "Frequency: " + oscillator.frequency + " Hz";

    let note = document.getElementById('note');
    note.innerHTML = "Note: " + noteFromFrequency(oscillator.frequency, true) + " & " + outOfTune(oscillator.frequency);

    oscillator2.volume = thereminVolume;
    let thereminFreq2 = interval(oscillator.frequency, numSemitones);
    console.log("Frequency2: ", thereminFreq2);
    oscillator2.frequency = thereminFreq2;

    if (numSemitones != 0) {
        let freq2 = document.getElementById('frequency2');
        freq2.innerHTML = "Second Frequency (from interval): " + oscillator2.frequency + " Hz";

        let note2 = document.getElementById('note2');
        note2.innerHTML = "Second Note (from interval): " + noteFromFrequency(oscillator2.frequency, true) + " & " + outOfTune(oscillator.frequency);
    }
}

// Turn theremin off
function thereminOff(oscillator, oscillator2) {
    oscillator.stop();
    oscillator2.stop();
}

function outOfTune(frequency) {
    let midinum = midiFromFrequency(frequency);
    let semitones = midinum - 69;
    let curNote = 12 * Math.log2(frequency / 440);
    let cents = semitones - curNote;

    if (cents < 0) {
        return Math.abs(cents) + " cents flat";
    } else if (cents > 0) {
        return cents + " cents sharp"
    } else {
        return "in tune"
    }
}

function runAfterLoadingPage() {

    // gets parameters from the user input
    let params = (new URL(document.location)).searchParams;
    let numSemitones = 0;
    let wave = "sine"
    if (params.has('interval')) {
        numSemitones = params.get('interval');
    }
    if (params.has('wavetype')) {
        wave = params.get('wavetype');
    }

    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: wave,
            frequency: 220
        }
    });

    const oscillator2 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: wave,
            frequency: 220
        }
    });

    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function() {
        thereminOn(oscillator, oscillator2);
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function(e) {
        thereminControl(e, oscillator, oscillator2, numSemitones, theremin);
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function() {
        thereminOff(oscillator, oscillator2);
    });
}

window.onload = runAfterLoadingPage;