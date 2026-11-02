
// letters to fill the board
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// board size: 10x10
let SIZE = 10;

// curent level
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
if (savedValueIsValid(savedLanguage, levelButtons, "level")){
    currentLevel = savedLevel;
}


// words per game
const WORDS_PER_GAME = 10;

// the words of the curret game
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
            document.getElementById("message").textContent = "You found: " + word;
            // victory
            if (foundCount === WORDS.length){
                document.getElementById("victory").classList.remove("hidden");
            }
        }
    }
}

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

    // reseting the game state
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

// staring the first game when page loads
startGame();

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
document.getElementById("victory-button").addEventListener("click", function() {
    document.getElementById("victory").classList.add("hidden");
    startGame();
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