// letters to fill the board
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// board size: 10x10
let SIZE = 10;

// current level
let currentLevel = "medium";

// current language
let currentLanguage = "en";

// accent safe helpers
function lettersOf(word){
    return Array.from(word.normalize("NFC"));
}

function letterCount(word){
    return lettersOf(word).length;
}

// words
const WORD_POOLS = {
    en: {
        easy: ["WATER", "RIVER", "CLOUD", "OCEAN", "EARTH", "GREEN", "PLANT", "ANIMAL", "BEACH",
            "FLOWER", "FOREST", "RABBIT", "GARDEN", "STORM", "SUN", "RAIN", "FISH", "TURTLE",
            "SHARK", "CORAL", "TREE", "LAKE", "WHALE", "SEAGULL", "SEAL"
        ],
        medium: ["RECYCLE", "CLIMATE", "WEATHER", "DESERT", "BIOME", "NATURE", "GLACIER",
            "VOLCANO", "PLASTIC", "HABITAT", "WILDLIFE", "SUNLIGHT", "BIOMASS", "ORGANIC",
            "POLLUTION", "EROSION", "LANDFILL", "PESTICIDE", "REUSE", "REDUCE", "COMPOST",
            "ENERGY", "SMOG", "HOMEING"
        ],
        hard: ["ECOSYSTEM", "ECOLOGY", "SUSTAINABLE", "GEOTHERMAL", "ECOCIDE", "DEGRADATION",
            "POLLUANT", "ENVIRONMENT", "RENEWABLE", "MICROPLASTIC", "ATMOSPHERE",
            "HYDROPOWER", "CONSERVATION", "RESPIRATION", "REFOREST","ENDEMISM",
            "CLIMATOLOGY", "OVERFISHING", "DESPOILMENT", "SALINIZATION", "GREENHOUSE",
            "EXTINCTION", "CARBONCRADLE", "AFFOREST", "BIOPIRACY", "WETLAND"
        ]

    },
    es: {
        easy: ["AGUA", "RIO", "NUBE", "OCEANO", "TIERRA", "VERDE", "PLANTA", "ANIMAL", "PLAYA",
            "FLOR", "BOSQUE", "CONEJO", "JARDIN", "TORMENTA", "SOL", "LLUVIA", "PEZ", "TORTUGA",
            "TIBURON", "CORAL", "ARBOL", "LAGO", "BALLENA", "GAVIOTA", "FOCA"
        ],
        medium: ["RECICLAR", "CLIMA", "TIEMPO", "DESIERTO", "BIOMA", "NATURALEZA", "GLACIAR",
            "VOLCAN", "PLASTICO", "HABITAT", "SILVESTRE", "LUZSOLAR","BIOMASA", "ORGANICO",
            "EROSION", "VERTEDERO", "PESTICIDA", "REUTILIZAR", "REDUCIR", "COMPOST", "ENERGIA",
            "BASURA", "FAUNA", "SUELO", "MONTANA", "PLANETA", "SEQUIA", "DERRAME", "INCENDIO"

        ],
        hard: ["ECOSISTEMA", "ECOLOGIA", "SOSTENIBLE", "GEOTERMICO", "ECOCIDIO", "DEGRADACION",
            "CONTAMINANTE", "AMBIENTE", "RENOVABLE", "ATMOSFERA", "CONSERVACION", "RESPIRACION",
            "REFORESTAR", "ENDEMISMO", "CLIMATOLOGIA", "SOBREPESCA", "DEPREDACION", "SALINIZACION",
            "INVERNADERO", "EXTINCION", "CARBONO", "BIOPIRATERIA", "HUMEDAL", "TOXICDAD", "CALENTAMIENTO",
            "INUNDACION", "PLAGAS", "NICHO", "FOTOSINTESIS", "GEOSFERA", "ACUIFERO", "CAPADEOZONO"
        ]

    },
    de: {
        easy: ["WASSER", "FLUSS", "WOLKE", "OZEAN", "ERDE", "GRUN", "PFLANZE", "TIER", "STRAND", "BLUME",
            "WALD", "GARTEN", "STURM", "SONNE", "REGEN", "FISCH", "HAI", "KORALLE", "BAUM", "SEE", "WAL",
            "MOWE", "ROBBE"
        ],
        medium: ["RECYCLELN", "KLIMA", "WETTER", "WUSTE", "BIOM", "NATUR", "GLETSCHER", "VULKAN", "KUNSTSTOFF",
            "LEBENSRAUM", "WILDNIS", "BIOMASSE", "ORGANISCH", "EROSION", "PESTIZID", "REDUZIEREN", "KOMPOST",
            "ENERGIE", "MULL", "TIERWELT", "BODEN", "BERG", "PLANET", "DURRE", "AUSLAUFEN", "BRAND"
        ],
        hard: ["OKOSYSTEM", "OKOLOGIE", "NACHHALTIG", "GEOTHERMISCH", "OKOZID", "DEGRADIERUNG", "UMWELT",
            "SCHADSTOFF", "ERNEUERBAR", "ATMOSPHARE", "ERHALTUNG", "ATMUNG", "ENDEMISMUS", "KLIMATOLOGIE",
            "UBERFISCHUNG", "PRADATION", "VERSALZUNG", "TREIBHAUS", "AUSSTERBEN", "KOHLENSTOFF", "BIOPIRATERIE",
            "FEUCHTGEBIET", "ERWARMUNG", "SCHADLINGE", "NISCHE", "GEOSPHARE", "AQUIFER", "OZONSCHINCHT"
        ]
    }
};

