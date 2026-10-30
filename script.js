
/* =========================================
   BETWEEN US
   COMPLETE GAME ENGINE · VERSION 5

   90 Questions · 5 Levels
   10 Special Cards
   Smart Shuffle 10:5:1
   Guided Journey + Free Exploration
   After Dark · Mutual Consent
   Save & Resume
========================================= */

"use strict";

// =========================================
// DOM ELEMENTS
// =========================================

const $ = id => document.getElementById(id);

const homeScreen = $("home-screen");
const welcomeScreen = $("welcome-screen");
const yourGameScreen = $("your-game-screen");
const modeSelection = $("mode-selection");
const levelSelection = $("level-selection");
const rulesSection = $("rules-section");
const gameSection = $("game-section");

const startButton = $("start-button");
const rulesButton = $("rules-button");
const yourGameButton = $("your-game-button");

const welcomeResumeButton = $("welcome-resume-button");
const welcomeNewButton = $("welcome-new-button");
const welcomeManageButton = $("welcome-manage-button");

const manageResumeButton = $("manage-resume-button");
const manageNewButton = $("manage-new-button");
const manageResetButton = $("manage-reset-button");
const manageResetAllButton = $("manage-reset-all-button");
const manageBackButton = $("manage-back-button");

const modeBackButton = $("mode-back-button");
const backButton = $("back-button");
const rulesBackButton = $("rules-back-button");
const gameBackButton = $("game-back-button");

const guidedModeButton = $("guided-mode-button");
const freeModeButton = $("free-mode-button");

const questionCard = $("question-card");
const questionText = $("question-text");
const currentLevel = $("current-level");
const cardCategory = $("card-category");

const nextCardButton = $("next-card-button");
const previousCardButton = $("previous-card-button");
const specialCardButton = $("special-card-button");
const changeLevelButton = $("change-level-button");
const continueJourneyButton = $("continue-journey-button");

const scenarioArea = $("scenario-area");
const scenarioText = $("scenario-text");
const anotherScenarioButton = $("another-scenario-button");

const timerArea = $("timer-area");
const timerDisplay = $("timer-display");
const timerButton = $("timer-button");

const welcomeMode = $("welcome-mode");
const welcomeLevel = $("welcome-level");
const welcomeProgressTrack = $("welcome-progress-track");
const welcomeProgressFill = $("welcome-progress-fill");
const welcomeQuestions = $("welcome-questions");
const welcomeSpecials = $("welcome-specials");

const confirmOverlay = $("confirm-overlay");
const confirmNewGameButton = $("confirm-new-game");
const cancelNewGameButton = $("cancel-new-game");

const journeyOverlay = $("journey-overlay");
const journeyTitle = $("journey-title");
const journeyDescription = $("journey-description");
const nextLevelButton = $("next-level-button");
const stayLevelButton = $("stay-level-button");

const resetHistoryOverlay = $("reset-history-overlay");
const confirmResetHistoryButton = $("confirm-reset-history");
const cancelResetHistoryButton = $("cancel-reset-history");

const resetAllOverlay = $("reset-all-overlay");
const confirmResetAllButton = $("confirm-reset-all");
const cancelResetAllButton = $("cancel-reset-all");

// =========================================
// CONSTANTS
// =========================================

const HISTORY_KEY = "betweenUsQuestionHistory";
const SAVE_KEY = "betweenUsSavedGameV2";
const SAVE_VERSION = 5;

const FLIP_DURATION = 700;
const TIMER_DURATION = 30;
const GUIDED_TARGET = 8;
const PERFECT_MATCH_ROUNDS = 3;

const GUIDED_SPECIAL_QUOTAS = [2, 3, 2, 3, 2];

const LEVEL_NAMES = {
    1: "THE SPARK",
    2: "BENEATH THE SURFACE",
    3: "THE CHEMISTRY",
    4: "BETWEEN US",
    5: "AFTER DARK"
};

const SPECIAL_WEIGHTS = {
    S1: [3, 4, 5, 5, 3],
    S2: [2, 3, 4, 4, 3],
    S3: [5, 5, 3, 2, 2],
    S4: [1, 2, 4, 5, 3],
    S5: [5, 4, 4, 3, 3],
    S6: [5, 5, 4, 3, 3],
    S7: [3, 4, 5, 4, 4],
    S8: [1, 2, 4, 5, 3],
    S9: [0, 0, 0, 0, 6],
    S10: [0, 0, 0, 0, 6]
};

const SPECIAL_LIMITS = {
    S1: 3,
    S2: 1,
    S3: 3,
    S4: 1,
    S5: 3,
    S6: 3,
    S7: 2,
    S8: 1,
    S9: 1,
    S10: 1
};

// =========================================
// GAME STATE
// =========================================

let gameMode = null;
let selectedLevel = "1";

let guidedLevel = 1;
let guidedCount = 0;
let guidedMilestone = 0;
let guidedComplete = false;
let guidedSpecialsByLevel = {};
let stayingLonger = false;

let mainDeck = [];
let levelDecks = {};

let remainingSpecialCards = [];
let remainingPlotScenarios = [];
let remainingMatchScenarios = [];

let cardBackStack = [];
let cardForwardStack = [];
let pendingCardSnapshot = null;

let currentCard = null;
let cardFaceUp = false;
let gameActive = false;

let perfectMatchRound = 0;

let normalSinceSpecial = 2;
let specialCount = 0;
let specialUsage = {};
let specialSeen = [];

let sessionQuestions = 0;
let sessionDrawnIds = [];

let levelSelectionPurpose = "new";

let transitionPending = false;
let transitionTimeout = null;

let pendingNewGame = null;
let previousModalFocus = null;
let manageReturnScreen = homeScreen;

let timerInterval = null;
let timerRemaining = TIMER_DURATION;
let timerDuration = TIMER_DURATION;
let timerRound = 1;
let audioContext = null;

let afterDarkConsentGranted = false;
let afterDarkPendingAction = null;
let afterDarkDeclineAction = null;

// =========================================
// UTILITIES
// =========================================

function shuffle(items) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [
            result[j],
            result[i]
        ];
    }

    return result;
}

function showScreen(screen) {
    [
        homeScreen,
        welcomeScreen,
        yourGameScreen,
        modeSelection,
        levelSelection,
        rulesSection,
        gameSection
    ].forEach(element => {
        if (element) {
            element.classList.add("hidden");
        }
    });

    if (screen) {
        screen.classList.remove("hidden");
    }

    window.scrollTo(0, 0);
}

function isAfterDarkLevel(level) {
    return String(level) === "5";
}

function isAfterDarkCard(card) {
    if (!card) return false;

    return (
        Number(card.level) === 5 ||
        card.afterDarkOnly === true ||
        card.id === "S9" ||
        card.id === "S10"
    );
}

function getCurrentLevel() {
    return gameMode === "guided"
        ? guidedLevel
        : selectedLevel;
}

function isSpecialAllowed(card, level) {
    if (!card) return false;

    if (card.afterDarkOnly) {
        return isAfterDarkLevel(level);
    }

    return true;
}

