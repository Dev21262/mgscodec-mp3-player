import songs from "./config.js";
const codecFrequency = document.querySelector("#codec-frequency");

const SOUND_EFFECTS = [
    document.getElementById("soundeffect-open"),
    document.getElementById("soundeffect-codeccall"),
    document.getElementById("soundeffect-codecover"),
    document.getElementById("soundeffect-changeFreq"),
    document.getElementById("soundeffect-itemused"),
];

const mobileBtns = {
    dFreq: document.getElementById("decrease-freq-btn"),
    iFreq: document.getElementById("increase-freq-btn")
}

const mainInfoBox = document.getElementById("main-info");
const mainInfoScroller = document.querySelector("#main-infoscroll-btn");

let lastFrequency = 140.85;
let mainInfos = [
    `
        <p class="mtp05"> <span class='codec-font accept-call'>NAME</span> <span class="mgsv-font med-font mlp05">Snake Eater</span></p>
        <p class="mtp075"> <span class='codec-font accept-call'>FREQ</span> <span class="small15-font codec-font mlp05">140.85</span></p>
        <p class="mtp075"> <span class='codec-font optional-call'>GAME</span> <span class="mgsv-font med-font mlp05">MGS3: Snake Eater</span></p>
        <p class="mtp075"> <span class='codec-font optional-call'>GENRE</span> <span class="med-font mgsv-font mlp05">Jazz, Soul, Orchestral Pop</span></p>       
    `,
    `
       <div class='black-filter'></div>
       <div class="record-freq">
            <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
       </div>
       <div class="record-freq">
           <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
        </div>
       <div class="record-freq">
            <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
       </div>
       <div class="record-freq">
            <p class="ptt-font med-font">${songs[0]._freq} <span class="turquoise mgsv-font">${songs[0]._name}</span></p>
            <p class="ptt-font med-font"> ${songs[1]._freq} <span class="turquoise mgsv-font">${songs[1]._name}</span></p>
       </div>
    `,
    `
    `,

]
let cMainInfo_LVL = 0;

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        //border-left: 0.6rem solid #2A6A5C; 
        mobileBtns.dFreq.style.color = "#479787"
        lastFrequency = (Number(lastFrequency) - 0.01).toFixed(2);
        codecFrequency.textContent = (lastFrequency);
        SOUND_EFFECTS[3].play();
    } else if (e.key === "ArrowRight") {
        mobileBtns.iFreq.style.color = "#479787"
        lastFrequency = (Number(lastFrequency) + 0.01).toFixed(2);
        codecFrequency.textContent = (lastFrequency);
        SOUND_EFFECTS[3].play();
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
    mobileBtns.dFreq.style.color = "#2A6A5C";
    mobileBtns.iFreq.style.color = "#2A6A5C";
});

mobileBtns.dFreq.onclick = () => {
    mobileBtns.dFreq.style.color = "#479787"
    window.setTimeout(() => {
        mobileBtns.dFreq.style.color = "#2A6A5C";
    }, 1000)
    lastFrequency = (lastFrequency - 0.01).toFixed(2);
    codecFrequency.textContent = (lastFrequency);
    SOUND_EFFECTS[3].play();
}

mobileBtns.iFreq.addEventListener("click", () => {
    mobileBtns.iFreq.style.color = "#479787"
    window.setTimeout(() => {
        mobileBtns.iFreq.style.color = "#2A6A5C";
    }, 1000)
    lastFrequency = (Number(lastFrequency) + 0.01).toFixed(2);
    codecFrequency.textContent = (lastFrequency);
    SOUND_EFFECTS[3].play();
})


mainInfoScroller.addEventListener("click", function() {
    if (cMainInfo_LVL > 2) {
        cMainInfo_LVL = 0;
    } else {
        cMainInfo_LVL += 1;
    }
    
    mainInfoBox.innerHTML = mainInfos[cMainInfo_LVL];
    document.getElementById("main-infoscroll-n").innerHTML = `${cMainInfo_LVL + 1}`;
});

document.addEventListener("onclick", () => {
    SOUND_EFFECTS[0].play();
    window.setTimeout(() => {
        SOUND_EFFECTS[4].play();
    }, 1000)
}, {
    once: true,
});


