let songNames = {
    00: "00 Have Yourself A Merry Little Christmas",
    01: "01 I Heard the Bells on Christmas Day",
    02: "02 So This Is Christmas",
    03: "03 Jingle Bells",
    04: "04 Santa Claus is Coming to Town",
    05: "05 The Christmas Song (Chestnuts Roasting)",
    06: "06 Silent Night",
    07: "07 The Eight Polish Foods of Christmas",
    08: "08 Oh Santa!",
    09: "09 O Holy Night",
    10: "10 God Rest Ye Merry Gentlemen",
    11: "11 Let It Snow",
    12: "12 Sleigh Ride",
    13: "13 We Wish You A Merry Christmas",
    14: "14 Deck the Halls",
    15: "15 Joy to the World",
    16: "16 White Christmas",
    17: "17 Rudolph the Red-Nosed Reindeer",
    18: "18 Blue Christmas",
    19: "19 Silver Bells",
    20: "20 Twelve Days of Christmas",
    21: "21 Can't Believe It's Christmas",
    22: "22 Feliz Navidad",
    23: "23 Winter Wonderland",
    24: "24 Carol of the Bells",
    25: "25 Peace on Earth",
    26: "26 Frosty the Snowman",
    27: "27 Here Comes Santa Claus",
    28: "28 The Night Before Christmas",
    29: "29 The Chipmunk Song (Christmas Don't Be Late)"
}

let songFiles = {
    00: "music/Have Yourself A Merry Little Christmas.mp3",
    01: "music/08 I Heard the Bells on Christmas Day.mp3",
    02: "music/So This Is Christmas.mp3",
    03: "music/01 Jingle Bells.mp3",
    04: "music/Christmas - Frank Sinatra - Santa Claus Is Coming To Town.mp3",
    05: "music/Christmas - Frank Sinatra & Nat King Cole - Chestnuts Roasting.mp3",
    06: "music/02 Silent Night.mp3",
    07: "music/The Eight Polish Foods of Christmas.mp3",
    08: "music/Oh Santa!.mp3",
    09: "music/01 - O Holy Night.mp3",
    10: "music/05 - God Rest Ye Merry Gentlemen.mp3",
    11: "music/11 Let It Snow!.mp3",
    12: "music/15 Sleigh Ride.mp3",
    13: "music/04 We Wish You A Merry Christmas.mp3",
    14: "music/03 Deck The Halls.mp3",
    15: "music/10 Joy To The World.mp3",
    16: "music/01 White Christmas.mp3",
    17: "music/08 Rudolph The Red Nose Reindeer.mp3",
    18: "music/Blue Christmas.mp3",
    19: "music/Silver Bells.mp3",
    20: "music/Twelve Days of Christmas.mp3",
    21: "music/Can't Believe It's Christmas!.mp3",
    22: "music/Feliz Navidad.mp3",
    23: "music/20 Winter Wonderland.mp3",
    24: "music/Carol of the Bells.mp3",
    25: "music/02 Peace On Earth.mp3",
    26: "music/01 Frosty The Snowman.mp3",
    27: "music/05 Here Comes Santa Claus.mp3",
    28: "music/05 The Night Before Christmas Song.mp3",
    29: "music/The Chipmunk Song.mp3"
}

let coins = 0;
let cS = false;
let cM = false;
let mode = false;
let playing = false;
let music = new Audio();
let songQueue = [];
let songlist = []; // for Playlist mode only

function clickS() {
    if (playing == false) {
        //changes color of the buttons
        let display = document.getElementById('display');
        let singles = document.getElementById('single');
        singles.style.backgroundColor = "#ffcc80";
        display.innerHTML = "Single Track mode selected, insert a coin select a song";
        cS = true;

        let multiples = document.getElementById('multiple');
        multiples.style.backgroundColor = "#efeff5";
        cM = false;

        mode = true;
    }
}

function clickM() {
    if (playing == false) {
        //changes color of the buttons
        let display = document.getElementById('display');
        let singles = document.getElementById('single');
        singles.style.backgroundColor = "#efeff5";
        cS = false;

        let multiples = document.getElementById('multiple');
        multiples.style.backgroundColor = "#ffcc80";
        display.innerHTML = "Playlist mode selected, insert coin(s) to select song(s)";
        cM = true;

        mode = true;
    }
}