function getSpecialLimit(card) {
    return SPECIAL_LIMITS[card.id] || 1;
}

function getSpecialUsage(card) {
    return specialUsage[card.id] || 0;
}

function canUseSpecial(card, level) {
    return (
        isSpecialAllowed(card, level) &&
        getSpecialUsage(card) < getSpecialLimit(card)
    );
}

// =========================================
// SMART SHUFFLE 10:5:1
// =========================================

function getHistoryData() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        const value = JSON.parse(raw || "null");

        if (
            value &&
            !Array.isArray(value) &&
            typeof value.cards === "object" &&
            value.cards !== null
        ) {
            return {
                gameNumber:
                    Number(value.gameNumber) || 0,
                cards: value.cards
            };
        }

        const cards = {};

        // Compatibility with older ID arrays.
        if (Array.isArray(value)) {
            value.forEach(id => {
                cards[String(id)] = {
                    count: 1,
                    lastGame: 0
                };
            });
        }

        return {
            gameNumber: 0,
            cards
        };

    } catch {
        return {
            gameNumber: 0,
            cards: {}
        };
    }
}

function writeHistoryData(history) {
    try {
        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(history)
        );
    } catch (error) {
        console.warn(
            "Unable to save card history:",
            error
        );
    }
}

function beginHistorySession() {
    const history = getHistoryData();

    history.gameNumber += 1;

    writeHistoryData(history);
}

function rememberQuestion(card) {
    if (!card || card.type !== "normal") {
        return;
    }

    const id = String(card.id);

    if (sessionDrawnIds.includes(id)) {
        return;
    }

    sessionDrawnIds.push(id);

    const history = getHistoryData();

    const previous = history.cards[id] || {
        count: 0,
        lastGame: -1
    };

    history.cards[id] = {
        count: (Number(previous.count) || 0) + 1,
        lastGame: history.gameNumber
    };

    writeHistoryData(history);
}

function questionWeight(card, history) {
    const record = history.cards[String(card.id)];

    if (!record) {
        return 10;
    }

    if (
        Number(record.lastGame) ===
        history.gameNumber - 1
    ) {
        return 1;
    }

    return 5;
}

function smartShuffle(cards) {
    const history = getHistoryData();

    // Weighted sampling without replacement.
    // The game draws with pop().

    return cards
        .map(card => {
            const weight = questionWeight(
                card,
                history
            );

            const random = Math.max(
                Number.MIN_VALUE,
                Math.random()
            );

            return {
                card,
                key: -Math.log(random) / weight
            };
        })
        .sort((a, b) => b.key - a.key)
        .map(item => item.card);
}

function makeNormalDeck(level) {
    const cards = CARDS.filter(card => {
        const matchesLevel =
            level === "all"
                ? Number(card.level) <= 4
                : Number(card.level) === Number(level);

        const notUsed =
            !sessionDrawnIds.includes(
                String(card.id)
            );

        return matchesLevel && notUsed;
    });

    return smartShuffle(
        cards.map(card => ({
            ...card,
            type: "normal"
        }))
    );
}

// =========================================
// PREVIOUS / NEXT CARD HISTORY
// =========================================

function captureCardSnapshot() {
    if (!currentCard) return null;
    return JSON.parse(JSON.stringify({
        gameMode, selectedLevel, guidedLevel, guidedCount,
        guidedMilestone, guidedComplete, guidedSpecialsByLevel,
        stayingLonger, mainDeck, levelDecks, remainingSpecialCards,
        remainingPlotScenarios, remainingMatchScenarios,
        currentCard, cardFaceUp, perfectMatchRound,
        scenario: scenarioText.textContent,
        anotherScenarioDisabled: anotherScenarioButton.disabled,
        normalSinceSpecial, specialCount, specialUsage, specialSeen,
        sessionQuestions, sessionDrawnIds, afterDarkConsentGranted,
        timerDuration, timerRemaining, timerRound,
        timerButtonText: timerButton.textContent,
        timerComplete: timerDisplay.classList.contains("timer-complete")
    }));
}

function updateCardHistoryButtons() {
    previousCardButton.disabled = !gameActive || transitionPending || cardBackStack.length === 0;
}

function restoreCardSnapshot(snapshot) {
    if (!snapshot) return;
    cancelTransition();
    stopTimer();
    pendingCardSnapshot = null;

    gameMode = snapshot.gameMode;
    selectedLevel = snapshot.selectedLevel;
    guidedLevel = snapshot.guidedLevel;
    guidedCount = snapshot.guidedCount;
    guidedMilestone = snapshot.guidedMilestone;
    guidedComplete = snapshot.guidedComplete;
    guidedSpecialsByLevel = snapshot.guidedSpecialsByLevel;
    stayingLonger = snapshot.stayingLonger;
    mainDeck = snapshot.mainDeck;
    levelDecks = snapshot.levelDecks;
    remainingSpecialCards = snapshot.remainingSpecialCards;
    remainingPlotScenarios = snapshot.remainingPlotScenarios;
    remainingMatchScenarios = snapshot.remainingMatchScenarios;
    normalSinceSpecial = snapshot.normalSinceSpecial;
    specialCount = snapshot.specialCount;
    specialUsage = snapshot.specialUsage;
    specialSeen = snapshot.specialSeen;
    sessionQuestions = snapshot.sessionQuestions;
    sessionDrawnIds = snapshot.sessionDrawnIds;
    afterDarkConsentGranted = snapshot.afterDarkConsentGranted;

    showCard(snapshot.currentCard, { restore: true });
    perfectMatchRound = snapshot.perfectMatchRound;
    scenarioText.textContent = snapshot.scenario;
    anotherScenarioButton.disabled = snapshot.anotherScenarioDisabled;
    if (snapshot.currentCard.scenarioType === "perfectMatch") {
        nextCardButton.textContent = perfectMatchRound >= PERFECT_MATCH_ROUNDS
            ? "Complete Challenge"
            : "Next Round (" + perfectMatchRound + "/3)";
    }
    timerDuration = snapshot.timerDuration;
    timerRound = snapshot.timerRound;
    // An active timer is intentionally paused/reset when navigating history.
    timerRemaining = snapshot.timerComplete ? 0 : timerDuration;
    updateTimerDisplay();
    if (snapshot.timerComplete) {
        timerDisplay.textContent = "Time's Up!";
        timerDisplay.classList.add("timer-complete");
        timerButton.textContent = snapshot.timerButtonText;
    } else {
        timerButton.textContent = "Start Challenge";
    }
    cardFaceUp = snapshot.cardFaceUp;
    questionCard.classList.toggle("flipped", cardFaceUp);
    updateJourneyControls();
    updateCardHistoryButtons();
    saveGame();
}

function showPreviousCard() {
    if (!gameActive || transitionPending || !cardBackStack.length) return;
    const current = captureCardSnapshot();
    if (current) cardForwardStack.push(current);
    restoreCardSnapshot(cardBackStack.pop());
}

