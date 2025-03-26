import songs from "./config.js";

const codecFrequencyEl = document.querySelector("#codec-frequency");
const changeFreqBtnsEl = {
    dFreq: document.getElementById("decrease-freq-btn"),
    iFreq: document.getElementById("increase-freq-btn")
}
const songInfoEl = document.getElementById("main-info");
const songNavigateEl = document.querySelector("#main-infoscroll-btn");
const SOUND_EFFECTS = [
    document.getElementById("soundeffect-open"),
    document.getElementById("soundeffect-codeccall"),
    document.getElementById("soundeffect-codecover"),
    document.getElementById("soundeffect-changeFreq"),
    document.getElementById("soundeffect-itemused"),
];

let info = [
    `
        <p class="mtp05"> <span class='codec-font accept-call'>NAME</span> <span class="mgsv-font med-font mlp05">Snake Eater</span></p>
        <p class="mtp075"> <span class='codec-font accept-call'>FREQ</span> <span class="small15-font codec-font mlp05">140.85</span></p>
        <p class="mtp075"> <span class='codec-font optional-call'>GAME</span> <span class="mgsv-font med-font mlp05">MGS3: Snake Eater</span></p>
        <p class="mtp075"> <span class='codec-font optional-call'>GENRE</span> <span class="med-font mgsv-font mlp05">Jazz, Soul, Orchestral Pop</span></p>       
    `,
    `
       <div class='black-filter'></div>
       <div class="song-freqrecord">
            <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
       </div>
       <div class="song-freqrecord">
           <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
        </div>
       <div class="song-freqrecord">
            <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
       </div>
       <div class="song-freqrecord">
            <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
       </div>
    `,
    `
    `,

];
let lastFrequency = 140.85;
let infoLvl = 0;

function changeFreq(input) {
    SOUND_EFFECTS[3].play();
    
    if (input === '+') {
        changeFreqBtnsEl.iFreq.style.color = "#479787"
        lastFrequency = (Number(lastFrequency) + 0.01).toFixed(2);
        codecFrequencyEl.textContent = (lastFrequency);
    } else if (input === '-') {
        changeFreqBtnsEl.dFreq.style.color = "#479787"
        lastFrequency = (Number(lastFrequency) - 0.01).toFixed(2);
        codecFrequencyEl.textContent = lastFrequency;
    }
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        changeFreq('-');
    } else if (e.key === "ArrowRight") {
        changeFreq('+');
    }

    if (e.key === "Enter") {
        SOUND_EFFECTS[1].play();
        document.querySelector('#PTT').style.color = "#96F3F1";
        window.setTimeout(() => {
            document.querySelector('#PTT').style.color = "#2A6A5C";
        }, 1000)
    }

});
window.addEventListener("keyup", (e) => {
    changeFreqBtnsEl.dFreq.style.color = "#2A6A5C";
    changeFreqBtnsEl.iFreq.style.color = "#2A6A5C";
});

changeFreqBtnsEl.iFreq.addEventListener("click", () => {
    changeFreq('+');
    window.setTimeout(() => {
        changeFreqBtnsEl.iFreq.style.color = "#2A6A5C";
    }, 1000)
})
changeFreqBtnsEl.dFreq.onclick = () => {
    changeFreq('-');
    window.setTimeout(() => {
        changeFreqBtnsEl.dFreq.style.color = "#2A6A5C";
    }, 1000)
}

songNavigateEl.addEventListener("click", function() {
    if (infoLvl > 2) {
        infoLvl = 0;
    } else {
        infoLvl += 1;
    }
    
    songInfoEl.innerHTML = info[infoLvl];
    document.getElementById("main-infoscroll-n").innerHTML = `${infoLvl + 1}`;
});

document.addEventListener("click", () => {
    SOUND_EFFECTS[0].play();
    window.setTimeout(() => {
        SOUND_EFFECTS[4].play();
    }, 1000)
}, {
    once: true,
});


