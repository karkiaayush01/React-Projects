import {legacy_createStore as createStore} from 'redux';
import rootReducer from './reducers';

const CLEAR = "CLEAR";
const NUMBER = "NUMBER";
const CECLEAR = "CECLEAR";
const POINT = "POINT";
const DELETE = "DELETE";
const ADD = "ADD";
const SUBTRACT = "sUBTRACT";
const MULTIPLY = "MULTIPLY";
const DIVIDE = "DIVIDE";

const clear = () => {
    return{
        type: CLEAR
    }
};

const action = (operationAction) => {
    return{
        type: operationAction
    };
};

const numberButton = (pressed) => {
    return{
        type: NUMBER,
        value: pressed
    };
}

const ceClear = () => {
    return{
        type: CECLEAR
    };
};

const decimal = () => {
    return{
        type: POINT
    };
};

const dlt = () => {
    return{
        type: DELETE
    };
}

export {numberButton, ceClear, decimal, dlt, action};
export {clear};

const store = createStore(rootReducer);

export default store;