function showForwardCard() {
    if (!gameActive || transitionPending || !cardForwardStack.length) return;
    const current = captureCardSnapshot();
    if (current) cardBackStack.push(current);
    restoreCardSnapshot(cardForwardStack.pop());
}

previousCardButton.addEventListener("click", showPreviousCard);

// =========================================
// SAVE & RESUME
// =========================================

function loadSavedGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);

        if (!raw) return null;

        const save = JSON.parse(raw);

        if (
            !save ||
            ![3, 4, 5].includes(Number(save.version)) ||
            !Array.isArray(save.mainDeck) ||
            !save.currentCard
        ) {
            return null;
        }

        return save;

    } catch {
        return null;
    }
}

function saveGame() {
    if (
        !gameActive ||
        !currentCard ||
        transitionPending
    ) {
        return;
    }

    const save = {
        version: SAVE_VERSION,

        gameMode,
        selectedLevel,

        guidedLevel,
        guidedCount,
        guidedMilestone,
        guidedComplete,
        guidedSpecialsByLevel,
        stayingLonger,

        mainDeck,
        levelDecks,

        remainingSpecialCards,
        remainingPlotScenarios,
        remainingMatchScenarios,

        currentCard,
        cardFaceUp,
        perfectMatchRound,
        cardBackStack,
        cardForwardStack,

        scenario: scenarioText.textContent,
        anotherScenarioDisabled:
            anotherScenarioButton.disabled,

        normalSinceSpecial,
        specialCount,
        specialUsage,
        specialSeen,

        sessionQuestions,
        sessionDrawnIds,

        afterDarkConsentGranted,

        timerDuration,
        timerRemaining,
        timerRound,

        savedAt: Date.now()
    };

    try {
        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(save)
        );
    } catch (error) {
        console.warn(
            "Unable to save game:",
            error
        );
    }
}

function clearSavedGame() {
    try {
        localStorage.removeItem(SAVE_KEY);
    } catch {}
}

// =========================================
// MODALS
// =========================================

function openModal(overlay) {
    previousModalFocus = document.activeElement;

    overlay.classList.remove("hidden");

    const button = overlay.querySelector(
        "button:not(:disabled)"
    );

    if (button) {
        button.focus();
    }
}

function closeModal(overlay) {
    overlay.classList.add("hidden");

    if (
        previousModalFocus &&
        typeof previousModalFocus.focus === "function"
    ) {
        previousModalFocus.focus();
    }
}

function requestNewGame(action) {
    if (!loadSavedGame()) {
        action();
        return;
    }

    pendingNewGame = action;
    openModal(confirmOverlay);
}

confirmNewGameButton.addEventListener("click", () => {
    const action = pendingNewGame;

    pendingNewGame = null;

    closeModal(confirmOverlay);

    if (action) {
        action();
    }
});

cancelNewGameButton.addEventListener("click", () => {
    pendingNewGame = null;
    closeModal(confirmOverlay);
});

confirmOverlay.addEventListener("click", event => {
    if (event.target === confirmOverlay) {
        pendingNewGame = null;
        closeModal(confirmOverlay);
    }
});

// =========================================
// AFTER DARK · CONSENT GATE
// =========================================

// Created dynamically so existing HTML
// remains compatible until the CSS update.

const afterDarkOverlay = document.createElement("div");

afterDarkOverlay.id = "after-dark-overlay";

afterDarkOverlay.className =
    "modal-overlay after-dark-overlay hidden";

afterDarkOverlay.innerHTML = `
    <section
        class="after-dark-consent"
        role="dialog"
        aria-modal="true"
        aria-labelledby="after-dark-title"
    >
        <p class="after-dark-eyebrow">
            LEVEL 5 · AFTER DARK
        </p>

        <h2 id="after-dark-title">
            Shall we take this after dark?
        </h2>

        <p class="after-dark-intro">
            A deeper conversation,
            only if you both want it.
        </p>

        <div class="after-dark-agreements">
            <label>
                <input
                    type="checkbox"
                    id="after-dark-player-one"
                >
                Player 1 wants to continue
            </label>

            <label>
                <input
                    type="checkbox"
                    id="after-dark-player-two"
                >
                Player 2 wants to continue
            </label>
        </div>

        <p class="after-dark-boundaries">
            Either of you can pass, skip a card,
            or stop at any time.
            Sharing a fantasy is never consent
            to act on it.
        </p>

        <button
            id="after-dark-accept"
            type="button"
            disabled
        >
            Keep Playing
        </button>

        <button
            id="after-dark-decline"
            type="button"
        >
            End the Night
        </button>
    </section>
`;

document.body.appendChild(afterDarkOverlay);

const afterDarkPlayerOne =
    $("after-dark-player-one");

const afterDarkPlayerTwo =
    $("after-dark-player-two");

const afterDarkAccept =
    $("after-dark-accept");

const afterDarkDecline =
    $("after-dark-decline");

function updateAfterDarkConsent() {
    afterDarkAccept.disabled = !(
        afterDarkPlayerOne.checked &&
        afterDarkPlayerTwo.checked
    );
}

afterDarkPlayerOne.addEventListener(
    "change",
    updateAfterDarkConsent
);

afterDarkPlayerTwo.addEventListener(
    "change",
    updateAfterDarkConsent
);

function requestAfterDarkConsent(
    action,
    declineAction = null
) {
    afterDarkPendingAction = action;
    afterDarkDeclineAction = declineAction;

    afterDarkPlayerOne.checked = false;
    afterDarkPlayerTwo.checked = false;

    updateAfterDarkConsent();

    openModal(afterDarkOverlay);
    afterDarkPlayerOne.focus();
}

function closeAfterDarkConsent() {
    closeModal(afterDarkOverlay);

    afterDarkPendingAction = null;
    afterDarkDeclineAction = null;
}

afterDarkAccept.addEventListener("click", () => {
    if (
        !afterDarkPlayerOne.checked ||
        !afterDarkPlayerTwo.checked
    ) {
        return;
    }

    const action = afterDarkPendingAction;

    closeAfterDarkConsent();

    afterDarkConsentGranted = true;

    if (typeof action === "function") {
        action();
    }
});

afterDarkDecline.addEventListener("click", () => {
    const action = afterDarkDeclineAction;

    closeAfterDarkConsent();

    if (typeof action === "function") {
        action();
    } else {
        openWelcomeOrHome();
    }
});

// Do not close this dialog by clicking
// outside it: the choice must be explicit.

// =========================================
// MODAL KEYBOARD HANDLING
// =========================================

document.addEventListener("keydown", event => {
    const overlays = [
        afterDarkOverlay,
        confirmOverlay,
        journeyOverlay,
        resetHistoryOverlay,
        resetAllOverlay
    ];

    const overlay = overlays.find(item =>
        !item.classList.contains("hidden")
    );

    if (!overlay) return;

    if (event.key === "Escape") {
        if (overlay === afterDarkOverlay) {
            afterDarkDecline.click();
        } else if (overlay !== journeyOverlay) {
            if (overlay === confirmOverlay) {
                pendingNewGame = null;
            }

            closeModal(overlay);
        }

        return;
    }

    if (event.key !== "Tab") return;

    const focusable = [
        ...overlay.querySelectorAll(
            "button:not(:disabled), input:not(:disabled)"
        )
    ];

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (
        event.shiftKey &&
        document.activeElement === first
    ) {
        event.preventDefault();
        last.focus();

    } else if (
        !event.shiftKey &&
        document.activeElement === last
    ) {
        event.preventDefault();
        first.focus();
    }
});

