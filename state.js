// grid size
let SIZE = 10;

// current language and level
let currentLevel = "medium";
let currentLanguage = "en";

// words of the current game
let WORDS = [];

// grid starts empty
const grid = [];

// words per game
const WORDS_PER_GAME = 10;

// game state
// remembering the first clicked cell AND its position
let firstCell = null;
let firstRow = 0;
let firstCol = 0;
let foundCount = 0;


// victory
let pendingTime = 0;

// name generator
let generatedAnimal = "";
let generatedAnimalName = "";
let generatedFullName = "";

// accent safe helpers
function lettersOf(word){ return Array.from(word.normalize("NFC")); }
function letterCount(word){ return lettersOf(word).length; }

// deciding which directions are allowed
function getDirections(){
    return currentLevel === "easy" ? DIRECTIONS_EASY : DIRECTIONS_FULL;
}

// references
const gridDiv = document.getElementById("grid");
const wordListUl = document.getElementById("word-list");
const levelButtons = document.querySelectorAll("#level-group .option-btn");
const languageButtons = document.querySelectorAll("#language-group .option-btn");
const oceanScene = document.getElementById("ocean-scene");
const playButton = document.getElementById("play-button");
const oceanPolluted = document.getElementById("ocean-polluted");
const trashItems = document.querySelectorAll(".trash-item");

// saved settings
let savedSize = null;
let savedLanguage = null;
let savedLevel = null;

try {
    savedSize = localStorage.getItem("aquasearch-size");
    savedLanguage = localStorage.getItem("aquasearch-language");
    savedLevel = localStorage.getItem("aquasearch-level");
} catch (error) {}

function savedValueIsValid(value, buttons, attribute){
    if (value == null) return false;
    for (const btn of buttons){
        if (btn.dataset[attribute] === value) return true;
    }
    return false;
}

if (savedValueIsValid(savedSize, levelButtons, "size")) {
    SIZE = parseInt(savedSize);
}

if (savedValueIsValid(savedLanguage, languageButtons, "language")){
    currentLanguage = savedLanguage;
}

if (savedValueIsValid(savedLevel, levelButtons, "level")){
    currentLevel = savedLevel;
}

/* ===== WORD SELECTION ===== */
function chooseRandomWords() {
    const fullPool = WORD_POOLS[currentLanguage][currentLevel];
    const pool = [...fullPool].filter(word => letterCount(word) <= SIZE);
    const selection = [];
    while (selection.length < WORDS_PER_GAME && pool.length > 0) {
        const index = Math.floor(Math.random() * pool.length);
        selection.push(pool[index]);
        pool.splice(index, 1);
    }
    return selection;
}