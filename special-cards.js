
/* =========================================
   BETWEEN US
   SPECIAL CARDS

   S1–S8: General Special Cards
   S9–S10: After Dark exclusive
========================================= */

const SPECIAL_CARDS = [

    {
        id: "S1",
        type: "special",
        title: "The Unspoken Invitation",
        instruction: "Without speaking, show the other person where you'd like a kiss. They can accept, suggest somewhere else, or pass.",
        afterDarkOnly: false
    },

    {
        id: "S2",
        type: "special",
        title: "The Secret Message",
        instruction: "Write a message on your phone that would make the other person blush. Show it only to them.",
        afterDarkOnly: false
    },

    {
        id: "S3",
        type: "special",
        title: "The Staring Contest",
        instruction: "Look into each other's eyes for 30 seconds. No talking, no laughing, no looking away. Can you both make it to the end?",
        afterDarkOnly: false
    },

    {
        id: "S4",
        type: "special",
        title: "The Plot Twist",
        instruction: "Together, invent an alternative version of the scenario below, adding one sentence each.",
        scenarioType: "plotTwist",
        afterDarkOnly: false
    },

    {
        id: "S5",
        type: "special",
        title: "Wildcard · Your Turn",
        instruction: "Ask the other person any question you want, from silly to daring. They can always pass.",
        afterDarkOnly: false
    },

    {
        id: "S6",
        type: "special",
        title: "Wildcard · Curious Minds",
        instruction: "Ask something you've been curious about but haven't found the right moment to ask. Passing is always allowed.",
        afterDarkOnly: false
    },

    {
        id: "S7",
        type: "special",
        title: "Read My Mind",
        instruction: "One person secretly chooses something they'd like right now: a gesture, an activity, or a little affection. The other gets three yes-or-no questions to guess it. Then switch roles.",
        afterDarkOnly: false
    },

    {
        id: "S8",
        type: "special",
        title: "The Perfect Match",
        instruction: "Who's more likely to...? Read the scenario below. On the count of three, both point to the person you think fits best.",
        scenarioType: "perfectMatch",
        afterDarkOnly: false
    },

    // =====================================
    // AFTER DARK EXCLUSIVE
    // =====================================

    {
        id: "S9",
        type: "special",
        title: "The Dangerous Choice",
        instruction: "Take turns inventing two wildly different intimate scenarios. The other person must choose one and explain why. Make each round more unexpected than the last. You can always pass.",
        afterDarkOnly: true
    },

    {
        id: "S10",
        type: "special",
        title: "The Art of Restraint",
        instruction: "Choose who goes first. For 60 seconds, one person takes the lead in creating tension using only words, eye contact, and gestures, without touching the other. Then switch roles. Afterwards, each of you reveals which moment was the hardest to resist.",
        afterDarkOnly: true,
        timerDuration: 60
    }
];

/* =========================================
   THE PLOT TWIST
   15 SCENARIOS
========================================= */

const PLOT_TWIST_SCENARIOS = [

    "How we first met",

    "How we first kissed",

    "Our first date in a parallel universe",

    "How we accidentally became famous",

    "How we ended up at the wrong wedding",

    "How we met 200 years ago",

    "How we became partners in a ridiculous crime",

    "How we ended up stranded on a deserted island",

    "How we woke up in each other's bodies",

    "How we became contestants on a reality TV show",

    "How we ended up trapped inside a video game",

    "How we accidentally started a revolution",

    "How we discovered a time machine in our apartment",

    "How we ended up sharing a tiny apartment in a new city",

    "How we ended up being the last two people on Earth"
];

/* =========================================
   THE PERFECT MATCH
   30 SCENARIOS
========================================= */

const PERFECT_MATCH_SCENARIOS = [

    "Book a spontaneous trip without planning anything?",

    "Get jealous over something completely ridiculous?",

    "Start laughing at the worst possible moment?",

    "Make the first move after an argument?",

    "Suggest something adventurous on a date?",

    "Accidentally reveal a surprise?",

    "Turn an ordinary evening into an unforgettable one?",

    "Flirt without even realising it?",

    "Get lost even while using Google Maps?",

    "Cry during a film and pretend not to?",

    "Spend an hour choosing what to order and then pick the usual?",

    "Plan an elaborate romantic surprise?",

    "Fall asleep during a film they chose?",

    "Say something embarrassing in front of strangers?",

    "Get distracted by a cute animal in the street?",

    "Be the first to suggest an unexpected kiss?",

    "Remember a tiny detail from months ago?",

    "Start a philosophical discussion at 2 AM?",

    "Convince the other person to try something new?",

    "Turn a cooking disaster into a funny memory?",

    "Be caught staring at the other person?",

    "Suggest staying in bed all morning?",

    "Send a risky text and immediately regret it?",

    "Get competitive over a completely pointless game?",

    "Secretly plan an entire day around the other person's favourite things?",

    "Start singing dramatically in the middle of an ordinary conversation?",

    "Make friends with strangers while travelling?",

    "Turn an innocent conversation into a flirtatious one?",

    "Overthink the meaning of a text message?",

    "Suggest breaking a harmless rule just for fun?"
];