// hints for the hard mode
const HINTS = {
    en: {
        ECOSYSTEM: "Interacting biotic and abiotic components",
        ECOLOGY: "The science of organism-enviroment relationships",
        SUSTAINABLE: "Meeting the needs without compromising future generations",
        GEOTHERMAL: "Energy harnessed from Earth's internal heat",
        ECOCIDE: "Large-scale destruction of natural ecosystems",
        DEGRADATION: "The progressive decline of enviromental quality",
        POLLUANT: "An agent that contaminates a natural system",
        ENVIRONMENT: "External conditions influencing an organism's survival",
        RENEWABLE: "Naturally replenished within a relevant timescale",
        MICROPLASTIC: "Tiny synthetic fragments persisting in ecosystems",
        ATMOSPHERE: "The gaseous envelope surrounding a planet",
        HYDROPOWER: "Electricity generated through moving water",
        CONSERVATION: "Protecting biodiversity and natural resources",
        RESPIRATION: "Cellular processes that release usable energy",
        REFOREST: "To restore trees where forests once existed",
        ENDEMISM: "A species restricted to a particular region",
        CLIMATOLOGY: "The study of a long-term athmospheric patterns",
        OVERFISHING: "Harvesting aquatic populations faster than recovery",
        DESPOILMENT: "Severe destruction or depletion of landscapes",
        SALINIZATION: "Excessive salt accumulation in soil or water",
        GREENHOUSE: "A structure that traps heat for cultivation",
        EXTINCTION: "The irreversible disappearance of a species",
        CARBONCRADLE: "Carbon emissions associated with a product's beginning",
        AFFOREST: "To establish forest on previously unforested land",
        BIOPIRACY: "Unauthorized exploitation of biological resources or traditional knowledge",
        WETLAND: "An ecosystem shaped by persistent soil saturation"
    },
    es: {
        ECOSISTEMA: "Conjunto de organismos y factores físicos interdependientes",
        ECOLOGIA: "Ciencia que estuda las relaciones entre los seres vivos y su entorno",
        SOSTENIBLE: "Capaz de satisfacer necesidades presentes sin comprometer las futuras",
        GEOTERMICO: "Relacionado con el calor interno del planeta",
        ECOCIDIO: "Destrucción grave y extensa de los ecosistemas",
        DEGRADACION: "Deterioro progresivo de la calidad ambiental",
        CONTAMINANTE: "Agente que altera negativamente un medio natural",
        AMBIENTE: "Conjunto de condiciones que influyen en los organismos",
        RENOVABLE: "Recurso que se repone mediante procesos naturales",
        ATMOSFERA: "Envoltura gaseosa que rodea un planeta",
        CONSERVACION: "Protección de los recursos naturales y la biodiversidad",
        RESPIRACION: "Proceso celular mediante el qual se obtiene energía",
        REFORESTAR: "Recuperar la cobertura forestal de un terreno",
        ENDEMISMO: "Distribuicón exclusiva de una especie en una región",
        CLIMATOLOGIA: "Estudio de los patrones atmosféricos a largo plazo",
        SOBREPESCA: "Captura de peces a un ritmo superior a su recuperación",
        DEPREDACION: "Interacción en la que un organismo captura y consume otro",
        SALINIZACION: "Acumulación excessiva de sales en suelos o aguas",
        INVERNADERO: "Estructura que retiene calor para cultivar plantas",
        EXTINCION: "Desaparición definitia de una especie",
        CARBONO: "Elemento químico fundamental en la materia orgánica",
        BIOPIRATERIA: "Explotación indebida de recursos biológicos o saberes tradicionales",
        HUMEDAL: "Ecosistema caracterizado por suelos inundados o saturados",
        TOXICDAD: "Capacidad de una substancia para causar efectos nocivos",
        CALENTAMIENTO: "Aumento progresivo de la temperatura de un sistema",
        INUNDACION: "Ocupación de terrenos por agua normalmente ausente",
        PLAGAS: "Organismos que causan daños a cultivos o ecosistemas",
        NICHO: "Función ecológica y conjunto de condiciones de una especie",
        FOTOSINTESIS: "Conversión de energía luminosa en energía química",
        GEOSFERA: "Parte sólida del planeta, desde la superficie hasta su interior",
        ACUIFERO: "Formación geológica capaz de almacenar y transmitir agua subterránea",
        CAPADEOZONO: "Región atmosférica que absorbe gran parte de la radiación ultravioleta"
    },
    de: {
        OKOSYSTEM: "Zusammenspiel von Lebewesen und unbelebten Umweltfaktoren",
        OKOLOGIE: "Wissenschaft von den Beziehungen zwischen Organismen und ihrer Umwelt",
        NACHHALTIG: "Bedürfnisse erfüllen, ohne zukünftige Generationen zu gefährden",
        GEOTHERMISCH: "Die innere Wärme der Erde betreffend",
        OKOZID: "Schwerwiegende Zerströrung natürlicher Ökosysteme",
        DEGRADIERUNG: "Allmähliche Verschlechterung der Umweltqualität",
        UMWELT: "Gesamtheit der äußeren Bedingungen, die Lebewesen beeinflussen",
        SCHADSTOFF: "Substanz, die natürliche Systeme negativ beeinträchtigt",
        ERNEUERBAR: "Durch natürliche Prozesse wiederherstellbar",
        ATMOSPHARE: "Gasförmige Hülle, die einen Planeten umgibt",
        ERHALTUNG: "Schutz natürlicher Ressourcen und biologischer Vielfalt",
        ATMUNG: "Biologischer Prozess zur Energiegewinnung in Zellen",
        ENDEMISMUS: "Beschränkung einer Art auf ein bestimmtes geografisches Gebiet",
        KLIMATOLOGIE: "Wissenschaft von langfristigen klimatischen Mustern",
        UBERFISCHUNG: "Fischfang, der die natürliche Erholung der Bestände übersteigt",
        PRADATION: "Interaktion, bei der ein Organismus einen anderen erbeutet",
        VERSALZUNG: "Übermäßige Anreicherung von Salzen in Boden oder Wasser",
        TREIBHAUS: "Bauwerk, das Wärme für das Planzenwachstum speichert",
        AUSSTERBEN: "Endgültiges Verschwinden einer Art",
        KOHLENSTOFF: "Chemisches Element als Grundlage vieler organischer Verbindungen",
        BIOPIRATERIE: "Unrechtmäßige Aneingnung biologischer Ressourcen oder traditionellen Wissens",
        FEUCHTGEBIET: "Lebensraum, dessen Böden dauerhaft oder zeitweise wassergesättigt sind",
        ERWARMUNG: "Zunehmender Temperaturanstieg eines Systems",
        SCHADLINGE: "Organismen, die Kulturpflanzen oder Ökosysteme schädigen",
        NISCHE: "Funktion und Rolle einer Art innerhalb ihres Ökosystems",
        GEOSPHARE: "Fester Teil der Erde einschließlich ihres inneren Aufbaus",
        AQUIFER: "Geologische Formation, die Grundwasser speichert und weiterleitet",
        OZONSCHINCHT: "Atmosphärischer Bereich, der einen Großteil der UV-Strahlung absorbiert"

    }
}

