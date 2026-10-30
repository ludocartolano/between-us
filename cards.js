
/* =========================================
   BETWEEN US
   COMPLETE QUESTION DECK

   90 questions
   5 levels
   18 questions per level
========================================= */

const CARDS = [

    // =====================================
    // LEVEL 1 · THE SPARK
    // Cards 1–18
    // =====================================

    {
        id: 1,
        level: 1,
        category: "The Spark",
        question: "What's a ridiculously small thing that can instantly improve your day?"
    },
    {
        id: 2,
        level: 1,
        category: "The Spark",
        question: "What's something you loved as a child that you still secretly love?"
    },
    {
        id: 3,
        level: 1,
        category: "The Spark",
        question: "What's the most absurd thing you've ever taken surprisingly seriously?"
    },
    {
        id: 4,
        level: 1,
        category: "The Spark",
        question: "What's a tiny, irrational pet peeve you have?"
    },
    {
        id: 5,
        level: 1,
        category: "The Spark",
        question: "What's a hobby or interest you could talk about for hours without getting bored?"
    },
    {
        id: 6,
        level: 1,
        category: "The Spark",
        question: "What's an opinion you have that most of your friends strongly disagree with?"
    },
    {
        id: 7,
        level: 1,
        category: "The Spark",
        question: "What's the most spontaneous decision you've ever made?"
    },
    {
        id: 8,
        level: 1,
        category: "The Spark",
        question: "What's a completely unnecessary rule you always follow?"
    },
    {
        id: 9,
        level: 1,
        category: "The Spark",
        question: "What's a place that feels strangely comforting to you?"
    },
    {
        id: 10,
        level: 1,
        category: "The Spark",
        question: "What's a skill you wish you had, even if it's completely useless?"
    },
    {
        id: 11,
        level: 1,
        category: "The Spark",
        question: "What's the most unexpected compliment you've ever received?"
    },
    {
        id: 12,
        level: 1,
        category: "The Spark",
        question: "What's a guilty pleasure you secretly enjoy but would never proudly admit to?"
    },
    {
        id: 13,
        level: 1,
        category: "The Spark",
        question: "What ordinary activity makes you lose track of time?"
    },
    {
        id: 14,
        level: 1,
        category: "The Spark",
        question: "What's a memory that still makes you laugh when you think about it?"
    },
    {
        id: 15,
        level: 1,
        category: "The Spark",
        question: "What's a harmless thing you're embarrassingly competitive about?"
    },
    {
        id: 16,
        level: 1,
        category: "The Spark",
        question: "What's a first impression people often get wrong about you?"
    },
    {
        id: 17,
        level: 1,
        category: "The Spark",
        question: "If you could relive one completely ordinary day just for the atmosphere, which would it be?"
    },
    {
        id: 18,
        level: 1,
        category: "The Spark",
        question: "What's the weirdest rabbit hole you've ever gone down out of pure curiosity?"
    },

    // =====================================
    // LEVEL 2 · BENEATH THE SURFACE
    // Cards 19–36
    // =====================================

    {
        id: 19,
        level: 2,
        category: "Beneath the Surface",
        question: "What did your family teach you about love without ever saying it directly?"
    },
    {
        id: 20,
        level: 2,
        category: "Beneath the Surface",
        question: "What responsibility did you take on earlier than you expected?"
    },
    {
        id: 21,
        level: 2,
        category: "Beneath the Surface",
        question: "What's a value you would find difficult to compromise on?"
    },
    {
        id: 22,
        level: 2,
        category: "Beneath the Surface",
        question: "What does having enough money allow you to say no to?"
    },
    {
        id: 23,
        level: 2,
        category: "Beneath the Surface",
        question: "What kind of life would make you feel successful, even if nobody else noticed?"
    },
    {
        id: 24,
        level: 2,
        category: "Beneath the Surface",
        question: "What's a difficult decision you made that you're now grateful for?"
    },
    {
        id: 25,
        level: 2,
        category: "Beneath the Surface",
        question: "How do you usually react when someone disappoints you?"
    },
    {
        id: 26,
        level: 2,
        category: "Beneath the Surface",
        question: "What's something you're proud of that doesn't appear on your CV?"
    },
    {
        id: 27,
        level: 2,
        category: "Beneath the Surface",
        question: "What's a purchase that taught you something about your priorities?"
    },
    {
        id: 28,
        level: 2,
        category: "Beneath the Surface",
        question: "What makes a friendship worth maintaining over many years?"
    },
    {
        id: 29,
        level: 2,
        category: "Beneath the Surface",
        question: "What uncertainty have you learned to live with rather than solve?"
    },
    {
        id: 30,
        level: 2,
        category: "Beneath the Surface",
        question: "When do you feel most independent, and when do you actually enjoy relying on others?"
    },
    {
        id: 31,
        level: 2,
        category: "Beneath the Surface",
        question: "What would you like to be remembered for by the people closest to you?"
    },
    {
        id: 32,
        level: 2,
        category: "Beneath the Surface",
        question: "What's a tradition from your upbringing you want to keep, and why?"
    },
    {
        id: 33,
        level: 2,
        category: "Beneath the Surface",
        question: "What part of your work genuinely motivates you, beyond earning money?"
    },
    {
        id: 34,
        level: 2,
        category: "Beneath the Surface",
        question: "What kind of behaviour makes you lose respect for someone?"
    },
    {
        id: 35,
        level: 2,
        category: "Beneath the Surface",
        question: "What experience would you regret never making room for?"
    },
    {
        id: 36,
        level: 2,
        category: "Beneath the Surface",
        question: "In what way have you become more like someone you once admired?"
    },

    // =====================================
    // LEVEL 3 · THE CHEMISTRY
    // Cards 37–54
    // =====================================

    {
        id: 37,
        level: 3,
        category: "The Chemistry",
        question: "What's a kind of intimacy that has nothing to do with sex?"
    },
    {
        id: 38,
        level: 3,
        category: "The Chemistry",
        question: "What's something someone can do without touching you that creates instant sexual tension?"
    },
    {
        id: 39,
        level: 3,
        category: "The Chemistry",
        question: "What helps you recognise whether physical affection is welcome?"
    },
    {
        id: 40,
        level: 3,
        category: "The Chemistry",
        question: "What's something you've learned about yourself from a previous relationship?"
    },
    {
        id: 41,
        level: 3,
        category: "The Chemistry",
        question: "What kind of playful teasing feels flirtatious rather than annoying to you?"
    },
    {
        id: 42,
        level: 3,
        category: "The Chemistry",
        question: "How do you usually show someone you're interested without directly saying it?"
    },
    {
        id: 43,
        level: 3,
        category: "The Chemistry",
        question: "What makes you feel genuinely chosen rather than simply liked?"
    },
    {
        id: 44,
        level: 3,
        category: "The Chemistry",
        question: "What's something about desire that you've become more comfortable acknowledging?"
    },
    {
        id: 45,
        level: 3,
        category: "The Chemistry",
        question: "How do you prefer someone to communicate when something feels uncomfortable?"
    },
    {
        id: 46,
        level: 3,
        category: "The Chemistry",
        question: "What's the difference between attraction and emotional connection for you?"
    },
    {
        id: 47,
        level: 3,
        category: "The Chemistry",
        question: "What's a romantic cliché that actually works on you?"
    },
    {
        id: 48,
        level: 3,
        category: "The Chemistry",
        question: "What's the first sign that a crush is turning into something more serious for you?"
    },
    {
        id: 49,
        level: 3,
        category: "The Chemistry",
        question: "What's something that makes you feel emotionally safe with another person?"
    },
    {
        id: 50,
        level: 3,
        category: "The Chemistry",
        question: "What's a limit you didn't know you needed until you experienced it?"
    },
    {
        id: 51,
        level: 3,
        category: "The Chemistry",
        question: "When does silence with someone feel intimate rather than awkward?"
    },
    {
        id: 52,
        level: 3,
        category: "The Chemistry",
        question: "What makes a kiss memorable to you?"
    },
    {
        id: 53,
        level: 3,
        category: "The Chemistry",
        question: "When you need reassurance in dating, what does it sound or look like?"
    },
    {
        id: 54,
        level: 3,
        category: "The Chemistry",
        question: "How do you think physical attraction changes as two people get to know each other?"
    },

    // =====================================
    // LEVEL 4 · BETWEEN US
    // Cards 55–72
    // =====================================

    {
        id: 55,
        level: 4,
        category: "Between Us",
        question: "What's something you've felt comfortable telling me that you don't usually share with people?"
    },
    {
        id: 56,
        level: 4,
        category: "Between Us",
        question: "What was your first impression of me, and what has changed since then?"
    },
    {
        id: 57,
        level: 4,
        category: "Between Us",
        question: "What's a story from my life you'd like to hear the full version of?"
    },
    {
        id: 58,
        level: 4,
        category: "Between Us",
        question: "What's something you think we have in common that isn't immediately obvious?"
    },
    {
        id: 59,
        level: 4,
        category: "Between Us",
        question: "What's a difference between us that you find interesting?"
    },
    {
        id: 60,
        level: 4,
        category: "Between Us",
        question: "What's a habit or expression of mine that you've started to recognise?"
    },
    {
        id: 61,
        level: 4,
        category: "Between Us",
        question: "What do you think we could teach each other?"
    },
    {
        id: 62,
        level: 4,
        category: "Between Us",
        question: "When have you felt most comfortable around me so far?"
    },
    {
        id: 63,
        level: 4,
        category: "Between Us",
        question: "What's a moment between us that felt different from the others, and why?"
    },
    {
        id: 64,
        level: 4,
        category: "Between Us",
        question: "What's something you think I might misunderstand about you?"
    },
    {
        id: 65,
        level: 4,
        category: "Between Us",
        question: "What would be the most entertaining challenge for us to tackle as a team?"
    },
    {
        id: 66,
        level: 4,
        category: "Between Us",
        question: "Has talking with me ever made you reconsider an opinion? Which one?"
    },
    {
        id: 67,
        level: 4,
        category: "Between Us",
        question: "What's something about the way we communicate that you appreciate?"
    },
    {
        id: 68,
        level: 4,
        category: "Between Us",
        question: "Is there a moment when you've felt a spark between us that you haven't mentioned before?"
    },
    {
        id: 69,
        level: 4,
        category: "Between Us",
        question: "What's a small tradition you could imagine us inventing?"
    },
    {
        id: 70,
        level: 4,
        category: "Between Us",
        question: "What's a side of yourself you haven't had much chance to show me?"
    },
    {
        id: 71,
        level: 4,
        category: "Between Us",
        question: "What's a subject on which you suspect we'd have a fascinating disagreement?"
    },
    {
        id: 72,
        level: 4,
        category: "Between Us",
        question: "What's one thing about our dynamic you hope never changes?"
    },

    // =====================================
    // LEVEL 5 · AFTER DARK
    // Cards 73–90
    // =====================================

    {
        id: 73,
        level: 5,
        category: "After Dark",
        question: "What's a sexual fantasy you've kept to yourself because you're unsure how someone would react?"
    },
    {
        id: 74,
        level: 5,
        category: "After Dark",
        question: "Is there a kink you're curious about but haven't fully explored?"
    },
    {
        id: 75,
        level: 5,
        category: "After Dark",
        question: "What is it about giving up control, or having it, that you find appealing?"
    },
    {
        id: 76,
        level: 5,
        category: "After Dark",
        question: "What's something you've wanted to ask for in bed but held back from saying?"
    },
    {
        id: 77,
        level: 5,
        category: "After Dark",
        question: "Have you ever discovered an unexpected turn-on that completely surprised you?"
    },
    {
        id: 78,
        level: 5,
        category: "After Dark",
        question: "What's the difference between feeling sexually desired and feeling sexually understood?"
    },
    {
        id: 79,
        level: 5,
        category: "After Dark",
        question: "Is there a sexual taboo that fascinates you, even if you'd never want to act on it?"
    },
    {
        id: 80,
        level: 5,
        category: "After Dark",
        question: "What's a role or persona you'd be curious to explore in a consensual role-play?"
    },
    {
        id: 81,
        level: 5,
        category: "After Dark",
        question: "Have you ever felt ashamed of something you wanted sexually? Where do you think that shame came from?"
    },
    {
        id: 82,
        level: 5,
        category: "After Dark",
        question: "What's something about your sexuality that has changed as you've become more experienced?"
    },
    {
        id: 83,
        level: 5,
        category: "After Dark",
        question: "What makes a sexual experience feel adventurous rather than simply unfamiliar?"
    },
    {
        id: 84,
        level: 5,
        category: "After Dark",
        question: "What makes you feel most vulnerable during sex, and is that vulnerability exciting, frightening, or both?"
    },
    {
        id: 85,
        level: 5,
        category: "After Dark",
        question: "What's a sexual experience that challenged an assumption you had about yourself?"
    },
    {
        id: 86,
        level: 5,
        category: "After Dark",
        question: "What would you need to feel safe enough to explore something completely outside your comfort zone?"
    },
    {
        id: 87,
        level: 5,
        category: "After Dark",
        question: "What's something you've imagined doing with me sexually but haven't told me about yet?"
    },
    {
        id: 88,
        level: 5,
        category: "After Dark",
        question: "What's a sexual boundary you feel strongly about, even if other people might not understand it?"
    },
    {
        id: 89,
        level: 5,
        category: "After Dark",
        question: "What kind of aftercare makes you feel most connected after an intense sexual experience?"
    },
    {
        id: 90,
        level: 5,
        category: "After Dark",
        question: "If you could tell me one thing about your sexual imagination without fear of judgment, what would it be?"
    }
];