// =========================================
// TIMER · 30 / 60 SECONDS
// =========================================

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerRemaining / 60);
    const seconds = timerRemaining % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

    const progress =
        timerDuration > 0
            ? timerRemaining / timerDuration * 100
            : 0;

    timerDisplay.style.setProperty(
        "--timer-progress",
        progress + "%"
    );

    timerDisplay.classList.remove(
        "timer-complete"
    );
}

function resetTimer() {
    stopTimer();

    timerRemaining = timerDuration;

    updateTimerDisplay();

    timerButton.textContent = "Start Challenge";
    timerButton.disabled = false;
}

function prepareAudio() {
    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContextClass) return;

    try {
        if (!audioContext) {
            audioContext = new AudioContextClass();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume().catch(() => {});
        }
    } catch {}
}

function playCompletionSound() {
    if (
        !audioContext ||
        audioContext.state !== "running"
    ) {
        return;
    }

    const now = audioContext.currentTime;

    const notes = [
        {
            frequency: 523.25,
            delay: 0,
            duration: 0.18
        },
        {
            frequency: 659.25,
            delay: 0.22,
            duration: 0.28
        }
    ];

    notes.forEach(note => {
        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value =
            note.frequency;

        const start = now + note.delay;
        const end = start + note.duration;

        gain.gain.setValueAtTime(
            0.0001,
            start
        );

        gain.gain.exponentialRampToValueAtTime(
            0.12,
            start + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            end
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(start);
        oscillator.stop(end + 0.02);
    });
}

function completeTimer() {
    stopTimer();

    timerRemaining = 0;

    timerDisplay.textContent = "Time's Up!";

    timerDisplay.style.setProperty(
        "--timer-progress",
        "0%"
    );

    timerDisplay.classList.add(
        "timer-complete"
    );

    playCompletionSound();

    if (typeof navigator.vibrate === "function") {
        navigator.vibrate([150, 100, 150]);
    }

    if (
        currentCard &&
        currentCard.id === "S10"
    ) {
        if (timerRound === 1) {
            timerButton.textContent =
                "Switch Roles · Player 2";
        } else {
            timerButton.textContent =
                "Try Again";
        }
    } else {
        timerButton.textContent = "Try Again";
    }

    saveGame();
}

function startTimer() {
    resetTimer();
    prepareAudio();

    timerButton.textContent = "Restart Challenge";

    const endTime =
        Date.now() + timerDuration * 1000;

    timerInterval = setInterval(() => {
        timerRemaining = Math.max(
            0,
            Math.ceil(
                (endTime - Date.now()) / 1000
            )
        );

        updateTimerDisplay();

        if (timerRemaining === 0) {
            completeTimer();
        }
    }, 100);
}

timerButton.addEventListener("click", event => {
    event.stopPropagation();

    if (
        currentCard &&
        currentCard.id === "S10" &&
        timerRemaining === 0 &&
        timerRound === 1
    ) {
        timerRound = 2;
    }

    startTimer();
});

timerArea.addEventListener("click", event => {
    event.stopPropagation();
});

// =========================================
// SCENARIOS
// =========================================

function drawScenario(type) {
    const deck =
        type === "plotTwist"
            ? remainingPlotScenarios
            : remainingMatchScenarios;

    if (!deck.length) {
        scenarioText.textContent =
            "No more scenarios available.";

        anotherScenarioButton.disabled = true;
        return;
    }

    scenarioText.textContent = deck.pop();

    anotherScenarioButton.disabled =
        deck.length === 0;

    saveGame();
}

anotherScenarioButton.addEventListener(
    "click",
    event => {
        event.stopPropagation();

        if (
            currentCard &&
            currentCard.scenarioType === "plotTwist"
        ) {
            drawScenario("plotTwist");
        }
    }
);

scenarioArea.addEventListener("click", event => {
    event.stopPropagation();
});

// =========================================
// SPECIAL CARDS
// =========================================

function chooseWeightedSpecial(level) {
    const eligible = SPECIAL_CARDS.filter(card =>
        canUseSpecial(card, level)
    );

    if (!eligible.length) return null;

    const unseen = eligible.filter(card =>
        !specialSeen.includes(card.id)
    );

    const pool =
        gameMode === "guided" &&
        unseen.length
            ? unseen
            : eligible;

    const levelIndex = Math.max(
        0,
        Math.min(4, Number(level) - 1)
    );

    const weighted = pool.map(card => ({
        card,
        weight:
            (
                SPECIAL_WEIGHTS[card.id] ||
                [3, 3, 3, 3, 3]
            )[levelIndex] || 1
    }));

    const total = weighted.reduce(
        (sum, item) => sum + item.weight,
        0
    );

    let random = Math.random() * total;

    for (const item of weighted) {
        random -= item.weight;

        if (random <= 0) {
            return item.card;
        }
    }

    return weighted[weighted.length - 1].card;
}

function registerSpecial(card) {
    specialUsage[card.id] =
        getSpecialUsage(card) + 1;

    if (!specialSeen.includes(card.id)) {
        specialSeen.push(card.id);
    }

    specialCount++;
    normalSinceSpecial = 0;

    remainingSpecialCards =
        remainingSpecialCards.filter(
            item => item.id !== card.id
        );

    // Remove any queued copies if the
    // individual limit has been reached.
    if (
        getSpecialUsage(card) >=
        getSpecialLimit(card)
    ) {
        mainDeck = mainDeck.filter(item =>
            item.id !== card.id ||
            item.type !== "special"
        );
    }
}

function specialAvailable() {
    const level = getCurrentLevel();

    if (gameMode === "guided") {
        return SPECIAL_CARDS.some(card =>
            canUseSpecial(card, level)
        );
    }

    return remainingSpecialCards.some(card =>
        canUseSpecial(card, level)
    );
}

function updateSpecialButton() {
    specialCardButton.classList.toggle(
        "hidden",
        gameMode === "guided"
    );

    specialCardButton.disabled =
        !gameActive ||
        transitionPending ||
        !specialAvailable();
}

function updateJourneyControls() {
    const canContinue =
        gameMode === "guided" &&
        stayingLonger &&
        guidedLevel < 5 &&
        gameActive;

    continueJourneyButton.classList.toggle(
        "hidden",
        !canContinue
    );

    if (canContinue) {
        continueJourneyButton.textContent =
            guidedLevel === 4
                ? "Discover After Dark →"
                : "Ready for Level " +
                  (guidedLevel + 1) + "? →";
    }

    changeLevelButton.classList.toggle(
        "hidden",
        gameMode !== "free"
    );

    updateSpecialButton();
}

// =========================================
// CARD DISPLAY
// =========================================

function showCard(card, options = {}) {
    if (!options.restore && pendingCardSnapshot) {
        cardBackStack.push(pendingCardSnapshot);
        cardForwardStack = [];
    }
    pendingCardSnapshot = null;
    currentCard = card;
    cardFaceUp = false;

    stopTimer();

    timerDuration =
        Number(card.timerDuration) ||
        (
            card.id === "S10"
                ? 60
                : TIMER_DURATION
        );

    timerRound = 1;
    resetTimer();

    timerArea.classList.add("hidden");

    questionCard.classList.remove(
        "flipped",
        "special",
        "after-dark"
    );

    scenarioArea.classList.add("hidden");
    anotherScenarioButton.classList.add("hidden");
    anotherScenarioButton.disabled = false;

    nextCardButton.textContent = "Next Card →";
    nextCardButton.disabled = false;

    perfectMatchRound = 0;

    if (isAfterDarkCard(card)) {
        questionCard.classList.add("after-dark");
    }

    if (card.type === "special") {
        questionCard.classList.add("special");

        questionText.textContent =
            card.instruction;

        cardCategory.textContent =
            card.title.toUpperCase();

        currentLevel.textContent =
            isAfterDarkCard(card)
                ? "LEVEL 5 · AFTER DARK SPECIAL"
                : "✦ SPECIAL CARD";

        if (
            card.id === "S3" ||
            card.id === "S10"
        ) {
            timerArea.classList.remove("hidden");
        }

        if (card.scenarioType === "plotTwist") {
            scenarioArea.classList.remove("hidden");

            anotherScenarioButton.classList.remove(
                "hidden"
            );

            if (!options.restore) {
                drawScenario("plotTwist");
            }
        }

        if (
            card.scenarioType === "perfectMatch"
        ) {
            perfectMatchRound = 1;

            scenarioArea.classList.remove("hidden");

            if (!options.restore) {
                drawScenario("perfectMatch");
            }

            nextCardButton.textContent =
                "Next Round (1/3)";
        }

    } else {
        questionText.textContent =
            card.question;

        cardCategory.textContent =
            String(card.category).toUpperCase();

        currentLevel.textContent =
            "LEVEL " +
            card.level +
            " · " +
            LEVEL_NAMES[card.level];

        if (!options.restore) {
            rememberQuestion(card);
            sessionQuestions++;
        }
    }

    updateJourneyControls();
    updateCardHistoryButtons();

    if (
        !options.restore &&
        !transitionPending
    ) {
        saveGame();
    }
}

// =========================================
// TRANSITIONS
// =========================================

function cancelTransition() {
    if (transitionTimeout !== null) {
        clearTimeout(transitionTimeout);
        transitionTimeout = null;
    }

    transitionPending = false;
}

function transitionTo(callback) {
    if (transitionPending) return;

    transitionPending = true;

    stopTimer();

    nextCardButton.disabled = true;
    previousCardButton.disabled = true;
    specialCardButton.disabled = true;

    questionCard.classList.remove("flipped");
    cardFaceUp = false;

    transitionTimeout = setTimeout(() => {
        transitionTimeout = null;

        try {
            callback();
        } finally {
            transitionPending = false;
            pendingCardSnapshot = null;
            updateJourneyControls();
            updateCardHistoryButtons();

            if (gameActive && currentCard) {
                saveGame();
            }
        }
    }, FLIP_DURATION);
}

// =========================================
// RESET GAME STATE
// =========================================

function resetGameState() {
    cardBackStack = [];
    cardForwardStack = [];
    pendingCardSnapshot = null;
    cancelTransition();
    stopTimer();

    gameMode = null;
    selectedLevel = "1";

    guidedLevel = 1;
    guidedCount = 0;
    guidedMilestone = 0;
    guidedComplete = false;
    guidedSpecialsByLevel = {};
    stayingLonger = false;

    mainDeck = [];
    levelDecks = {};

    remainingSpecialCards = [];

    remainingPlotScenarios =
        shuffle(PLOT_TWIST_SCENARIOS);

    remainingMatchScenarios =
        shuffle(PERFECT_MATCH_SCENARIOS);

    currentCard = null;
    cardFaceUp = false;
    gameActive = false;

    perfectMatchRound = 0;

    normalSinceSpecial = 2;
    specialCount = 0;
    specialUsage = {};
    specialSeen = [];

    sessionQuestions = 0;
    sessionDrawnIds = [];

    afterDarkConsentGranted = false;

    timerDuration = TIMER_DURATION;
    timerRemaining = TIMER_DURATION;
    timerRound = 1;

    questionCard.classList.remove(
        "flipped",
        "special",
        "after-dark"
    );
}

// =========================================
// GUIDED JOURNEY
// =========================================

function startGuidedJourney() {
    resetGameState();

    gameMode = "guided";
    selectedLevel = "1";
    guidedLevel = 1;

    beginHistorySession();

    for (let level = 1; level <= 4; level++) {
        levelDecks[level] =
            makeNormalDeck(level);
    }

    gameActive = true;

    clearSavedGame();

    showScreen(gameSection);
    drawCard();
}

function shouldShowGuidedMilestone() {
    return (
        gameMode === "guided" &&
        !stayingLonger &&
        guidedLevel < 4 &&
        guidedCount >= GUIDED_TARGET
    );
}

function openGuidedMilestone() {
    guidedMilestone = guidedCount;

    journeyTitle.textContent =
        "Ready to Go Deeper?";

    journeyDescription.textContent =
        "Every conversation opens another door. " +
        "Shall we see what's next?";

    nextLevelButton.textContent =
        "Next Level";

    stayLevelButton.textContent =
        "Stay a Little Longer";

    openModal(journeyOverlay);
}

function advanceGuidedLevel() {
    if (
        gameMode !== "guided" ||
        !gameActive
    ) {
        return;
    }

    if (guidedLevel === 4) {
        requestGuidedAfterDark();
        return;
    }

    if (guidedLevel >= 5) {
        return;
    }

    cardBackStack = [];
    cardForwardStack = [];
    cancelTransition();
    stopTimer();

    stayingLonger = false;

    guidedLevel++;
    selectedLevel = String(guidedLevel);

    guidedCount = 0;
    guidedMilestone = 0;

    drawCard();
}

function openJourneyEnding() {
    guidedComplete = true;
    stayingLonger = false;

    journeyTitle.textContent =
        "One More Chapter?";

    journeyDescription.textContent =
        "You've reached the end of Between Us. " +
        "There is one more chapter, but only " +
        "if you both want to explore it.";

    nextLevelButton.textContent =
        "Discover After Dark";

    stayLevelButton.textContent =
        "End the Night";

    openModal(journeyOverlay);
}

function enterGuidedAfterDark() {
    cardBackStack = [];
    cardForwardStack = [];
    guidedComplete = false;

    guidedLevel = 5;
    selectedLevel = "5";

    guidedCount = 0;
    guidedMilestone = 0;
    stayingLonger = false;

    levelDecks[5] = makeNormalDeck(5);

    drawCard();
}

function requestGuidedAfterDark() {
    requestAfterDarkConsent(
        enterGuidedAfterDark,
        () => {
            finishGame();
        }
    );
}

function finishGame() {
    cancelTransition();
    stopTimer();

    clearSavedGame();
    resetGameState();

    showScreen(homeScreen);
}

function openAfterDarkEnding() {
    journeyTitle.textContent =
        "The Night Is Yours";

    journeyDescription.textContent =
        "The cards may be finished, " +
        "but the conversation doesn't have to be.";

    nextLevelButton.textContent =
        "End the Night";

    stayLevelButton.textContent =
        "Explore Freely";

    guidedComplete = true;
    gameActive = false;

    clearSavedGame();
    openModal(journeyOverlay);
}

nextLevelButton.addEventListener("click", () => {
    closeModal(journeyOverlay);

    if (
        guidedComplete &&
        guidedLevel === 5
    ) {
        finishGame();
        return;
    }

    if (
        guidedComplete &&
        guidedLevel === 4
    ) {
        requestGuidedAfterDark();
        return;
    }

    advanceGuidedLevel();
});

stayLevelButton.addEventListener("click", () => {
    closeModal(journeyOverlay);

    if (
        guidedComplete &&
        guidedLevel === 5
    ) {
        finishGame();
        showScreen(modeSelection);
        return;
    }

    if (
        guidedComplete &&
        guidedLevel === 4
    ) {
        finishGame();
        return;
    }

    stayingLonger = true;
    updateJourneyControls();
    drawCard();
});

continueJourneyButton.addEventListener(
    "click",
    advanceGuidedLevel
);

// =========================================
// FREE EXPLORATION
// =========================================

function buildFreeSpecialDeck(level) {
    return shuffle(
        SPECIAL_CARDS.filter(card =>
            isSpecialAllowed(card, level)
        )
    );
}

function insertAutomaticSpecials(deck, level) {
    const available = remainingSpecialCards.filter(
        card => canUseSpecial(card, level)
    );

    const selected = shuffle(available).slice(0, 3);

    remainingSpecialCards =
        remainingSpecialCards.filter(
            card => !selected.some(
                chosen => chosen.id === card.id
            )
        );

    selected.forEach(card => {
        const position = Math.floor(
            Math.random() * (deck.length + 1)
        );

        deck.splice(position, 0, {
            ...card,
            type: "special"
        });
    });
}

function startFreeExploration(level) {
    resetGameState();

    gameMode = "free";
    selectedLevel = String(level);

    afterDarkConsentGranted =
        isAfterDarkLevel(level);

    beginHistorySession();

    mainDeck = makeNormalDeck(level);

    remainingSpecialCards =
        buildFreeSpecialDeck(level);

    insertAutomaticSpecials(
        mainDeck,
        level
    );

    gameActive = true;
    clearSavedGame();

    showScreen(gameSection);
    drawCard();
}


function changeFreeLevel(level) {
    if (gameMode !== "free" || !gameActive) {
        return;
    }

    cancelTransition();
    stopTimer();

    cardBackStack = [];
    cardForwardStack = [];
    updateCardHistoryButtons();

    // Save the current deck, including special cards
    // that have already been queued but not played.
    levelDecks[selectedLevel] = mainDeck;

    selectedLevel = String(level);

    if (!isAfterDarkLevel(level)) {
        afterDarkConsentGranted = false;
    }

    // Create a normal deck only when entering
    // this level for the first time.
    if (!levelDecks[selectedLevel]) {
        levelDecks[selectedLevel] =
            makeNormalDeck(level);
    }

    // Restore the selected level's deck,
    // excluding questions already played
    // and special cards that reached their limit.
    mainDeck = levelDecks[selectedLevel].filter(card => {
        if (card.type === "special") {
            return canUseSpecial(card, level);
        }

        return !sessionDrawnIds.includes(
            String(card.id)
        );
    });

    // Collect special cards queued in ANY level,
    // not only the currently selected one.
    const queuedIds = new Set(
        Object.values(levelDecks)
            .flat()
            .filter(card => card.type === "special")
            .map(card => card.id)
    );

    // Preserve the existing special card pool.
    const poolIds = new Set(
        remainingSpecialCards.map(card => card.id)
    );

    // Add only eligible cards that are neither
    // queued elsewhere nor already in the pool.
    SPECIAL_CARDS.forEach(card => {
        if (
            canUseSpecial(card, level) &&
            !queuedIds.has(card.id) &&
            !poolIds.has(card.id)
        ) {
            remainingSpecialCards.push(card);
            poolIds.add(card.id);
        }
    });

    // Remove exhausted cards and duplicates
    // without discarding cards reserved
    // for other levels, including After Dark.
    remainingSpecialCards = shuffle(
        remainingSpecialCards.filter(card =>
            getSpecialUsage(card) < getSpecialLimit(card) &&
            !queuedIds.has(card.id)
        )
    );

    showScreen(gameSection);
    drawCard();
}

// =========================================
// DRAW CARD
// =========================================

function drawCard() {
    if (
        transitionPending ||
        !gameActive
    ) {
        return;
    }

    pendingCardSnapshot = captureCardSnapshot();
    transitionTo(() => {

        // =================================
        // GUIDED JOURNEY
        // =================================

        if (gameMode === "guided") {

            if (
                guidedLevel === 4 &&
                guidedCount >= GUIDED_TARGET &&
                !stayingLonger
            ) {
                openJourneyEnding();
                return;
            }

            if (
                guidedLevel === 5 &&
                guidedCount >= GUIDED_TARGET &&
                !stayingLonger
            ) {
                openAfterDarkEnding();
                return;
            }

            if (shouldShowGuidedMilestone()) {
                openGuidedMilestone();
                return;
            }

            const deck =
                levelDecks[guidedLevel] || [];

            if (!deck.length) {
                if (guidedLevel < 4) {
                    openGuidedMilestone();
                } else if (guidedLevel === 4) {
                    openJourneyEnding();
                } else {
                    openAfterDarkEnding();
                }

                return;
            }

            const quota =
                GUIDED_SPECIAL_QUOTAS[
                    guidedLevel - 1
                ] || 0;

            const shown =
                guidedSpecialsByLevel[
                    guidedLevel
                ] || 0;

            const thresholds =
                quota === 2
                    ? [2, 5]
                    : [2, 4, 6];

            const dueSpecial =
                shown < quota &&
                normalSinceSpecial >= 2 &&
                guidedCount >=
                    thresholds[shown];

            if (dueSpecial) {
                const special =
                    chooseWeightedSpecial(
                        guidedLevel
                    );

                if (special) {
                    registerSpecial(special);

                    guidedSpecialsByLevel[
                        guidedLevel
                    ] = shown + 1;

                    showCard({
                        ...special,
                        type: "special"
                    });

                    return;
                }
            }

            const normal = deck.pop();

            guidedCount++;
            normalSinceSpecial++;

            showCard(normal);
            return;
        }

        // =================================
        // FREE EXPLORATION
        // =================================

        mainDeck = mainDeck.filter(card => {
            if (card.type === "special") {
                return canUseSpecial(
                    card,
                    selectedLevel
                );
            }

            return !sessionDrawnIds.includes(
                String(card.id)
            );
        });

        if (!mainDeck.length) {
            currentCard = null;
            gameActive = false;

            questionCard.classList.remove(
                "special",
                "after-dark"
            );

            scenarioArea.classList.add("hidden");
            timerArea.classList.add("hidden");

            questionText.textContent =
                "You've reached the end of this deck.";

            cardCategory.textContent =
                "ALL CARDS PLAYED";

            currentLevel.textContent =
                "BETWEEN US";

            nextCardButton.disabled = true;
            specialCardButton.disabled = true;

            clearSavedGame();
            return;
        }

        const card = mainDeck.pop();

        if (card.type === "special") {
            registerSpecial(card);
        } else {
            normalSinceSpecial++;
        }

        showCard(card);
    });
}

// =========================================
// MANUAL SPECIAL CARDS
// =========================================

function drawSpecialCard() {
    if (
        !gameActive ||
        transitionPending ||
        gameMode !== "free"
    ) {
        return;
    }

    const eligible =
        remainingSpecialCards.filter(card =>
            canUseSpecial(card, selectedLevel)
        );

    if (!eligible.length) return;

    pendingCardSnapshot = captureCardSnapshot();
    transitionTo(() => {
        const special =
            eligible[Math.floor(
                Math.random() * eligible.length
            )];

        remainingSpecialCards =
            remainingSpecialCards.filter(
                card => card.id !== special.id
            );

        registerSpecial(special);

        showCard({
            ...special,
            type: "special"
        });
    });
}

// =========================================
// NEXT CARD / PERFECT MATCH
// =========================================

function handleNextCard() {
    if (!gameActive || transitionPending) return;
    if (cardForwardStack.length) {
        showForwardCard();
        return;
    }

    if (
        currentCard &&
        currentCard.scenarioType === "perfectMatch" &&
        perfectMatchRound < PERFECT_MATCH_ROUNDS
    ) {
        perfectMatchRound++;

        drawScenario("perfectMatch");

        nextCardButton.textContent =
            perfectMatchRound === PERFECT_MATCH_ROUNDS
                ? "Complete Challenge"
                : "Next Round (" +
                  perfectMatchRound +
                  "/3)";

        saveGame();
        return;
    }

    drawCard();
}

nextCardButton.addEventListener(
    "click",
    handleNextCard
);

specialCardButton.addEventListener(
    "click",
    drawSpecialCard
);

// =========================================
// FLIP CARD
// =========================================

function flipCard() {
    if (
        !gameActive ||
        !currentCard ||
        transitionPending ||
        !journeyOverlay.classList.contains("hidden") ||
        !confirmOverlay.classList.contains("hidden") ||
        !resetHistoryOverlay.classList.contains("hidden") ||
        !resetAllOverlay.classList.contains("hidden") ||
        !afterDarkOverlay.classList.contains("hidden")
    ) {
        return;
    }

    questionCard.classList.toggle("flipped");

    cardFaceUp =
        questionCard.classList.contains("flipped");

    saveGame();
}

questionCard.addEventListener(
    "click",
    flipCard
);

questionCard.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            flipCard();
        }
    }
);