// directions
const DIRECTIONS_EASY = [[0, 1], [1,0]]
const DIRECTIONS_FULL = [
    // right, down
    [0, 1], [1, 0],
    // left, up
    [0, -1], [-1,0],
    // diagonals going up
    [1, 1], [1, -1],
    // diagonals going down
    [-1, 1], [-1, -1]
]

// deciding which directions are allowed
function getDirections(){
    return currentLevel === "easy" ? DIRECTIONS_EASY : DIRECTIONS_FULL;
}

// references
const gridDiv = document.getElementById("grid");
const wordListUl = document.getElementById("word-list");
const levelButtons = document.querySelectorAll("#level-group .option-btn");
const languageButtons = document.querySelectorAll("#language-group .option-btn");

// ocean scene references
const oceanScene = document.getElementById("ocean-scene");
const playButton = document.getElementById("play-button");
const oceanPolluted = document.getElementById("ocean-polluted");
const trashItems = document.querySelectorAll(".trash-item");


// settings
let savedSize = null;
let savedLanguage = null;
let savedLevel = null;
try {
    savedSize = localStorage.getItem("aquasearch-size");
    savedLanguage = localStorage.getItem("aquasearch-language");
    savedLevel = localStorage.getItem("aquasearch-level")
} catch (error) {}

function savedValueIsValid(value, buttons,attribute){
    if (value == null) return false;
    for (const btn of buttons){
        if (btn.dataset[attribute] === value) return true;
    }
    return false;
}

if (savedValueIsValid(savedSize, levelButtons, "size")){
    SIZE = parseInt(savedSize);
}
if (savedValueIsValid(savedLanguage, languageButtons, "language")){
    currentLanguage = savedLanguage;
}
if (savedValueIsValid(savedLevel, levelButtons, "level")){
    currentLevel = savedLevel;
}


// words per game
const WORDS_PER_GAME = 10;

// the words of the current game
let WORDS = [];

// the grid starts as an empty list
const grid = [];

// random selection of words
function chooseRandomWords() {
    // the pool now depends on language AND level
    const fullPool = WORD_POOLS[currentLanguage][currentLevel];
    // copying the pool, keeping only the words that fit the grid
    const pool = [...fullPool].filter(word => letterCount(word) <= SIZE);
    const selection = [];

    while (selection.length < WORDS_PER_GAME && pool.length > 0) {
        // random index
        const index = Math.floor(Math.random() * pool.length);
        // taking the word
        selection.push(pool[index]);
        // removing it from the copy
        pool.splice(index, 1);
    }
    return selection;
}

