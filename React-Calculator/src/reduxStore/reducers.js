import { combineReducers } from 'redux';

const CLEAR = "CLEAR";
const NUMBER = "NUMBER";
const CECLEAR = "CECLEAR";
const POINT = "POINT";
const DELETE = "DELETE";
const ADD = "ADD";
const SUBTRACT = "SUBTRACT";
const MULTIPLY = "MULTIPLY";
const DIVIDE = "DIVIDE";
const EQUALS = "EQUALS";

const defaultState = {
    numbers : [],
    currNumber: '0',
    operation: '',
    counter: 0,
    pointActivate: false,
    counterActivated: false,
    buttonPressed: false
};

function performOperation(numbers,operation){
    if(operation == "+"){
        return(numbers[0] + numbers[1]);
    }
    else if (operation == "-"){
        return(numbers[0] - numbers[1]);
    }else if(operation == "*"){
        return(numbers[0] * numbers[1]);
    } else if(operation == "/"){
        if(numbers[1] == 0){
            return 0;
        }
        return(numbers[0] / numbers[1]);
    }
}

const currNumberReducer = (state = defaultState, action) => {
    switch(action.type){
        case NUMBER:
            var newNumber;
            var newCounter;
            if(!state.counterActivated) {
                newCounter = state.counter + 1;
            } else newCounter = state.counter;
            
            if(state.operation && !state.buttonPressed){
                newNumber = 0;
            } else{
                newNumber = state.currNumber;
            }

            if(state.operation == "="){
                var numbersList = [];
                var operationToDo = "";
            } else{
                var numbersList = state.numbers;
                var operationToDo = state.operation;
            }

            if(newNumber == '0') {
                if(action.value != '00') newNumber = action.value;
                else newNumber = '0'
            }
            else {
                newNumber = newNumber + action.value;
            }
            if(!(state.pointActivate)){
                if(newNumber.length > 12){
                    return {
                        ...state,
                        counter: newCounter,
                        counterActivated: true,
                        buttonPressed: true,
                        numbers: numbersList,
                        operation: operationToDo
                    };
                }
                else return{
                    ...state,
                    currNumber: newNumber,
                    counter: newCounter,
                    counterActivated: true,
                    buttonPressed: true,
                    numbers: numbersList,
                    operation: operationToDo
                };
            } else {
                if(newNumber.length > 13){
                    return {
                        ...state,
                        counter: newCounter,
                        counterActivated: true,
                        buttonPressed: true,
                        numbers: numbersList,
                        operation: operationToDo
                    };   
                }
                else return{
                    ...state,
                    currNumber: newNumber,
                    counter: newCounter,
                    counterActivated: true,
                    buttonPressed: true,
                    numbers: numbersList,
                    operation: operationToDo    
                };
            }
        case POINT:
            if(state.pointActivate){
                return {...state};
            }
            else{
                return{
                    ...state,
                    currNumber: state.currNumber + ".",
                    pointActivate: true
                }
            }
        case CLEAR:
            return {
                numbers: [],
                currNumber: '0',
                operation: '',
                counter: 0,
                pointActivate: false,
                buttonPressed: false
            };
        case CECLEAR:
            return{
                ...state,
                currNumber: '0',
                pointActivate: false,
                buttonPressed: false
            }
        case DELETE:
            if(state.currNumber.length == 1){
                return{
                    ...state,
                    currNumber: 0
                }
            }
            else {
                if(state.currNumber != '0'){
                    return{
                        ...state,
                        currNumber: state.currNumber.substring(0, state.currNumber.length - 1)
                    }
                }
                else return state;
            }
        case ADD: 
            var current = state.currNumber;
            if(state.buttonPressed){
                if(state.numbers.length == 0){
                    const newNumbers = [...state.numbers, Number(current)];
                    return{
                        ...state,
                        numbers: newNumbers,
                        operation: '+',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false
                    }
                }
                else{
                    const newNumbers = [...state.numbers, Number(current)];
                    var value = performOperation(newNumbers, state.operation);
                    return{
                        ...state,
                        numbers: [value],
                        currNumber: value,
                        operation: '+',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false                   
                    }
                }
            }
            else{
                if(state.operation){
                    return{
                        ...state,
                        operation: "+"
                    }
                }
            }
        case SUBTRACT: 
            var current = state.currNumber;
            if(state.buttonPressed){
                if(state.numbers.length == 0){
                    const newNumbers = [...state.numbers, Number(current)];
                    return{
                        ...state,
                        numbers: newNumbers,
                        operation: '-',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false
                    }
                }
                else{
                    const newNumbers = [...state.numbers, Number(current)];
                    var value = performOperation(newNumbers, state.operation);
                    return{
                        ...state,
                        numbers: [value],
                        currNumber: value,
                        operation: '-',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false                   
                    }
                }
            }
            else{
                if(state.operation){
                    return{
                        ...state,
                        operation: "-"
                    }
                }
            }
        case MULTIPLY:
            var current = state.currNumber;
            if(state.buttonPressed){
                if(state.numbers.length == 0){
                    const newNumbers = [...state.numbers, Number(current)];
                    return{
                        ...state,
                        numbers: newNumbers,
                        operation: '*',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false
                    }
                }
                else{
                    const newNumbers = [...state.numbers, Number(current)];
                    var value = performOperation(newNumbers, state.operation);
                    return{
                        ...state,
                        numbers: [value],
                        currNumber: value,
                        operation: '*',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false                   
                    }
                }
            }
            else{
                if(state.operation){
                    return{
                        ...state,
                        operation: "*"
                    }
                }
            }
        case DIVIDE:
            var current = state.currNumber;
            if(state.buttonPressed){
                if(state.numbers.length == 0){
                    const newNumbers = [...state.numbers, Number(current)];
                    return{
                        ...state,
                        numbers: newNumbers,
                        operation: '/',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false
                    }
                }
                else{
                    const newNumbers = [...state.numbers, Number(current)];
                    var value = performOperation(newNumbers, state.operation);
                    return{
                        ...state,
                        numbers: [value],
                        currNumber: value,
                        operation: '/',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false                   
                    }
                }
            }
            else{
                if(state.operation){
                    return{
                        ...state,
                        operation: "/"
                    }
                }
            }
        case EQUALS:
            var current = state.currNumber;
            if(state.buttonPressed){
                if(state.numbers.length == 0){
                    const newNumbers = [...state.numbers, Number(current)];
                    return{
                        ...state,
                        numbers: newNumbers,
                        operation: '=',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false
                    }
                }
                else{
                    const newNumbers = [...state.numbers, Number(current)];
                    var value = performOperation(newNumbers, state.operation);
                    return{
                        ...state,
                        numbers: [value],
                        currNumber: value,
                        operation: '=',
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false                   
                    }
                }
            }
            else{
                if(state.operation){
                    return{
                        ...state,
                        operation: "=",
                        counterActivated: false,
                        buttonPressed: false,
                        pointActivate: false 
                    }
                }
            }
        default: 
            return state;
    }
};

const rootReducer = combineReducers({
    currNumberRdc: currNumberReducer
})

export default rootReducer;