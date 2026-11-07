const MAX_SCORES = 5;
const MEDALS = ["🥇", "🥈", "🥉"];

// reading
async function getScores(level, language) {
    try {
        const snapshot = await scoresCollection
            .where("level", "==", level)
            .where("language", "==", language)
            .orderBy("time", "asc")
            .limit(MAX_SCORES)
            .get();

        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Erro ao buscar scores:", error);
        return [];
    }
}

// adding
async function addScore(level, language, timeMs, animal, animalName, fullName, country) {
    try {
        const entry = {
            level: level,
            language: language,
            time: timeMs,
            name: fullName,
            animal: animal,
            animalName: animalName,
            country: country,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await scoresCollection.add(entry);

        const scores = await getScores(level, language);
        const index = scores.findIndex(s => s.time === timeMs && s.name === fullName);

        return index;
    } catch (error) {
        console.error("Error saving this score:", error);
        return -1;
    }
}
// formating
function formatTime(ms) {
    const total = Math.floor(ms / 1000);
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return m + ":" + s;
}

function countryFlag(code) {
    if (!code || code.length !== 2) return "🌍";
    const base = 127397;
    return String.fromCodePoint(
        ...code.toUpperCase().split("").map(c => c.charCodeAt(0) + base)
    );
}

// timer
let timerInterval = null;
let timerStart = 0;
let elapsedMs = 0;

function startTimer() {
    stopTimer();
    timerStart = Date.now();
    elapsedMs = 0;
    updateTimerDisplay(0);
    timerInterval = setInterval(function () {
        elapsedMs = Date.now() - timerStart;
        updateTimerDisplay(elapsedMs);
    }, 200);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    elapsedMs = 0;
    updateTimerDisplay(0);
}

function updateTimerDisplay(ms) {
    const el = document.getElementById("timer");
    if (el) el.textContent = formatTime(ms);
}

// rendering
function scoreRowHTML(rank, s, extraClass) {
    const cls = extraClass ? ' class="' + extraClass + '"' : "";
    const flag = countryFlag(s.country);
    const label = s.name || s.animalName || "Player";

    let prefix;
    if (rank < 3) {
        prefix = MEDALS[rank];
    } else {
        prefix = (rank + 1) + ".";
    }

    return '<li' + cls + ' style="display:flex; justify-content:space-between; align-items:center; gap:12px; list-style:none;">' +
        '<span class="score-name">' + prefix + " " + label + " " + flag + "</span>" +
        '<span class="score-time">' + formatTime(s.time) + "</span>" +
        "</li>";
}

async function renderLeftScores() {
    const panel = document.getElementById("left-panel");
    if (!panel) return;

    // garante que o <ol> existe; se não, recria dentro do painel
    let list = document.getElementById("scores-list");
    if (!list) {
        list = document.createElement("ol");
        list.id = "scores-list";
        panel.appendChild(list);
    }

    list.innerHTML = '<li class="empty">Loading...</li>';
    const scores = await getScores(currentLevel, currentLanguage);
    list.innerHTML = "";

    if (scores.length === 0) {
        list.innerHTML = '<li class="empty">No scores yet</li>';
        return;
    }

    scores.forEach(function (s, i) {
        list.insertAdjacentHTML("beforeend", scoreRowHTML(i, s, ""));
    });
}

async function renderVictoryScores(newIndex) {
    const box = document.getElementById("victory-scores");
    if (!box) return;

    const scores = await getScores(currentLevel, currentLanguage);

    let html = "<h3>Best Scores — " + currentLevel + " / " +
        currentLanguage.toUpperCase() + "</h3><ol>";
    scores.forEach(function (s, i) {
        html += scoreRowHTML(i, s, i === newIndex ? "is-new" : "");
    });
    html += "</ol>";
    box.innerHTML = html;
}

async function renderFullScores(level, language) {
    const list = document.getElementById("scores-full-list");
    if (!list) return;

    list.innerHTML = '<li class="empty">Loading...</li>';
    const scores = await getScores(level, language);
    list.innerHTML = "";

    if (scores.length === 0) {
        list.innerHTML = '<li class="empty">No scores yet for this mode</li>';
        return;
    }

    scores.forEach(function (s, i) {
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

// overlay
const scoresOverlay = document.getElementById("scores-overlay");
const scoresButton = document.getElementById("scores-button");
const scoresClose = document.getElementById("scores-close");
const scoresMobileBtn = document.getElementById("scores-mobile-btn");

function openScoresOverlay() {
    buildScoreTabs();
    if (scoresOverlay) scoresOverlay.classList.remove("hidden");
}

// name generator
function generateRandomName() {
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

// countries
function populateCountrySelect() {
    const select = document.getElementById("player-country");
    if (!select) return;

    COUNTRIES.forEach(function (c) {
        const opt = document.createElement("option");
        opt.value = c.code;
        opt.textContent = countryFlag(c.code) + " " + c.name;
        select.appendChild(opt);
    });
}

// saving
async function saveVictoryScore() {
    const countrySelect = document.getElementById("player-country");
    const saveBtn = document.getElementById("save-score");
    const form = document.getElementById("victory-form");

    const country = countrySelect.value;

    if (!country) {
        countrySelect.focus();
        countrySelect.style.borderColor = "#ef5350";
        return;
    }

    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";
    }

    const newIndex = await addScore(
        currentLevel, currentLanguage, pendingTime,
        generatedAnimal, generatedAnimalName, generatedFullName, country
    );

    await renderVictoryScores(newIndex);
    await renderLeftScores();

    if (form) form.classList.add("saved");
    if (saveBtn) saveBtn.textContent = "Saved";
}