// scoreboard
const SCORES_KEY = "aquasearch_scores";
const MAX_SCORES = 5;
const MEDALS = ["🥇", "🥈", "🥉"]

function loadScores(){
    try{
        return JSON.parse(localStorage.getItem(SCORES_KEY)) || {};
    } catch (e){
        return {};
    }
}

function saveScores(data){
    try {
        localStorage.setItem(SCORES_KEY, JSON.stringify(data));
    }catch (e){}
}

function scoreKey(level, language){
    return level + "-" + language;
}

function formatTime(ms){
    const total = Math.floor(ms/1000);
    const m = String(Math.floor(total/60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return m +
        ":" + s;
}

function countryFlag(code){
    if (!code || typeof code !== "string" || code.length !== 2) return "🌍";
    try {
        const base = 127397;
        return String.fromCodePoint(
            ...code.toUpperCase().split("").map(c => c.charCodeAt(0) + base)
        );
    } catch (e) {
        return "🌍";
    }
}

function addScore(level, language, timeMs, animal, animalName, fullName, country){
    const data = loadScores();
    const key = scoreKey(level, language);
    if(!data[key]) {
        data[key] = [];
    }

    const entry = {
        time: timeMs,
        date: new Date().toISOString().slice(0, 10),
        animal: animal,
        animalName: animalName,
        name: fullName,
        country: country
    };

    data[key].push(entry);
    data[key].sort((a,b) => a.time - b.time);
    data[key] = data[key].slice(0, MAX_SCORES);
    saveScores(data);

    return data[key].findIndex(e => e.time === entry.time && e.date === entry.date);
}

function getScores(level, language){
    const data = loadScores();
    return data[scoreKey(level, language)] || [];
}

// timer
let timerInterval = null;
let timerStart = 0;
let elapsedMs = 0;

function startTimer(){
    stopTimer();
    timerStart = Date.now();
    elapsedMs = 0;
    updateTimerDisplay(0);
    timerInterval = setInterval(function () {
        elapsedMs = Date.now() - timerStart;
        updateTimerDisplay(elapsedMs);
    }, 200)
}

function stopTimer(){
    if (timerInterval){
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer(){
    stopTimer();
    elapsedMs = 0;
    updateTimerDisplay(0);
}

function updateTimerDisplay(ms){
    const el = document.getElementById("timer");
    if (el){
        el.textContent = formatTime(ms);
    }
}

// score rendering
function scoreRowHTML(rank, s, extraClass){
    const cls = extraClass ? ' class="' + extraClass + '"' : "";
    const flag = countryFlag(s.country);
    const medal = MEDALS[rank] || (rank + 1) + ".";
    const label = s.name || s.animalName || "Player";

    return "<li" + cls + ">" +
        '<span class="score-name">' + medal + " " + label + " " + flag + "</span>" +
        '<span class="score-time">' + formatTime(s.time) + "</span>" +
        "</li>";
}

function renderLeftScores() {
    const list = document.getElementById("score-list");
    if (!list) return;
    const scores = getScores(currentLevel, currentLanguage);
    list.innerHTML = "";

    if (scores.length === 0){
        list.innerHTML = '<li class="empty">No scores yet</li>';
        return;
    }

    scores.forEach(function(s, i){
        list.insertAdjacentHTML("beforeend", scoreRowHTML(i, s, ""));
    });
}

function renderVictoryScores(newIndex) {
    const box = document.getElementById("victory-scores");
    if (!box) return;
    const scores = getScores(currentLevel, currentLanguage);

    let html = "<h3>Best Scores — " + currentLevel + " / " +
        currentLanguage.toUpperCase() + "</h3><ol>";
    scores.forEach(function(s, i){
        html += scoreRowHTML(i, s, i === newIndex ? "is-new" : "");
    });
    html += "</ol>";
    box.innerHTML = html;
}

function renderFullScores(level, language) {
    const list = document.getElementById("scores-full-list");
    if (!list) return;
    const scores = getScores(level, language);
    list.innerHTML = "";

    if (scores.length === 0){
        list.innerHTML = '<li class="empty">No scores yet for this mode</li>';
        return;
    }

    scores.forEach(function(s, i){
        list.insertAdjacentHTML("beforeend", scoreRowHTML(i, s, ""));
    });
}

function buildScoreTabs() {
    const tabs = document.getElementById("scores-tabs");
    if (!tabs) return;
    tabs.innerHTML = "";

    const levels = ["easy", "medium", "hard"];
    const langs = ["en", "es", "de"];

    levels.forEach(function (lv) {
        langs.forEach(function (lg) {
            const btn = document.createElement("button");
            btn.textContent = lv + " / " + lg.toUpperCase();
            btn.dataset.level = lv;
            btn.dataset.language = lg;
            btn.addEventListener("click", function () {
                tabs.querySelectorAll("button").forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");
                renderFullScores(lv, lg);
            });
            tabs.appendChild(btn);
        });
    });

    tabs.querySelector("button").classList.add("active");
    renderFullScores("easy", "en");
}

// scores overlay
const scoresOverlay = document.getElementById("scores-overlay");
const scoresButton = document.getElementById("scores-button");
const scoresClose = document.getElementById("scores-close");
const scoresMobileBtn = document.getElementById("scores-mobile-btn");

function openScoresOverlay(){
    buildScoreTabs();
    if (scoresOverlay) scoresOverlay.classList.remove("hidden");
}

if (scoresButton) {
    scoresButton.addEventListener("click", function () {
        buildScoreTabs();
        scoresOverlay.classList.remove("hidden");
    });
}
if (scoresClose) {
    scoresClose.addEventListener("click", function () {
        scoresOverlay.classList.add("hidden");
    });
}
if (scoresOverlay) {
    scoresOverlay.addEventListener("click", function (e) {
        if (e.target === scoresOverlay) scoresOverlay.classList.add("hidden");
    });
}

// update ocean
function updateOcean(){
    const total = WORDS.length;
    if (total === 0) {
        return;
    }

    const progress = foundCount / total;

    // water gets cleaner
    oceanPolluted.style.opacity = String(1-progress);

    // creatures get their color back
    const bgCreatures = document.getElementById("ocean-bg-creatures");
    if (bgCreatures){
        if (progress >= 1){
            bgCreatures.classList.remove("polluted");
        }else {
            bgCreatures.classList.add("polluted")
        }
    }

    // trash disappears
    const visibleCount = Math.round(trashItems.length * (1 - progress));
    trashItems.forEach(function (item, index){
        if (index < visibleCount){
            item.classList.add("visible");
            item.classList.remove("removed");
        }else{
            item.classList.remove("visible");
            item.classList.add("removed");
        }
    });
}

// hiding the words
function placeWord(word, directions){
    const letters = lettersOf(word);
    // try up to 100 random positions until one fits
    for (let attempt = 0; attempt < 100; attempt++){
        // picking a random direction from allowed list
        const dir = directions[Math.floor(Math.random() * directions.length)];
        // how much the row changes per letter
        const dr = dir[0];
        // how much the column changes per letter
        const dc = dir[1];

        // random start cell
        const startRow = Math.floor(Math.random() * SIZE);
        const startCol = Math.floor(Math.random() * SIZE);

        // the word must end inside the board
        const endRow = startRow + dr * (letters.length - 1);
        const endCol = startCol + dc * (letters.length - 1);
        if (endRow < 0 || endRow >= SIZE || endCol < 0 || endCol >= SIZE){
            continue;
        }

        // checking the whole path
        let pathIsFree = true;
        for (let i = 0; i < word.length; i++){
            const row = startRow + dr * i;
            const col = startCol + dc * i;

            // if a cell has a different letter, the path is blocked
            if (grid[row][col] !== "" && grid[row][col] !== letters[i]){
                pathIsFree = false;
                break;
            }
        }

        if (pathIsFree){
            for (let i = 0; i < letters.length; i++){
                grid[startRow + dr * i][startCol + dc * i] = letters[i];
            }
            return true;
        }
    }
    return false;
}

// drawing the grid on the screen
function drawGrid(){
    for (let row = 0; row < SIZE; row++){
        for (let col = 0; col < SIZE; col++){
            const cell = document.createElement("div");
            cell.textContent = grid[row][col];
            cell.classList.add("cell");

            //calling handleCellClick
            cell.addEventListener("click", function() {
                handleCellClick(row,col,cell);
            });
            gridDiv.appendChild(cell);
        }
    }
}

// confetti
const CONFETTI_COLORS = [ "#4fc3f7", "#66bb6a", "#ffca28", "#ef5350", "#ab47bc", "#ffffff"];
function startConfetti(){
    const container = document.getElementById("confetti");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < 80; i++){
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        piece.style.animationDuration = (2.5 + Math.random() * 2.5) + "s";
        piece.style.animationDelay = (Math.random() * 2) + "s";
        piece.style.width = (6 + Math.random() * 8) + "px";
        piece.style.height = (10 + Math.random() * 10) + "px";
        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        container.appendChild(piece);
    }
}

function stopConfetti(){
    const container = document.getElementById("confetti");
    if (container) container.innerHTML = "";
}


// game state, remembering the first clicked cell AND its position
let firstCell = null;
let firstRow = 0;
let firstCol = 0;
let foundCount = 0;

// runs everytime a cell is clicked
function handleCellClick (row, col, cellElement){
    if (firstCell === null){ // selects this cell
        firstCell = cellElement;
        firstRow = row;
        firstCol = col;
        cellElement.classList.add("selected");
    }else{ // unselect
        firstCell.classList.remove("selected");
        firstCell = null;
        checkWord (firstRow, firstCol, row, col);
    }
}

// checking if the path between two cells form a word
function checkWord (r1, c1, r2, c2){
    // direction comes from the two clicks
    const dr = Math.sign(r2 - r1);
    const dc = Math.sign (c2 - c1);

    // it must be a straight line: vertical, horizontal or diagonal
    const isStraight = (dr === 0 || dc === 0 || (Math.abs(r2-r1) === Math.abs (c2 - c1)));
    if (!isStraight){
        return;
    }

    let text = "";
    let cells = [];

    // walking from the first click to the second
    const steps = Math.max(Math.abs (r2 - r1), Math.abs(c2 - c1)) + 1;
    for (let i = 0; i < steps; i++){
        const row = r1 + dr * i;
        const col = c1 + dc * i;
        text += grid[row][col];
        // the cell at (row, col) lives at index row * SIZE + col
        cells.push(gridDiv.children[row * SIZE + col]);
    }

    // clicking backwards, both directions
    const reversed = Array.from(text).reverse().join("")

    for (const word of WORDS){
        const target = word.normalize("NFC");
        if (text === target || reversed === target){
            // asking the list if the word was already found
            const listItem = document.getElementById("word-" + target);
            if (listItem.classList.contains("found")){
                return;
            }
            if (!listItem){
                console.warn("List item not found for: ", word)
            }
            if(listItem.classList.contains("found")){
                return;
            }
            // if it matches, it turns green
            for (const cell of cells){
                cell.classList.add("found");
            }
            // cross the word of the list
            listItem.classList.add("found");
            // reveal the word
            listItem.textContent = listItem.dataset.number + ". "+ word;
            // count it and update
            foundCount++;
            updateOcean()
            document.getElementById("message").textContent = "You found: " + word;
            // victory
            if (foundCount === WORDS.length){
                winGame();
            }
        }
    }
}

// name generator
const ANIMALS = [
    { emoji: "🐬", word: "Dolphin" },
    { emoji: "🐢", word: "Turtle" },
    { emoji: "🦈", word: "Shark" },
    { emoji: "🐙", word: "Octopus" },
    { emoji: "🐠", word: "Fish" },
    { emoji: "🐳", word: "Whale" },
    { emoji: "🦀", word: "Crab" },
    { emoji: "🐡", word: "Puffer" },
    { emoji: "🐟", word: "Minnow" },
    { emoji: "🦑", word: "Squid" },
    { emoji: "🐚", word: "Shell" },
    { emoji: "🪼", word: "Jelly" },
    { emoji: "🦞", word: "Lobster" },
    { emoji: "⭐", word: "Star" },
    { emoji: "🐋", word: "Blue" }
];

const ADJECTIVES = [
    "Magic","Funny","Brave","Swift","Happy","Bright",
    "Clever","Wild","Calm","Bold","Lucky","Sunny",
    "Silent","Deep","Blue","Golden","Silver","Coral",
    "Ocean","Wave","Storm","Frost","Neon","Turbo"
];

let generatedAnimal = "";
let generatedAnimalName = "";
let generatedFullName = "";

function generateRandomName(){
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

    generatedAnimal = animal.emoji;
    generatedAnimalName = animal.word;
    generatedFullName = animal.word + adj;

    const animalEl = document.getElementById("name-animal");
    const textEl = document.getElementById("name-text");
    if (animalEl) animalEl.textContent = animal.emoji;
    if (textEl) textEl.textContent = generatedFullName;
}

/* ===== COUNTRY LIST ===== */
const COUNTRIES = [
    { code: "AF", name: "Afghanistan" }, { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" }, { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" }, { code: "AG", name: "Antigua and Barbuda" },
    { code: "AR", name: "Argentina" }, { code: "AM", name: "Armenia" },
    { code: "AU", name: "Australia" }, { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" }, { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" }, { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" }, { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" }, { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" }, { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" }, { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" }, { code: "BR", name: "Brazil" },
    { code: "BN", name: "Brunei" }, { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" }, { code: "BI", name: "Burundi" },
    { code: "CV", name: "Cabo Verde" }, { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" }, { code: "CA", name: "Canada" },
    { code: "CF", name: "Central African Republic" }, { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" }, { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" }, { code: "KM", name: "Comoros" },
    { code: "CG", name: "Congo" }, { code: "CD", name: "Congo (DRC)" },
    { code: "CR", name: "Costa Rica" }, { code: "CI", name: "Côte d'Ivoire" },
    { code: "HR", name: "Croatia" }, { code: "CU", name: "Cuba" },
    { code: "CY", name: "Cyprus" }, { code: "CZ", name: "Czechia" },
    { code: "DK", name: "Denmark" }, { code: "DJ", name: "Djibouti" },
    { code: "DM", name: "Dominica" }, { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" }, { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" }, { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" }, { code: "EE", name: "Estonia" },
    { code: "SZ", name: "Eswatini" }, { code: "ET", name: "Ethiopia" },
    { code: "FJ", name: "Fiji" }, { code: "FI", name: "Finland" },
    { code: "FR", name: "France" }, { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambia" }, { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" }, { code: "GH", name: "Ghana" },
    { code: "GR", name: "Greece" }, { code: "GD", name: "Grenada" },
    { code: "GT", name: "Guatemala" }, { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" }, { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" }, { code: "HN", name: "Honduras" },
    { code: "HU", name: "Hungary" }, { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" }, { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" }, { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" }, { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" }, { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" }, { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" }, { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" }, { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" }, { code: "LA", name: "Laos" },
    { code: "LV", name: "Latvia" }, { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" }, { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libya" }, { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" }, { code: "LU", name: "Luxembourg" },
    { code: "MG", name: "Madagascar" }, { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" }, { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" }, { code: "MT", name: "Malta" },
    { code: "MH", name: "Marshall Islands" }, { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" }, { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia" }, { code: "MD", name: "Moldova" },
    { code: "MC", name: "Monaco" }, { code: "MN", name: "Mongolia" },
    { code: "ME", name: "Montenegro" }, { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" }, { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" }, { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" }, { code: "NL", name: "Netherlands" },
    { code: "NZ", name: "New Zealand" }, { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" }, { code: "NG", name: "Nigeria" },
    { code: "KP", name: "North Korea" }, { code: "MK", name: "North Macedonia" },
    { code: "NO", name: "Norway" }, { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" }, { code: "PW", name: "Palau" },
    { code: "PS", name: "Palestine" }, { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" }, { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" }, { code: "PH", name: "Philippines" },
    { code: "PL", name: "Poland" }, { code: "PT", name: "Portugal" },
    { code: "QA", name: "Qatar" }, { code: "RO", name: "Romania" },
    { code: "RU", name: "Russia" }, { code: "RW", name: "Rwanda" },
    { code: "KN", name: "Saint Kitts and Nevis" }, { code: "LC", name: "Saint Lucia" },
    { code: "VC", name: "Saint Vincent and the Grenadines" }, { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" }, { code: "ST", name: "São Tomé and Príncipe" },
    { code: "SA", name: "Saudi Arabia" }, { code: "SN", name: "Senegal" },
    { code: "RS", name: "Serbia" }, { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" }, { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" }, { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" }, { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" }, { code: "KR", name: "South Korea" },
    { code: "SS", name: "South Sudan" }, { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" }, { code: "SD", name: "Sudan" },
    { code: "SR", name: "Suriname" }, { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" }, { code: "SY", name: "Syria" },
    { code: "TW", name: "Taiwan" }, { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania" }, { code: "TH", name: "Thailand" },
    { code: "TL", name: "Timor-Leste" }, { code: "TG", name: "Togo" },
    { code: "TO", name: "Tonga" }, { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" }, { code: "TR", name: "Türkiye" },
    { code: "TM", name: "Turkmenistan" }, { code: "TV", name: "Tuvalu" },
    { code: "UG", name: "Uganda" }, { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" }, { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" }, { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" }, { code: "VU", name: "Vanuatu" },
    { code: "VA", name: "Vatican City" }, { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Vietnam" }, { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" }, { code: "ZW", name: "Zimbabwe" }
];

function populateCountrySelect(){
    const select = document.getElementById("player-country");
    if (!select) return;

    COUNTRIES.forEach(function(c){
        const opt = document.createElement("option");
        opt.value = c.code;
        opt.textContent = countryFlag(c.code) + " " + c.name;
        select.appendChild(opt);
    });
}

// victory handler
let pendingTime = 0;

function winGame(){
    stopTimer();
    pendingTime = elapsedMs;

    const timeEl = document.getElementById("victory-time");
    if (timeEl) timeEl.textContent = "Your time: " + formatTime(elapsedMs);

    const form = document.getElementById("victory-form");
    const countrySelect = document.getElementById("player-country");
    const saveBtn = document.getElementById("save-score");

    if (form) form.classList.remove("saved");
    if (countrySelect){
        countrySelect.value = "";
        countrySelect.style.borderColor = "";
    }
    if (saveBtn) saveBtn.disabled = false;

    generateRandomName();

    const box = document.getElementById("victory-scores");
    if (box) box.innerHTML = "";

    document.getElementById("victory").classList.remove("hidden");
    startConfetti();
}

function saveVictoryScore(){
    const countrySelect = document.getElementById("player-country");
    const saveBtn = document.getElementById("save-score");
    const form = document.getElementById("victory-form");

    const country = countrySelect.value;

    if (!country){
        countrySelect.focus();
        countrySelect.style.borderColor = "#ef5350";
        return;
    }

    const newIndex = addScore(
        currentLevel, currentLanguage, pendingTime,
        generatedAnimal, generatedAnimalName, generatedFullName, country
    );

    renderVictoryScores(newIndex);
    renderLeftScores();

    if (form) form.classList.add("saved");
    if (saveBtn) saveBtn.disabled = true;
}


// listeners
const rerollBtn = document.getElementById("reroll-name");
if (rerollBtn) rerollBtn.addEventListener("click", generateRandomName);

const saveScoreBtn = document.getElementById("save-score");
if (saveScoreBtn) saveScoreBtn.addEventListener("click", saveVictoryScore);


// starting a new game
function startGame(){
    // fresh words
    WORDS = chooseRandomWords();
    // reseting the grid
    grid.length = 0;

    //creating the empty grid
    // loop that iterates through the rows
    for (let row = 0; row < SIZE; row++){
        // for each line a new list of letters
        const newRow = [];
        // loop that iterates through the columns
        for (let col = 0; col < SIZE; col++){
            newRow.push("");
        }
        // store the ready-line into the grid
        grid.push(newRow);
    }

    // hiding every word
    const directions = getDirections();
    const requestedWords = [...WORDS];
    WORDS = [];
    for (const word of requestedWords){
        let placed = false;
        let totalAttempts = 0;
        while (!placed && totalAttempts < 50){
            placed = placeWord(word, directions);
            totalAttempts++;
        }
        if (placed){
            WORDS.push(word);
        }
    }

    // filling the empty cells with random letters
    for (let row = 0; row < SIZE; row++){
        for (let col = 0; col < SIZE; col++){
            if (grid[row][col] === ""){
                const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
                grid[row][col] = letter;
            }
        }
    }

    // resetting the game state
    foundCount = 0;
    firstCell = null;
    document.getElementById("message").textContent = "";

    // resizing the grid for current level
    gridDiv.style.gridTemplateColumns = "repeat(" + SIZE + ", var(--cell-size))";

    // cleaning the screen before drawing
    gridDiv.innerHTML = "";
    drawGrid();

    // rebuilding the word list
    wordListUl.innerHTML = "";
    // counting the words
    let number = 1;
    for (const word of WORDS){
        const item = document.createElement("li");
        item.id = "word-" + word.normalize("NFC");
        item.dataset.number = number;
        item.dataset.word = word;
        // showing the hints instead of words in hard mode
        if (currentLevel == "hard"){
            item.textContent = number + ". " + (HINTS[currentLanguage][word] || word);
        } else {
            item.textContent = number + ". " + word;
        }
        wordListUl.appendChild(item);
        number++
    }

    // reset the ocean
    oceanPolluted.style.opacity ="1";
    const bgCreatures = document.getElementById("ocean-bg-creatures");
    if(bgCreatures) bgCreatures.classList.add("polluted")
    trashItems.forEach(function (item){
        item.classList.add("visible");
        item.classList.remove("removed");
    });

    // scores panel and timer
    renderLeftScores();
    resetTimer();
    startTimer();
}

// finding words or checking
function findWord(word) {
    // searching along each row
    for (let row = 0; row < SIZE; row++) {
        const line = grid[row].join("");
        if (line.includes(word)) return "found in row " + row;
    }
    // searching each column
    for (let col = 0; col < SIZE; col++) {
        let line = "";
        for (let row = 0; row < SIZE; row++) {
            line += grid[row][col];
        }
        if (line.includes(word)) return "found in column " + col;
    }
    return "NOT found (or diagonal/reversed)";
}

// game limit
const MAX_NEW_GAMES = 3;
let newGamesLeft = MAX_NEW_GAMES;
document.getElementById("games-left").textContent = newGamesLeft;

document.getElementById("new-game").addEventListener("click", function() {
    if (newGamesLeft<=0){
        return;
    }
    newGamesLeft--;
    document.getElementById("games-left").textContent = newGamesLeft;
    startGame();
    if (newGamesLeft ===0){
        document.getElementById("new-game").disabled = true;
    }
});

// victory
document.getElementById("victory-button").addEventListener("click", function(){
    stopConfetti();
    document.getElementById("victory").classList.add("hidden");
    startGame();
});

// play button
playButton.addEventListener("click", function (){
    oceanScene.classList.add("hidden");
    startGame()
});

// level
for (const btn of levelButtons){
    btn.addEventListener("click", function() {
        //removing highlight
        for (const b of levelButtons){
            b.classList.remove("active");
        }
        //highlighting the clicked button
        btn.classList.add("active");
        //applying the new level
        SIZE = parseInt(btn.dataset.size);
        currentLevel = btn.dataset.level;
        // saving choice for the next time
        try {
            localStorage.setItem("aquasearch-size", SIZE);
            localStorage.setItem("aquasearch-level", currentLevel);
        } catch (error){}
        startGame();
    });
}

// language
for (const btn of languageButtons){
    btn.addEventListener("click", function() {
        //removing highlight
        for (const b of languageButtons){
            b.classList.remove("active");
        }
        //highlighting the clicked button
        btn.classList.add("active");
        //applying the new language
        currentLanguage = btn.dataset.language;
        try {
            localStorage.setItem("aquasearch-language", btn.dataset.language);
        } catch (error) {}
        startGame();
    });
}

// making the buttons match the loaded settings
for (const btn of levelButtons){
    if (btn.dataset.level === currentLevel){
        btn.classList.add("active");
    }else{
        btn.classList.remove("active");
    }
}
for (const btn of languageButtons){
    if (btn.dataset.language === currentLanguage){
        btn.classList.add("active");
    }else{
        btn.classList.remove("active");
    }
}

// initial score panel render
populateCountrySelect();
renderLeftScores();