function insertCoin() {
    if (mode == true) {
        if (playing == false) {
            let display = document.getElementById('display');
            let coin = document.getElementById('coinI');
            coin.style.backgroundColor = "#ffcc80";
            if (cS == true) {
                if (coins < 1) {
                    coins += 1;
                    display.innerHTML = "Select a song"
                } else {
                    display.innerHTML = "Coin already inserted, select a song"
                }
            } else {
                if (coins < 10) {
                    coins += 1;
                    console.log("Coins: " + coins);
                    display.innerHTML = "Select " + coins + " song"
                } else {
                    display.innerHTML = "Coin total maxed, select 10 song"
                }
            }
        }
    }
}

function returnCoin() {
    if (mode == true) {
        if (playing == false) {
            let display = document.getElementById('display');
            if (coins == 0) {
                display.innerHTML = "No coins to return"
            } else {
                let coin = document.getElementById('coinI');
                coin.style.backgroundColor = "#efeff5";
                coins = 0;
                display.innerHTML = "All coins returned, insert a coin to select a song"
            }
        }
    }
}

function randomTrack(min, max) {
    if (mode == true) {
        let key = Math.floor(Math.random() * (max - min)) + min;
        showDisplay(key);
    }
}

function showDisplay(id) {
    if (mode == true) {
        if (playing == false) {
            let display = document.getElementById('display');
            if (coins == 0) {
                display.innerHTML = "Insert a coin to select a song"
            } else {
                let value = parseInt(id);
                display.innerHTML = songNames[value];
                songQueue.push(id);
                console.log(songQueue);
            }
        }
    }
}

function playAudio() {
    if (mode == true) {
        if (playing == false && songQueue != []) {
            if (cM == true) {
                if (songQueue != []) {
                    let start = songQueue.length - coins;
                    if (songQueue.length < coins) {
                        start = 0;
                    }
                    let queue = [];
                    for (start; start < songQueue.length; start++) {
                        queue.push(songQueue[start]);
                        console.log(queue);
                        songlist = queue;
                    }
                    playQueue();
                }
            } else {
                let display = document.getElementById('display');
                if (coins == 0) {
                    display.innerHTML = "Insert a coin to select a song";
                } else {
                    let lastSelected = songQueue[songQueue.length - 1];
                    value = parseInt(lastSelected);
                    // if (playing == false)
                    music = new Audio(songFiles[value]);
                    display.innerHTML = songNames[value];
                    coins = 0;
                    playing = true;
                    console.log(playing);
                    music.play();
                    music.onended = function() {
                        playing = false;
                        console.log(playing);
                        display.innerHTML = "Insert a coin to select a song";
                        songQueue = [];
                        let coin = document.getElementById('coinI');
                        coin.style.backgroundColor = "#efeff5"; // to fix
                    };
                }
            }
        }
    }
}

function playQueue() {
    if (playing == false) {
        let display = document.getElementById('display');
        console.log(coins);
        if (songlist.length != 0) {
            let value = parseInt(songlist.shift());
            console.log(songlist);
            music = new Audio(songFiles[value]);
            display.innerHTML = songNames[value];
            music.play();
            playing = true;
            music.onended = function() {
                coins--;
                playing = false;
                playQueue();
                if (songlist == [] && coins > 0) {
                    display.innerHTML = coins + " coins left, select " + coins + " songs or press Return"
                }
                if (coins == 0) {
                    let coin = document.getElementById('coinI');
                    coin.style.backgroundColor = "#efeff5";
                    songlist = [];
                    display.innerHTML = "Insert a coin to select a song";
                }
            };
        }
    }
}

function stopAudio() {
    if (playing == true) {
        music.pause();
        playing = false;
        songQueue = [];
        songlist = [];
        coins = 0;
        let coin = document.getElementById('coinI');
        coin.style.backgroundColor = "#efeff5";
        console.log(songQueue);
    }
}

function nextSong() {
    if (cM == true && coins > 0) {
        music.pause();
        coins--;
        playing = false;
        playQueue();
        songQueue = [];
        if (songlist == [] && coins > 0) {
            display.innerHTML = coins + " coins left, select " + coins + " songs or press Return"
        }
        if (coins == 0) {
            let coin = document.getElementById('coinI');
            coin.style.backgroundColor = "#efeff5";
            songlist = [];
            let display = document.getElementById('display');
            display.innerHTML = "Insert a coin to select a song";
        }
    }
}