// =========================================
// RESTORE GAME
// =========================================

function restoreGame() {
    const save = loadSavedGame();

    if (!save) {
        openWelcomeOrHome();
        return;
    }

    cancelTransition();
    stopTimer();

    gameMode = save.gameMode || "free";
    selectedLevel = save.selectedLevel || "1";

    guidedLevel = save.guidedLevel || 1;
    guidedCount = save.guidedCount || 0;
    guidedMilestone = save.guidedMilestone || 0;
    guidedComplete = !!save.guidedComplete;

    guidedSpecialsByLevel =
        save.guidedSpecialsByLevel || {};

    stayingLonger = !!save.stayingLonger;

    cardBackStack = Array.isArray(save.cardBackStack) ? save.cardBackStack : [];
    cardForwardStack = Array.isArray(save.cardForwardStack) ? save.cardForwardStack : [];
    pendingCardSnapshot = null;

    mainDeck = save.mainDeck || [];
    levelDecks = save.levelDecks || {};

    remainingSpecialCards =
        save.remainingSpecialCards || [];

    remainingPlotScenarios =
        save.remainingPlotScenarios || [];

    remainingMatchScenarios =
        save.remainingMatchScenarios || [];

    normalSinceSpecial =
        save.normalSinceSpecial ?? 2;

    specialCount = save.specialCount || 0;
    specialUsage = save.specialUsage || {};
    specialSeen = save.specialSeen || [];

    sessionQuestions =
        Number(save.sessionQuestions) || 0;

    sessionDrawnIds =
        Array.isArray(save.sessionDrawnIds)
            ? save.sessionDrawnIds.map(String)
            : [];

    afterDarkConsentGranted =
        !!save.afterDarkConsentGranted;

    gameActive = true;

    showCard(save.currentCard, {
        restore: true
    });

    perfectMatchRound =
        Number(save.perfectMatchRound) || 0;

    if (
        save.currentCard.scenarioType ===
        "perfectMatch"
    ) {
        nextCardButton.textContent =
            perfectMatchRound >= PERFECT_MATCH_ROUNDS
                ? "Complete Challenge"
                : "Next Round (" +
                  perfectMatchRound +
                  "/3)";
    }

    scenarioText.textContent =
        save.scenario || "";

    anotherScenarioButton.disabled =
        !!save.anotherScenarioDisabled;

    timerDuration =
        Number(save.timerDuration) ||
        timerDuration;

    timerRound =
        Number(save.timerRound) || 1;

    // Running timers do not continue while
    // the browser is closed.
    // They restart safely when requested.
    timerRemaining = timerDuration;

    resetTimer();

    cardFaceUp = !!save.cardFaceUp;

    questionCard.classList.toggle(
        "flipped",
        cardFaceUp
    );

    updateJourneyControls();

    showScreen(gameSection);
    updateCardHistoryButtons();

    saveGame();
}

