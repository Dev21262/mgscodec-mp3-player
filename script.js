import { songs, data } from "./config.js";
import updateStorage from "./update.js";

const codecFrequencyEl = document.querySelector("#codec-frequency");
const changeFreqBtnsEl = {
    dFreq: document.getElementById("decrease-freq-btn"),
    iFreq: document.getElementById("increase-freq-btn")
}
const tuneBtnEl = document.getElementById("tune-btn");
const songInfoEl = document.getElementById("song-info");
const songImageEl = document.getElementById("song-image");
const songNavigateEl = document.querySelector("#song-infoscroll-btn");
const SOUND_EFFECTS = [
    document.getElementById("soundeffect-open"),
    document.getElementById("soundeffect-codeccall"),
    document.getElementById("soundeffect-codecover"),
    document.getElementById("soundeffect-changeFreq"),
    document.getElementById("soundeffect-itemused"),
];

let infoLvl = 0;
let mutData = data; 
let lastFrequency = 142.00;
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
            <p class="ptt-font med-font">${mutData[0][1]} <span class="turquoise mgsv-font">${mutData[0][0]}</span></p>
       </div>
        <div class="song-freqrecord">
            <p class="ptt-font med-font"> ${mutData[1][1]} <span class="turquoise mgsv-font">${mutData[1][0]}</span></p>
        </div>
       <div class="song-freqrecord">
                <p class="ptt-font med-font">${mutData[2][1]} <span class="turquoise mgsv-font">${mutData[2][0]}</span></p>
        </diV>       
        <div class="song-freqrecord">
            <p class="ptt-font med-font"> ${mutData[3][1]} <span class="turquoise mgsv-font">${mutData[3][0]}</span></p>
       </div>
       <div class="song-freqrecord">
            <p class="ptt-font med-font">${mutData[4][1]} <span class="turquoise mgsv-font">${mutData[4][0]}</span></p>
       </div>

       `,
    `
    `,

];


function changeFreq(input) {
    SOUND_EFFECTS[3].play();
    
    if (input === '+') {
        changeFreqBtnsEl.iFreq.style.color = "#479787"
        lastFrequency = (Number(lastFrequency) + 0.01).toFixed(2);
    } else if (input === '-') {
        changeFreqBtnsEl.dFreq.style.color = "#479787"
        lastFrequency = (Number(lastFrequency) - 0.01).toFixed(2);
    }
    codecFrequencyEl.textContent = lastFrequency.toString();
}

let playMP3 = () => {
    SOUND_EFFECTS[1].play();

    document.querySelector('#PTT').style.color = "#96F3F1";
    window.setTimeout(() => {
        document.querySelector('#PTT').style.color = "#2A6A5C";

        songs.forEach((obj) => {
            if (lastFrequency == obj._freq) {
                //arr's structure [name, frequency, timesPlayed];
                for (let arr of mutData) {
                    if (arr[0] === obj._name) {
                        arr[2] += 1; 
                        updateStorage(mutData)
                    }

                    mutData = mutData.sort((arr1, arr2) => {
                        return arr2[2] - arr1[2];
                        //arr's structure [name, frequency, timesPlayed];
                    });
                }
                
                songImageEl.src = obj._coverart;
                info[0] = `
                <p class="mtp05"> <span class='codec-font accept-call'>NAME</span> <span class="mgsv-font med-font mlp05">${obj._name}</span></p>
                <p class="mtp075"> <span class='codec-font accept-call'>FREQ</span> <span class="small15-font codec-font mlp05">${obj._freq}</span></p>
                <p class="mtp075"> <span class='codec-font optional-call'>GAME</span> <span class="mgsv-font med-font mlp05">${obj._game}</span></p>
                <p class="mtp075"> <span class='codec-font optional-call'>GENRE</span> <span class="med-font mgsv-font mlp05">${obj._genre}</span></p>`;
                songInfoEl.innerHTML = info[infoLvl];
                const mp3 = new Audio(obj._songpath);
                mp3.play();
            }
        })
    }, 1100);
}

window.addEventListener("keydown", (e) => {
    e.key === "ArrowLeft" ? changeFreq('-') : e.key === "ArrowRight" ? changeFreq('+') : null
    e.key === "Enter" && playMP3()
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

tuneBtnEl.onclick = () => playMP3() 

songNavigateEl.addEventListener("click", function() {
    if (infoLvl > 2) {
        infoLvl = 0;
    } else {
        infoLvl += 1;
    }
    
    songInfoEl.innerHTML = info[infoLvl];
    document.getElementById("song-infoscroll-n").innerHTML = `${infoLvl + 1}`;
});

document.addEventListener("click", () => {
    // SOUND_EFFECTS[0].play();
    window.setTimeout(() => {
        // SOUND_EFFECTS[4].play();
    }, 1000)
}, {
    once: true,
});


