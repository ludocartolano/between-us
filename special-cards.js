
const SPECIAL_CARDS = [
    {
        id: "S1",
        title: "The Unspoken Invitation",
        instruction: "Without speaking, show the other person where you'd like a kiss. They can accept, suggest somewhere else, or pass."
    },
    {
        id: "S2",
        title: "The Secret Message",
        instruction: "Write a message on your phone that would make the other person blush. Show it only to them."
    },
    {
        id: "S3",
        title: "The Staring Contest",
        instruction: "Look into each other's eyes for 20 seconds. No talking, no laughing, no looking away. Can you both make it to the end?"
    },
    {
        id: "S4",
        title: "The Plot Twist",
        instruction: "Together, invent an alternative version of the scenario below, adding one sentence each.",
        scenarioType: "plotTwist"
    },
    {
        id: "S5",
        title: "Wildcard · Your Turn",
        instruction: "Ask the other person any question you want, from silly to daring. They can always pass."
    },
    {
        id: "S6",
        title: "Wildcard · Curious Minds",
        instruction: "Ask something you've been curious about but haven't found the right moment to ask. Passing is always allowed."
    },
    {
        id: "S7",
        title: "Read My Mind",
        instruction: "One person secretly chooses something they'd like right now: a gesture, an activity, or a little affection. The other gets three yes-or-no questions to guess it. Then switch roles."
    },
    {
        id: "S8",
        title: "The Perfect Match",
        instruction: "Who's more likely to...? Read the scenario below. On the count of three, both point to the person you think fits best.",
        scenarioType: "perfectMatch"
    }
];


// SCENARIOS FOR THE PLOT TWIST

const PLOT_TWIST_SCENARIOS = [
    "How we first met",
    "How we first kissed",
    "Our first date in a parallel universe",
    "How we accidentally became famous",
    "How we ended up at the wrong wedding",
    "How we met 200 years ago",
    "How we became partners in a ridiculous crime",
    "How we ended up stranded on a deserted island",
    "How we accidentally swapped identities",
    "How we became contestants on a reality TV show",
    "How we met in a romantic comedy",
    "How we accidentally started a revolution",
    "How we became secret agents",
    "How we ended up sharing a tiny apartment in Paris",
    "How we first met if we'd been childhood rivals"
];


// SCENARIOS FOR THE PERFECT MATCH

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
    "Be the first to apologise after a disagreement?",
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
    "Surprise the other person with an unexpected romantic gesture?",
    "Laugh so hard they can't finish a sentence?",
    "Make friends with strangers while travelling?",
    "Initiate a kiss in an unexpected moment?",
    "Overthink the meaning of a text message?",
    "Suggest breaking a harmless rule just for fun?"
];
