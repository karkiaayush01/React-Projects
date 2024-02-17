import { legacy_createStore as createStore} from 'redux'

const CHANGE = 'CHANGE';

const defaultState = {
    quote: '',
    author: '',
    color: '',
    tweetLink: ''
}

const colorArray = [
    'red', 'green', 'navy', 'brown', 'orange', 'purple'
]

const quoteArray = [
    "Your time is limited, so don’t waste it living someone else’s life.",
    "Dreaming, after all, is a form of planning.",
    "Build your own dreams, or someone else will hire you to build theirs.",
    "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.",
    "I attribute my success to this: I never gave or took any excuse."
];

const authorArray = [
    "Steve Jobs",
    "Gloria Steinem",
    "Farrah Gray",
    "Aristotle",
    "Florence Nightingale"
];


const quoteChanger = () => {
    let randomColor, randomQuoteIndex;
    do {   
        randomColor = Math.floor(Math.random() * colorArray.length);
    } while (colorArray[randomColor] === store.getState().color);
    do {
        randomQuoteIndex = Math.floor(Math.random() * quoteArray.length);
    } while (quoteArray[randomQuoteIndex] === store.getState().quote);
    return{
        type: CHANGE,
        colorIndex: randomColor,
        quoteIndex: randomQuoteIndex
    }
};

const quoteReducer = (state = defaultState, action) => {
    switch(action.type){
        case CHANGE:
            return {
                quote: quoteArray[action.quoteIndex],
                author: authorArray[action.quoteIndex],
                color: colorArray[action.colorIndex],
                tweetLink: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quoteArray[action.quoteIndex])
            };
        default:
            return state;
    }
    
}

const store = createStore(quoteReducer);


export { quoteChanger };
export default store;