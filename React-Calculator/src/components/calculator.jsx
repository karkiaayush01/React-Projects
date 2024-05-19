import React from "react";
import '../styles/calculatorStyle.css';
import store from "../reduxStore/store.js";
import {connect, Provider} from 'react-redux';
import { numberButton, clear, ceClear, decimal, dlt, action} from "../reduxStore/store.js";

const mapStateToProps = (state) => {
    return{
        currNumber: state.currNumberRdc.currNumber,
        operation: state.currNumberRdc.operation,
        number: state.currNumberRdc.number,
        counter: state.currNumberRdc.counter
    }
};

const mapDispatchToProps = {
    changeCurrent: numberButton,
    clear: clear,
    ceClear: ceClear,
    point: decimal,
    dlt: dlt,
    action: action
};

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.clearNumber = this.clearNumber.bind(this);
    }

    updateCurrent(number){
        this.props.changeCurrent(number);
    }
    
    clearNumber(){
        this.props.clear();
    }

    action(expression){
        this.props.action(expression);
    }

    render(){
        return(
            <div className = "mainBody">
                <div className="mainScreen">
                    <div className="leftSide">
                        <p className="operation">{this.props.operation}</p>
                        <p className="counter">{this.props.counter}</p>
                    </div>
                    <p className = "mainNumbers">{this.props.currNumber}</p>
                </div>
                <div className = "buttons">
                    <div className = "buttonRows topRow">
                        <button className="calcButtons" onClick={() => this.updateCurrent('9')}>9</button>
                        <button className = "calcButtons" onClick={() => this.updateCurrent('8')}>8</button>
                        <button className = "calcButtons" onClick={() => this.updateCurrent('7')}>7</button>
                        <button className = "calcButtons" onClick = {this.props.ceClear}>CE</button>
                        <button className = "calcButtons" onClick={() => this.clearNumber()}>AC</button>
                    </div>
                    <div className = "buttonRows secondRow">
                        <button className = "calcButtons" onClick={() => this.updateCurrent('6')}>6</button>
                        <button className = "calcButtons" onClick={() => this.updateCurrent('5')}>5</button>
                        <button className = "calcButtons" onClick={() => this.updateCurrent('4')}>4</button>
                        <button className = "calcButtons" onClick = {() => this.action("MULTIPLY")}>*</button>
                        <button className = "calcButtons" onClick = {() => this.action("SUBTRACT")}>-</button>
                    </div>
                    <div className = "buttonRows thirdRow">
                        <button className = "calcButtons" onClick={() => this.updateCurrent('3')}>3</button>
                        <button className = "calcButtons" onClick={() => this.updateCurrent('2')}>2</button>
                        <button className = "calcButtons" onClick={() => this.updateCurrent('1')}>1</button>
                        <button className = "calcButtons" onClick = {() => this.action("DIVIDE")}>/</button>
                        <button className = "calcButtons" onClick = {() => this.action("ADD")}>+</button>
                    </div>
                    <div className = "buttonRows thirdRow">
                        <button className = "calcButtons" onClick={() => this.updateCurrent('0')}>0</button>
                        <button className = "calcButtons" onClick = {() => this.updateCurrent('00')}>00</button>
                        <button className = "calcButtons" onClick = {() => this.props.point()}>.</button>
                        <button className = "calcButtons" onClick={() => this.props.dlt()}>Del</button>
                        <button className = "calcButtons" onClick = {() => this.action("EQUALS")}>=</button>
                    </div>
                </div>
            </div>
        );
    }
};

const ConnectedCalculator = connect(mapStateToProps, mapDispatchToProps)(Calculator);

class MainCalculator extends React.Component{
    render(){
        return(
            <Provider store = {store}>
                <ConnectedCalculator />
            </Provider>
        )
    }
}

export default MainCalculator;