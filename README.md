# AquaSearch
A word-search game with a water-conservation theme. Players find hidden words in a grid, each word found cleans part of the 
polluted ocean. Scores are stored globally in Firebase Firestore and ranked by level and language.



---
## Table of Contents
- Overview ✅
- Tech Stack ✅
- Project Structure ✅
- Architecture ✅
- Data Model
- Game Mechanics
- Setup
- Deployment
- Known Issues
- Maintenance Guide

---
## Overview
AquaSearch is a word-search game where the player selects letter in a grid to reveal hidden words. 
The visual theme is ocean pollution: the background starts dirty, with trash floating items in the water, and each word found
removes part of the pollution. When all words are found, the ocean is clean and the player reaches the victory screen. 

The game support three different levels, three different languages (English, Spanish, German), a timer, a generated player name, 
country selection, and a global leaderboard stored in Firestore.

The educational goal: raise awareness about environments pollution through a simple and accessible game. 

---
## TechStack

| layer      | technology                                 |
|------------|--------------------------------------------|
| Markup     | HTML5                                      |
| Styling    | CSS3 (custom properties, animations, grid) |
| Logic      | Vanilla JavaScript (ES6+)                  |
| Backend    | Firebase Firestore (compact SDK v10.12.0)  |
| Hosting    | GitHubPages                                |
| Build step | None (files are served directly)           |

No framework, no bundler, no npm dependencies. The Firebase SDK is loaded from the Google CDN.

---
## Project Structure
```
WordSearchGame/
├── index.html          # All four screens and the ocean layers
├── style.css           # Visual system, animations, responsive layout
├── firebase.js         # Firebase config and Firestore instance
├── data.js             # Word pools, countries, animals, adjectives, colors
├── state.js            # Global state, word selection, Storage settings
├── scoreboard.js       # Firestore CRUD, timer, score rendering, name generator
├── game.js             # Core game logic: grid, word placement, ocean update
├── main.js             # Event listeners and initialization
├── README.md           
└── img/
    ├── logo2.png
    ├── sea/            # Animals and Creatures: Fish, shark, octopus, crab...
    └── trash/          # Trash Items: Bottle, bag, straw, can, tire, oil
```
---
## Architecture
The application is a single-page app with four screens controlled by CSS classes (hidden). There is no router and 
screen transitions are handled by toggling classes in main.

### File responsibilities
The code is split by concern, not by feature. Each file has one job:

| file              | responsibility                                                                                         |
|-------------------|--------------------------------------------------------------------------------------------------------|
| **firebase.js**   | Firebase initialization and the scoresCollection reference                                             |
| **data.js**       | Static data: word pools, hints, countries, adjectives, letters, directions and confetti colors         |
| **state.js**      | Global mutable state, word selection, direction rules, references and saved settings                   |
| **game.js**       | Core game logic: gird creation, word placement, click handling, word validation, ocean update, victory |
| **scoreboard.js** | Firestore CRUD, timer, score rendering, name generator, country list, overlay                          |
| **main.js**       | Event listeners and initialization on DOMContentLoaded                                                 |

The separation matters: **game.js** never touches Firestore, and **scoreboard.js** never touches the grid. They communicate through shared
state in **state.js** (WORDS, foundCount, pendingTime, currentLevel, currentLanguage).

### Data flow
The complete lifecycle of a game, from the play button to the saved score:
```
Player clicks "Play"
        ↓
main.js → startGame()                    [game.js]
        ↓
chooseRandomWords()                      [state.js]
   filters WORD_POOLS[language][level]
   by letterCount(word) <= SIZE
   picks 10 random words
        ↓
placeWord() × N (max 50 attempts each)   [game.js]
   random direction from getDirections() [state.js]
   validates path is free or letter matches
   writes letters into grid[][]
        ↓
fill empty cells with random LETTERS     [game.js]
        ↓
drawGrid()                               [game.js]
   creates .cell divs, attaches click handlers
        ↓
wordListUl populated (hints on hard)     [game.js]
        ↓
resetTimer() + startTimer()              [scoreboard.js]
        ↓
─── player interaction ───
        ↓
handleCellClick() → checkWord()          [game.js]
   validates straight line (H, V, 45° diag)
   reads letters along path
   compares forward and reversed vs WORDS
        ↓
word found → updateOcean()               [game.js]
   oceanPolluted.style.opacity = 1 - progress
   hides trash items proportionally
   foundCount++
        ↓
foundCount === WORDS.length → winGame()  [game.js]
   stopTimer()                           [scoreboard.js]
   pendingTime = elapsedMs
   generateRandomName()                  [scoreboard.js]
   startConfetti()
        ↓
─── player saves ───
        ↓
saveVictoryScore()                       [scoreboard.js]
   validates country selection
   addScore() → Firestore "scores"
        ↓
renderVictoryScores(newIndex)            [scoreboard.js]
renderLeftScores()                       [scoreboard.js]
        ↓
getScores(level, language)               [scoreboard.js]
   Firestore query with composite index
   orderBy("time", "asc").limit(5)
```
---