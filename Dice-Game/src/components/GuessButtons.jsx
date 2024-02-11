import React from "react";
import "../App.css";

class GuessButtons extends React.Component{
    render(){
        return(
            <div className="guessButtons">
                <p id = "notSelected">You have not selected any number</p>
                <div className="buttons">
                    <button id = "dice1" onClick = {() => this.props.handleSelect(1)}>1</button>
                    <button id = "dice2" onClick = {() => this.props.handleSelect(2)}>2</button>
                    <button id = "dice3" onClick = {() => this.props.handleSelect(3)}>3</button>
                    <button id = "dice4" onClick = {() => this.props.handleSelect(4)}>4</button>
                    <button id = "dice5" onClick = {() => this.props.handleSelect(5)}>5</button>
                    <button id = "dice6" onClick = {() => this.props.handleSelect(6)}>6</button>
                </div>
                <p>Select Number</p>
            </div>
        );
    }
}

export default GuessButtons;