// =========================================
// WELCOME BACK
// =========================================

function updateWelcomeScreen() {
    const save = loadSavedGame();

    if (!save) return;

    const mode = save.gameMode || "free";
    const questions =
        Number(save.sessionQuestions) || 0;
    const specials =
        Number(save.specialCount) || 0;

    welcomeMode.textContent =
        mode === "guided"
            ? "Guided Journey"
            : "Free Exploration";

    welcomeQuestions.textContent =
        questions +
        (
            questions === 1
                ? " question drawn"
                : " questions drawn"
        );

    welcomeSpecials.textContent =
        specials +
        (
            specials === 1
                ? " special card"
                : " special cards"
        );

    if (mode === "guided") {
        const level = Math.min(
            5,
            Math.max(
                1,
                Number(save.guidedLevel) || 1
            )
        );

        welcomeLevel.textContent =
            level === 5
                ? "Level 5 · After Dark"
                : "Level " + level + " of 4";

        const completedLevels =
            (Math.min(level, 4) - 1) *
            GUIDED_TARGET;

        const currentProgress =
            level === 5
                ? GUIDED_TARGET
                : Math.min(
                    GUIDED_TARGET,
                    Number(save.guidedCount) || 0
                );

        const progress =
            (completedLevels + currentProgress) /
            (GUIDED_TARGET * 4);

        welcomeProgressTrack.classList.remove(
            "hidden"
        );

        const percentage = Math.min(
            100,
            progress * 100
        );

        welcomeProgressFill.style.width =
            percentage + "%";

        welcomeProgressTrack.setAttribute(
            "aria-valuenow",
            String(Math.round(percentage))
        );

    } else {
        welcomeLevel.textContent =
            save.selectedLevel === "all"
                ? "Surprise Me"
                : save.selectedLevel === "5"
                    ? "Level 5 · After Dark"
                    : "Level " + save.selectedLevel;

        welcomeProgressTrack.classList.add(
            "hidden"
        );
    }

    welcomeResumeButton.textContent =
        mode === "guided"
            ? "Resume Our Journey →"
            : "Resume Our Game →";
}

