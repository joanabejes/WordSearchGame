// ocean update
function updateOcean(){
    const total = WORDS.length;
    if (total === 0) return;

    const progress = foundCount / total;
    oceanPolluted.style.opacity = String(1 - progress);

    const bgCreatures = document.getElementById("ocean-bg-creatures");
    if (bgCreatures){
        if (progress >= 1) bgCreatures.classList.remove("polluted");
        else bgCreatures.classList.add("polluted");
    }

    const visibleCount = Math.round(trashItems.length * (1 - progress));
    trashItems.forEach(function(item, index){
        if (index < visibleCount){
            item.classList.add("visible");
            item.classList.remove("removed");
        } else {
            item.classList.remove("visible");
            item.classList.add("removed");
        }
    });
}

// word placement
function placeWord(word, directions){
    const letters = lettersOf(word);

    for (let attempt = 0; attempt < 100; attempt++){
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const dr = dir[0];
        const dc = dir[1];
        const startRow = Math.floor(Math.random() * SIZE);
        const startCol = Math.floor(Math.random() * SIZE);
        const endRow = startRow + dr * (letters.length - 1);
        const endCol = startCol + dc * (letters.length - 1);

        if (endRow < 0 || endRow >= SIZE || endCol < 0 || endCol >= SIZE) continue;

        let pathIsFree = true;
        for (let i = 0; i < word.length; i++){
            const row = startRow + dr * i;
            const col = startCol + dc * i;
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

function drawGrid(){
    for (let row = 0; row < SIZE; row++){
        for (let col = 0; col < SIZE; col++){
            const cell = document.createElement("div");
            cell.textContent = grid[row][col];
            cell.classList.add("cell");
            cell.addEventListener("click", function(){
                handleCellClick(row, col, cell);
            });
            gridDiv.appendChild(cell);
        }
    }
}

// confetti
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

// word selection
function handleCellClick(row, col, cellElement){
    if (firstCell === null){
        firstCell = cellElement;
        firstRow = row;
        firstCol = col;
        cellElement.classList.add("selected");
    } else {
        firstCell.classList.remove("selected");
        firstCell = null;
        checkWord(firstRow, firstCol, row, col);
    }
}

function checkWord(r1, c1, r2, c2){
    const dr = Math.sign(r2 - r1);
    const dc = Math.sign(c2 - c1);
    const isStraight = (dr === 0 || dc === 0 || (Math.abs(r2 - r1) === Math.abs(c2 - c1)));
    if (!isStraight) return;

    let text = "";
    let cells = [];
    const steps = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;

    for (let i = 0; i < steps; i++){
        const row = r1 + dr * i;
        const col = c1 + dc * i;
        text += grid[row][col];
        cells.push(gridDiv.children[row * SIZE + col]);
    }

    const reversed = Array.from(text).reverse().join("");

    for (const word of WORDS){
        const target = word.normalize("NFC");
        if (text === target || reversed === target){
            const listItem = document.getElementById("word-" + target);
            if (!listItem){
                console.warn("List item not found for: ", word);
                continue;
            }
            if (listItem.classList.contains("found")) return;

            for (const cell of cells) cell.classList.add("found");

            listItem.classList.add("found");
            listItem.textContent = listItem.dataset.number + ". " + word;

            foundCount++;
            updateOcean();
            document.getElementById("message").textContent = "You found: " + word;

            if (foundCount === WORDS.length) winGame();
            return;
        }
    }
}

// victory
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

// game start
function startGame(){
    WORDS = chooseRandomWords();
    grid.length = 0;

    for (let row = 0; row < SIZE; row++){
        const newRow = [];
        for (let col = 0; col < SIZE; col++) newRow.push("");
        grid.push(newRow);
    }

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
        if (placed) WORDS.push(word);
    }

    for (let row = 0; row < SIZE; row++){
        for (let col = 0; col < SIZE; col++){
            if (grid[row][col] === ""){
                grid[row][col] = LETTERS[Math.floor(Math.random() * LETTERS.length)];
            }
        }
    }

    foundCount = 0;
    firstCell = null;
    document.getElementById("message").textContent = "";

    gridDiv.style.gridTemplateColumns = "repeat(" + SIZE + ", var(--cell-size))";
    gridDiv.innerHTML = "";
    drawGrid();

    wordListUl.innerHTML = "";
    let number = 1;
    for (const word of WORDS){
        const item = document.createElement("li");
        item.id = "word-" + word.normalize("NFC");
        item.dataset.number = number;
        item.dataset.word = word;

        if (currentLevel == "hard"){
            item.textContent = number + ". " + (HINTS[currentLanguage][word] || word);
        } else {
            item.textContent = number + ". " + word;
        }
        wordListUl.appendChild(item);
        number++;
    }

    oceanPolluted.style.opacity = "1";
    const bgCreatures = document.getElementById("ocean-bg-creatures");
    if (bgCreatures) bgCreatures.classList.add("polluted");
    trashItems.forEach(function(item){
        item.classList.add("visible");
        item.classList.remove("removed");
    });

    renderLeftScores();
    resetTimer();
    startTimer();
}