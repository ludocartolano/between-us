
/* =========================================
   BETWEEN US
   Main Game Script
========================================= */


/* 1. DOM ELEMENTS */

// Screens
const homeScreen = document.getElementById("home-screen");
const levelSelection = document.getElementById("level-selection");
const rulesSection = document.getElementById("rules-section");
const gameSection = document.getElementById("game-section");

// Navigation buttons
const startButton = document.getElementById("start-button");
const rulesButton = document.getElementById("rules-button");
const backButton = document.getElementById("back-button");
const rulesBackButton = document.getElementById("rules-back-button");
const gameBackButton = document.getElementById("game-back-button");

// Level selection
const levelButtons = document.querySelectorAll(".level-button");

// Card elements
const questionCard = document.getElementById("question-card");
const questionText = document.getElementById("question-text");
const currentLevel = document.getElementById("current-level");
const cardCategory = document.getElementById("card-category");

// Game buttons
const nextCardButton = document.getElementById("next-card-button");
const specialCardButton = document.getElementById("special-card-button");


/* 2. GAME STATE */

let mainDeck = [];
let remainingSpecialCards = [];

let remainingPlotScenarios = [];
let remainingMatchScenarios = [];

let currentCard = null;
let perfectMatchRound = 0;

const PERFECT_MATCH_ROUNDS = 3;


/* 3. SCENARIO ELEMENTS */

// Create scenario container
const scenarioArea = document.createElement("div");
scenarioArea.id = "scenario-area";
scenarioArea.classList.add("hidden");

// Create scenario text
const scenarioText = document.createElement("p");
scenarioText.id = "scenario-text";

// Create scenario button
const anotherScenarioButton = document.createElement("button");
anotherScenarioButton.id = "another-scenario-button";
anotherScenarioButton.type = "button";
anotherScenarioButton.textContent = "Another Scenario";

// Add elements to scenario container
scenarioArea.appendChild(scenarioText);
scenarioArea.appendChild(anotherScenarioButton);

// Insert inside card back
questionText.insertAdjacentElement("afterend", scenarioArea);


/* 4. UTILITIES */

// Shuffle an array without changing the original
function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}


/* 5. SCREEN NAVIGATION */

// Show exactly one screen
function showScreen(screen) {
    const screens = [
        homeScreen,
        levelSelection,
        rulesSection,
        gameSection
    ];

    screens.forEach(item => {
        item.classList.add("hidden");
    });

    screen.classList.remove("hidden");

    // Reset page scroll
    window.scrollTo(0, 0);
}

// Home to level selection
startButton.addEventListener("click", () => {
    showScreen(levelSelection);
});

// Home to rules
rulesButton.addEventListener("click", () => {
    showScreen(rulesSection);
});

// Levels back to home
backButton.addEventListener("click", () => {
    showScreen(homeScreen);
});

// Rules back to home
rulesBackButton.addEventListener("click", () => {
    showScreen(homeScreen);
});

// Game back to levels
gameBackButton.addEventListener("click", () => {
    showScreen(levelSelection);
});


/* 6. START GAME */

function startGame(level) {

    // Filter cards by level
    const availableCards = CARDS.filter(card =>
        level === "all" || Number(card.level) === Number(level)
    );

    // Reset decks
    remainingSpecialCards = shuffle(SPECIAL_CARDS);
    remainingPlotScenarios = shuffle(PLOT_TWIST_SCENARIOS);
    remainingMatchScenarios = shuffle(PERFECT_MATCH_SCENARIOS);

    // Add three random special cards automatically
    const automaticSpecials = remainingSpecialCards.splice(0, 3);

    // Create main deck
    mainDeck = shuffle([
        ...availableCards.map(card => ({
            ...card,
            type: "normal"
        })),
        ...automaticSpecials.map(card => ({
            ...card,
            type: "special"
        }))
    ]);

    // Update special card button
    specialCardButton.disabled =
        remainingSpecialCards.length === 0;

    // Open game screen
    showScreen(gameSection);

    // Draw first card
    drawCard();
}


/* 7. SCENARIO MANAGEMENT */

function drawScenario(type) {
    const deck = type === "plotTwist"
        ? remainingPlotScenarios
        : remainingMatchScenarios;

    if (deck.length === 0) {
        scenarioText.textContent = "No more scenarios available.";
        anotherScenarioButton.disabled = true;
        return;
    }

    scenarioText.textContent = deck.pop();
    anotherScenarioButton.disabled = deck.length === 0;
}


/* 8. SHOW CARD */