function openWelcomeOrHome() {
    if (loadSavedGame()) {
        updateWelcomeScreen();
        showScreen(welcomeScreen);
    } else {
        showScreen(homeScreen);
    }
}

// =========================================
// YOUR GAME
// =========================================

function openYourGame(returnScreen) {
    manageReturnScreen =
        returnScreen || homeScreen;

    manageResumeButton.disabled =
        !loadSavedGame();

    showScreen(yourGameScreen);
}

function openNewGameSelection() {
    levelSelectionPurpose = "new";
    showScreen(modeSelection);
}

welcomeResumeButton.addEventListener(
    "click",
    restoreGame
);

welcomeNewButton.addEventListener(
    "click",
    openNewGameSelection
);

welcomeManageButton.addEventListener(
    "click",
    () => openYourGame(welcomeScreen)
);

yourGameButton.addEventListener(
    "click",
    () => openYourGame(homeScreen)
);

manageResumeButton.addEventListener(
    "click",
    restoreGame
);

manageNewButton.addEventListener(
    "click",
    openNewGameSelection
);

manageBackButton.addEventListener(
    "click",
    () => {
        if (
            manageReturnScreen === welcomeScreen &&
            loadSavedGame()
        ) {
            updateWelcomeScreen();
            showScreen(welcomeScreen);
        } else {
            showScreen(homeScreen);
        }
    }
);

