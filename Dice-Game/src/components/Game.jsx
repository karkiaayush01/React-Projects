import React from "react";
import Scores from "./Scores";
import GuessButtons from "./GuessButtons";
import "../App.css";

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            points: 0,
            score: 0,
            selected: 0,
            autoRollActive: false,
            ruleView: false,
            lossActivate: false
        }
        this.showRules = this.showRules.bind(this);
        this.generateDice = this.generateDice.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.reset = this.reset.bind(this);
        this.retryGame = this.retryGame.bind(this);
        this.autoroll = this.autoroll.bind(this);
        this.diceRoll = null;
    }

    showRules(){
        var button = document.getElementById("rulesButton");
        var rules = document.getElementById("ruleList");
        this.setState(state => ({ruleView: !state.ruleView}));
        if(this.state.ruleView){
            button.innerHTML = "Hide Rules";
            button.style.backgroundColor = "black";
            button.style.color = "white";
            rules.style.display = "block";
        }
        else{
            button.textContent = "Show Rules";
            button.style.backgroundColor = "white";
            button.style.color = "black";
            rules.style.display = "none";
        }
    }

    generateDice(){
        if(this.state.selected == 0){
            document.getElementById("notSelected").style.display = "block";
        }
        else{
            var diceButton = document.getElementById("diceButton");
            let dice = Math.floor(Math.random()*6) + 1;
            diceButton.style.transform = "scale(0.8)";
            setTimeout(function() {
                diceButton.src = "/images/dice_" + dice + ".png";
                diceButton.style.transform = "scale(1)";
            }, 100);
            if(dice == this.state.selected){
                this.setState(state => ({
                        points : state.points + dice,
                        lossActivate: true
                    }), 
                    () => {
                        if(this.state.score < this.state.points){
                            this.setState(state => ({ 
                                score: state.points,
                            }));
                        }
                    }
                );
            }
            else{
                if(this.state.points - 1 > 0){
                    this.setState(state => ({
                        points : state.points - 1,
                    }));
                } else {
                    this.setState({
                        points: 0
                    });
                    if(this.state.lossActivate){
                        document.getElementById("loss").style.display = "block";
                        this.setState({
                            autoRollActive: false
                        });
                        document.getElementById("autoRoll").style.background = "white";
                        document.getElementById("autoRoll").style.color = "black";
                        document.getElementById("autoRoll").textContent = "Auto Roll";
                        clearInterval(this.diceRoll);
                    }
                }
            }
        }
    }

    autoroll(){
        let diceRoll;
        var button = document.getElementById("autoRoll");
        this.setState( state => ({
            autoRollActive: !state.autoRollActive
        }),
        () => {
            button.style.background = (this.state.autoRollActive ? "black" : "white");
            button.style.color = (!this.state.autoRollActive ? "black" : "white");
            button.textContent = (this.state.autoRollActive ? "Stop Auto Roll" : "Auto Roll");
            if(this.state.autoRollActive){
                this.diceRoll = setInterval(() => {
                    this.generateDice();
                }, 1000);
            } else{
                clearInterval(this.diceRoll);
            }
        }
        );
    }

    handleSelect = (select) => {
        document.getElementById("notSelected").style.display = "none";
        this.setState({selected: select}, 
            () => {
                var dice = "dice"+select;
                document.getElementById(dice).style.color = "white";
                document.getElementById(dice).style.background = "black";
                let i = 1;
                while(i <= 6){
                    let newDice = "dice"+i;
                    if(this.state.selected != i){
                        document.getElementById(newDice).style.color = "black";
                        document.getElementById(newDice).style.background = "white";
                    }
                    i++;
                }
            }
        );
    }

    reset(){
        this.setState({
            points: 0,
            score : 0,
            lossActivate: false
        })
    }

    retryGame(){
        var dice = "dice" + this.state.selected;
        document.getElementById("loss").style.display = "none";
        document.getElementById(dice).style.background = "white";
        document.getElementById(dice).style.color = "black";
        this.setState({
            points: 0,
            selected: 0,
            score: 0,
            autoRollActive: false,
            lossActivate: false
        });
    }

    render(){
        return(
            <div>
                <header className="gameHeader">
                    <Scores points = {this.state.points} score = {this.state.score} />
                    <GuessButtons handleSelect = {this.handleSelect} />
                </header>

                <div class = "mainGame">
                    <figure className="diceForRoll">
                        <img id = "diceButton" src = "/images/dice_1.png" onClick={this.generateDice}></img>
                        <figcaption>Click on Dice to roll</figcaption>
                    </figure>
                    <button id = "autoRoll" onClick={this.autoroll}>Auto Roll</button><br></br>
                    <button onClick={this.reset}>Reset Score</button><br></br>
                    <button id = "rulesButton" onClick = {this.showRules}>Show Rules</button>
                </div>

                <div className="rules" id = "ruleList">
                    <h1>How to play dice game</h1>
                    <ul>
                        <li>Select any number</li>
                        <li>Click on dice image</li>
                        <li>After clicking the dice, if the selected number matches to the roll, you will get equal points as dice</li>
                        <li>1 point will be deducted from incorrect guesses</li>
                    </ul>
                </div>
                
                <div id="loss">
                    <div className="gameOver">
                        <p>Game Over </p>
                        <h1>{this.state.score}</h1>
                        <button onClick = {this.retryGame}>Retry</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;