function showCard(card) {
    currentCard = card;

    // Reset appearance
    questionCard.classList.remove("flipped", "special");

    // Reset scenario
    scenarioArea.classList.add("hidden");
    anotherScenarioButton.classList.add("hidden");
    anotherScenarioButton.disabled = false;

    // Reset next button
    nextCardButton.textContent = "Next Card →";
    nextCardButton.disabled = false;

    perfectMatchRound = 0;

    if (card.type === "special") {

        // Special card appearance
        questionCard.classList.add("special");

        questionText.textContent = card.instruction;
        cardCategory.textContent = card.title.toUpperCase();
        currentLevel.textContent = "✦ SPECIAL CARD";

        // Plot Twist
        if (card.scenarioType === "plotTwist") {
            scenarioArea.classList.remove("hidden");
            anotherScenarioButton.classList.remove("hidden");

            drawScenario("plotTwist");
        }

        // Perfect Match
        if (card.scenarioType === "perfectMatch") {
            perfectMatchRound = 1;

            scenarioArea.classList.remove("hidden");
            drawScenario("perfectMatch");

            nextCardButton.textContent = "Next Round (1/3)";
        }

    } else {

        // Normal card
        questionText.textContent = card.question;
        cardCategory.textContent = card.category.toUpperCase();

        currentLevel.textContent =
            "LEVEL " + card.level + " · " +
            card.category.toUpperCase();
    }
}


/* 9. DRAW CARD */


function drawCard() {

    // Prevent multiple clicks during the animation
    nextCardButton.disabled = true;

    // Return the card to its covered position
    questionCard.classList.remove("flipped");

    // Wait for the flip animation to finish
    setTimeout(() => {

        if (mainDeck.length === 0) {

            currentCard = null;

            questionCard.classList.remove("special");

            scenarioArea.classList.add("hidden");
            anotherScenarioButton.classList.add("hidden");

            questionText.textContent =
                "You've reached the end of this deck.";

            cardCategory.textContent = "ALL CARDS PLAYED";
            currentLevel.textContent = "BETWEEN US";

            nextCardButton.textContent = "Next Card";
            nextCardButton.disabled = true;

            return;
        }

        // Load the new question only after the flip
        showCard(mainDeck.pop());

    }, 700);
}



/* 10. SPECIAL CARDS */


function drawSpecialCard() {

    if (remainingSpecialCards.length === 0) {
        return;
    }

    // Prevent repeated taps during animation
    specialCardButton.disabled = true;
    nextCardButton.disabled = true;

    // Turn the current card face down
    questionCard.classList.remove("flipped");

    // Wait until the flip animation finishes
    setTimeout(() => {

        const special = remainingSpecialCards.pop();

        showCard({
            ...special,
            type: "special"
        });

        // Restore buttons after animation
        specialCardButton.disabled =
            remainingSpecialCards.length === 0;

        nextCardButton.disabled = false;

    }, 700);
}



/* 11. NEXT CARD / NEXT ROUND */

function handleNextCard() {

    if (
        currentCard &&
        currentCard.scenarioType === "perfectMatch" &&
        perfectMatchRound < PERFECT_MATCH_ROUNDS
    ) {

        perfectMatchRound++;

        drawScenario("perfectMatch");

        if (perfectMatchRound === PERFECT_MATCH_ROUNDS) {
            nextCardButton.textContent = "Complete Challenge";
        } else {
            nextCardButton.textContent =
                "Next Round (" + perfectMatchRound + "/3)";
        }

        return;
    }

    drawCard();
}


/* 12. CHANGE PLOT TWIST SCENARIO */

anotherScenarioButton.addEventListener("click", event => {
    event.stopPropagation();

    if (
        currentCard &&
        currentCard.scenarioType === "plotTwist"
    ) {
        drawScenario("plotTwist");
    }
});


/* 13. LEVEL SELECTION */

levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        startGame(button.dataset.level);
    });
});


/* 14. FLIP CARD */

function flipCard() {
    questionCard.classList.toggle("flipped");
}

// Tap or click
questionCard.addEventListener("click", flipCard);

// Keyboard accessibility
questionCard.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        flipCard();
    }
});

// Prevent scenario interactions from flipping card
scenarioArea.addEventListener("click", event => {
    event.stopPropagation();
});


/* 15. GAME CONTROLS */

nextCardButton.addEventListener("click", handleNextCard);
specialCardButton.addEventListener("click", drawSpecialCard);


/* 16. INITIAL SCREEN */

// Show Home when page loads
showScreen(homeScreen);
