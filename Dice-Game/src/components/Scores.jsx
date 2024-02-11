import React from "react";
import "../App.css";

class Scores extends React.Component{
    render(){
        return(
            <div className="scorePart">
                <div className="scores">
                    <h1>{this.props.points}</h1>
                    <p>Current Points</p>
                </div>
                <div className="scores">
                    <h1>{this.props.score}</h1>
                    <p>Score</p>
                </div>
            </div>
        );
    }
}

export default Scores;