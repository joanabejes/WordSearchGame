# AquaSearch
A word-search game with a water-conservation theme. Players find hidden words in a grid, each word found cleans part of the 
polluted ocean. Scores are stored globally in Firebase Firestore and ranked by level and language.



---
## Table of Contents
- Overview ✅
- Tech Stack ✅
- Project Structure ✅
- Architecture ✅
- Data Model ✅
- Game Mechanics ✅
- Setup ✅
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

### File Responsibilities
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

### Data Flow
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
## Data Model
Scores are stored in **Cloud Firestore**, a document-oriented NoSQL database. 
There is no relational schema and no server code: the browser writes directly to the collection, 
and Firestore security rules act as the only validation layer.

### Collection Structure
```
scores/                                 # collection
├── {autoId1}                           # document (auto-generated ID)
│   ├── level:      "medium"
│   ├── language:   "en"
│   ├── time:       84320
│   ├── name:       "DolphinMagic"
│   ├── animal:     "🐬"
│   ├── animalName: "Dolphin"
│   ├── country:    "DE"
│   └── createdAt:  <server timestamp>
├── {autoId2}
└── ...
```

A single flat collection is used. There are no subcollections and no nested documents. 
Every score is one document, and the level/language pair is stored as a field rather than as a path segment.

### Document Schema
| field    | type      | example       | description                                       | 
|----------|-----------|---------------|---------------------------------------------------| 
| level    | string    | "medium"      | Difficulty. One of **easy, medium, hard**         |
| language | string    | "en"          | Word language. One of **en, es, de**              |
| time     | number    | 84320         | Elapsed time in milliseconds. **Lower is better** |
| name     | string    | "DolphinMagic" | Generated full name **(animal + adjective)**      |
| animal   | string    | "🐬"          | **Emoji** of the generated animal.                |
| animalName| string    | "Dolphin "    | Animal word without the adjective                 |
| country | string    | "DE           | ISO 3166-1-alpha-2 country code                   |
| createdAt | timestamp | servertTimestamp() | Server-side creation time, used for auditing |

**Why milliseconds and not seconds**: the timer updates every **200 ms**, so second-level precision would 
create frequent ties. Storing milliseconds keeps the ranking unambiguous, and **formatTime()** converts to **mm:ss** only at render time.

**Why createdAt uses serverTimestamp()**: the value is generated by Firestore, not by the client. 
This prevents a manipulated browser clock from writing false dates.

### Query Pattern
Every read goes through a single query in getScores():

```
scoresCollection
  .where("level", "==", level)
  .where("language", "==", language)
  .orderBy("time", "asc")
  .limit(MAX_SCORES)
  .get();
 ```
The query has three parts, and each one has a cost:

- Two equality filters **(level, language)** narrow the result to one of nine possible leaderboards


- One range sort (**time** ascending) puts the fastest time first


- **A limit of 5** keeps the payload small — the full leaderboard never leaves the server

This combination of two equality filters plus one **orderBy** on a different field requires a composite index. 
Firestore does not create it automatically.

### Required Composite Index
Without this index, the query fails with the error **The query requires an index**.

| property       | value                  | 
|----------------|------------------------|
| Collection ID  | scores                 |
| Query scope    | Collection             |
| Field 1        | level - ascending      |
| Field 2        | language - ascending   |
| Field 3        | time - ascending       |

The index can be created in the Firebase Console under **Firestore → Indexes → Composite**, 
or by clicking the link Firestore prints in the browser console when the query fails.

**Why the order matters**: Firestore builds the index in the order the fields are declared. 
Equality fields must come before the field used in **orderBy**. Declaring time first would make the index unusable for this query.

### Security Rules
Firestore rules are the only server-side validation. The rules below allow public reads, validated creates, and deny all updates and deletes:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scores/{docId} {
      allow read: if true;

      allow create: if request.resource.data.keys().hasAll(
                        ['level','language','time','name','animal','animalName','country','createdAt']
                    )
                    && request.resource.data.level in ['easy','medium','hard']
                    && request.resource.data.language in ['en','es','de']
                    && request.resource.data.time is number
                    && request.resource.data.time > 0
                    && request.resource.data.time < 3600000
                    && request.resource.data.name is string
                    && request.resource.data.name.size() <= 40
                    && request.resource.data.country is string
                    && request.resource.data.country.size() == 2;

      allow update, delete: if false;
    }
  }
}
```

Each **rule has a purpose**:

- **hasAll([...])** rejects documents missing any required field


- in **['easy','medium','hard']** blocks invented difficulty values

- **time > 0 and time < 3600000** reject negative times and anything above one hour


- **name.size() <= 40** prevents oversized strings from bloating the collection


- **country.size() == 2** enforces the ISO alpha-2 format


- **allow update, delete: if false** makes the leaderboard append-only — no score can be edited or removed from the browser


**Important limitation**: these rules validate the shape of the data, not its **honesty**.
A determined player can still write a fake time of **1 millisecond** through the browser console, 
because there is no authentication and no server-side verification of the game result. 
This is an accepted trade-off for a project without a backend. See **Known Issues**.

---
## Game Mechanics
| level  | grid size | directions allowed                             |
|--------|-----------|------------------------------------------------|
| easy   | 10x10     | horizontal and vertical only                   |
| medium | 12x12     | All 8 directions                               |
| hard   | 15x15     | All 8 directions + show hints instead of words |

- **Word selection: chooseRandomWords()** filters the pool by language and level, removes words longer than the grid size, 
then picks 10 at random without repetition.


- **Word placement: placeWord()** tries up to 100 random positions and directions per word. 
A word fits if every cell on its path is either empty or already holds the same letter. 
Words that fail 50 placement attempts are discarded.


- **Accent handling**: words are normalized to NFC and split with **Array.from()** so accented characters (á, ü, ß) count as single letters. 
This matters for German and Spanish.


- **Word validation**: the player clicks two cells. **checkWord()** verifies the selection is a straight line (horizontal, 
vertical or 45° diagonal), reads the letters along the path, and compares both the forward and reversed string against the word list.


- **Game limit**: the player has 3 "New Game" clicks per session **(MAX_NEW_GAMES in main.js)**. The counter is not persisted.


- **Timer**: starts with **startTimer()** on game start, stops in **winGame()**. 
The elapsed time is stored in **pendingTime** and saved with the score.

- **Ocean progress**: updateOcean() converts foundCount / WORDS.length into a visual state. 
The pollution layer opacity becomes **1 - progress**, and the number of visible trash items becomes **trashItems.length × (1 - progress)**.

---
## Setup
1. **Create or download the project**
```
git clone <repository-url>
cd WordSearchGame
```
2. **Create a Firebase Project**
   - Go to https://console.firebase.google.com/
   - Create a project
   - Add a Web App and copy the configuration object
   - Enable Cloud Firestone in production mode
   - Choose a region (e.g. **europe-west3** for Frankfurt)


3. **Paste the Configuration into** *firebase.js*
```
const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};
```

4. **Create the Composite Index**
    
    In Firestore → Indexes → Composite, create an index with:
    - Collection: scores
    - Fields: level (Ascending), language (Ascending), time (Ascending)
    - Query Scope: Collection


5. **Apply the security rules shown in Data Model**


6. **Run locally**
    
    Open index.html in the browser, or use a local server:
    

7. **Verify the setup**
    
    Start a game, find all words, save a score, and reload the page. If the score appears in the leaderboard after
    the reload, the Firestore connection, the composite index and the security rules are working.

---