// =========================================
// RESET CARD HISTORY
// =========================================

manageResetButton.addEventListener(
    "click",
    () => openModal(resetHistoryOverlay)
);

confirmResetHistoryButton.addEventListener(
    "click",
    () => {
        try {
            localStorage.removeItem(HISTORY_KEY);
        } catch (error) {
            console.error(error);
        }

        closeModal(resetHistoryOverlay);
    }
);

cancelResetHistoryButton.addEventListener(
    "click",
    () => closeModal(resetHistoryOverlay)
);

resetHistoryOverlay.addEventListener(
    "click",
    event => {
        if (event.target === resetHistoryOverlay) {
            closeModal(resetHistoryOverlay);
        }
    }
);

// =========================================
// RESET EVERYTHING
// =========================================

manageResetAllButton.addEventListener(
    "click",
    () => openModal(resetAllOverlay)
);

confirmResetAllButton.addEventListener(
    "click",
    () => {
        try {
            localStorage.removeItem(SAVE_KEY);
            localStorage.removeItem(HISTORY_KEY);
        } catch (error) {
            console.error(error);
        }

        resetGameState();

        closeModal(resetAllOverlay);
        showScreen(homeScreen);
    }
);

cancelResetAllButton.addEventListener(
    "click",
    () => closeModal(resetAllOverlay)
);

resetAllOverlay.addEventListener(
    "click",
    event => {
        if (event.target === resetAllOverlay) {
            closeModal(resetAllOverlay);
        }
    }
);

// =========================================
// AFTER DARK · FREE EXPLORATION
// =========================================

function requestFreeAfterDark() {
    requestAfterDarkConsent(
        () => {
            requestNewGame(() => {
                startFreeExploration("5");
            });
        },
        () => {
            openWelcomeOrHome();
        }
    );
}

function requestChangeToAfterDark() {
    requestAfterDarkConsent(
        () => {
            changeFreeLevel("5");
        },
        () => {
            // Preserve the current session.
            afterDarkConsentGranted = false;
            showScreen(levelSelection);
        }
    );
}

// =========================================
// NAVIGATION
// =========================================

startButton.addEventListener("click", () => {
    levelSelectionPurpose = "new";
    showScreen(modeSelection);
});

rulesButton.addEventListener("click", () => {
    showScreen(rulesSection);
});

rulesBackButton.addEventListener(
    "click",
    openWelcomeOrHome
);

modeBackButton.addEventListener(
    "click",
    openWelcomeOrHome
);

backButton.addEventListener("click", () => {
    if (
        levelSelectionPurpose === "change" &&
        gameMode === "free" &&
        gameActive
    ) {
        showScreen(gameSection);
    } else {
        showScreen(modeSelection);
    }
});

guidedModeButton.addEventListener(
    "click",
    () => requestNewGame(
        startGuidedJourney
    )
);

freeModeButton.addEventListener("click", () => {
    levelSelectionPurpose = "new";
    showScreen(levelSelection);
});

function handleLevelSelection(level) {
    const changingLevel =
        levelSelectionPurpose === "change" &&
        gameMode === "free" &&
        gameActive;

    if (isAfterDarkLevel(level)) {
        if (changingLevel) {
            requestChangeToAfterDark();
        } else {
            requestFreeAfterDark();
        }

        return;
    }

    if (changingLevel) {
        changeFreeLevel(level);
    } else {
        requestNewGame(() => {
            startFreeExploration(level);
        });
    }
}

document.querySelectorAll(".level-button").forEach(
    button => {
        button.addEventListener("click", () => {
            handleLevelSelection(
                button.dataset.level
            );
        });
    }
);

changeLevelButton.addEventListener(
    "click",
    () => {
        if (gameMode !== "free") return;

        stopTimer();
        saveGame();

        levelSelectionPurpose = "change";
        showScreen(levelSelection);
    }
);

gameBackButton.addEventListener(
    "click",
    () => {
        cancelTransition();
        stopTimer();

        if (gameActive && currentCard) {
            saveGame();
        }

        openWelcomeOrHome();
    }
);

// =========================================
// SAVE ON PAGE EXIT
// =========================================

window.addEventListener("pagehide", () => {
    if (
        gameActive &&
        currentCard &&
        !transitionPending
    ) {
        saveGame();
    }
});

// =========================================
// INITIALIZATION
// =========================================

resetTimer();
openWelcomeOrHome();
