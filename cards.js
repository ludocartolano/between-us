
const CARDS = [
    // LEVEL 1: THE SPARK
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
        question: "What kind of person brings out your most ridiculous side?"
    },
    {
        id: 4,
        level: 1,
        category: "The Spark",
        question: "What's a strangely specific quality you find attractive in someone?"
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
        question: "What would your closest friends say is your most predictable habit?"
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
        question: "What's something you've changed your mind about in the last few years?"
    },
    {
        id: 13,
        level: 1,
        category: "The Spark",
        question: "What kind of situation makes you feel completely like yourself?"
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
        question: "What's a harmless red flag you probably have?"
    },
    {
        id: 16,
        level: 1,
        category: "The Spark",
        question: "What's something people often misunderstand about your personality?"
    },
    {
        id: 17,
        level: 1,
        category: "The Spark",
        question: "If someone followed you around for a day, what would surprise them most?"
    },
    {
        id: 18,
        level: 1,
        category: "The Spark",
        question: "What's a question you wish people asked you more often?"
    },

    // LEVEL 2: BENEATH THE SURFACE
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
        question: "What part of your childhood do you think shaped you the most?"
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
        question: "What does financial independence mean to you personally?"
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
        question: "What's something you've had to unlearn as an adult?"
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
        question: "How has your relationship with money changed as you've grown older?"
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
        question: "What's a fear you've become better at managing?"
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
        question: "What's a belief you inherited from your upbringing that you've questioned?"
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
        question: "What's something you want to experience in life but haven't made time for yet?"
    },
    {
        id: 36,
        level: 2,
        category: "Beneath the Surface",
        question: "What do you think your younger self would find most surprising about your life today?"
    },

    // LEVEL 3: THE CHEMISTRY
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
        question: "What's something subtle that makes someone instantly more attractive to you?"
    },
    {
        id: 39,
        level: 3,
        category: "The Chemistry",
        question: "When do you feel most comfortable being physically affectionate?"
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
        question: "What makes flirting genuinely fun for you?"
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
        question: "What's a small gesture that can make you feel deeply appreciated?"
    },
    {
        id: 44,
        level: 3,
        category: "The Chemistry",
        question: "What's something that helps you feel comfortable expressing your desires?"
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
        question: "What's something romantic you enjoy but would rarely admit out loud?"
    },
    {
        id: 48,
        level: 3,
        category: "The Chemistry",
        question: "How do you usually behave when you're beginning to develop feelings for someone?"
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
        question: "What's a boundary you've become better at communicating?"
    },
    {
        id: 51,
        level: 3,
        category: "The Chemistry",
        question: "What's a form of affection you think is underrated?"
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
        question: "What's something you'd like a person you're dating to understand about how you communicate?"
    },
    {
        id: 54,
        level: 3,
        category: "The Chemistry",
        question: "What's one thing that can make physical chemistry even better over time?"
    },

    // LEVEL 4: BETWEEN US
    {
        id: 55,
        level: 4,
        category: "Between Us",
        question: "What's something about me that surprised you after getting to know me?"
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
        question: "What's a question you've wanted to ask me but haven't found the right moment for?"
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
        question: "What's a small detail about me you've noticed that I might not realise?"
    },
    {
        id: 61,
        level: 4,
        category: "Between Us",
        question: "What's something you'd enjoy discovering about me over time?"
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
        question: "What's a moment we've shared that you remember particularly clearly?"
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
        question: "What kind of activity do you think would bring out a completely different side of us?"
    },
    {
        id: 66,
        level: 4,
        category: "Between Us",
        question: "What's something you've learned about yourself through our conversations?"
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
        question: "What's a situation in which you'd be curious to see how we interact?"
    },
    {
        id: 69,
        level: 4,
        category: "Between Us",
        question: "What's something you'd like us to try together just for fun?"
    },
    {
        id: 70,
        level: 4,
        category: "Between Us",
        question: "What's a side of your personality you don't think I've seen yet?"
    },
    {
        id: 71,
        level: 4,
        category: "Between Us",
        question: "What's something you'd like to understand better about the way I see the world?"
    },
    {
        id: 72,
        level: 4,
        category: "Between Us",
        question: "If we played this game again in six months, what do you think we'd laugh about?"
    }
];
