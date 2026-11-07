document.addEventListener("DOMContentLoaded", function () {

    // overlay
    if (scoresButton) scoresButton.addEventListener("click", openScoresOverlay);
    if (scoresMobileBtn) scoresMobileBtn.addEventListener("click", openScoresOverlay);
    if (scoresClose) {
        scoresClose.addEventListener("click", function(){
            scoresOverlay.classList.add("hidden");
        });
    }
    if (scoresOverlay) {
        scoresOverlay.addEventListener("click", function(e){
            if (e.target === scoresOverlay) scoresOverlay.classList.add("hidden");
        });
    }

    // victory form
    const rerollBtn = document.getElementById("reroll-name");
    if (rerollBtn) rerollBtn.addEventListener("click", generateRandomName);

    const saveScoreBtn = document.getElementById("save-score");
    if (saveScoreBtn) saveScoreBtn.addEventListener("click", saveVictoryScore);

    // game limit
    const MAX_NEW_GAMES = 3;
    let newGamesLeft = MAX_NEW_GAMES;
    document.getElementById("games-left").textContent = newGamesLeft;

    document.getElementById("new-game").addEventListener("click", function(){
        if (newGamesLeft <= 0) return;
        newGamesLeft--;
        document.getElementById("games-left").textContent = newGamesLeft;
        startGame();
        if (newGamesLeft === 0) document.getElementById("new-game").disabled = true;
    });

    document.getElementById("victory-button").addEventListener("click", function(){
        stopConfetti();
        document.getElementById("victory").classList.add("hidden");
        startGame();
    });

    playButton.addEventListener("click", function(){
        oceanScene.classList.add("hidden");
        startGame();
    });

    // level
    for (const btn of levelButtons){
        btn.addEventListener("click", function(){
            for (const b of levelButtons) b.classList.remove("active");
            btn.classList.add("active");

            SIZE = parseInt(btn.dataset.size);
            currentLevel = btn.dataset.level;

            try {
                localStorage.setItem("aquasearch-size", SIZE);
                localStorage.setItem("aquasearch-level", currentLevel);
            } catch (error){}

            startGame();
        });
    }

    // language
    for (const btn of languageButtons){
        btn.addEventListener("click", function(){
            for (const b of languageButtons) b.classList.remove("active");
            btn.classList.add("active");

            currentLanguage = btn.dataset.language;

            try {
                localStorage.setItem("aquasearch-language", btn.dataset.language);
            } catch (error){}

            startGame();
        });
    }

    // initialization
    for (const btn of levelButtons){
        if (btn.dataset.level === currentLevel) btn.classList.add("active");
        else btn.classList.remove("active");
    }
    for (const btn of languageButtons){
        if (btn.dataset.language === currentLanguage) btn.classList.add("active");
        else btn.classList.remove("active");
    }

    populateCountrySelect();
    renderLeftScores();
});