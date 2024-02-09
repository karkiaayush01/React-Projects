import React from "react";
import '../App.css'

class Content extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main>
                <div className="diceImage">
                    <img src = "images/dice.png" />
                </div>
                <div className="startGame">
                    <h1>DICE GAME</h1>
                    <button className = "playButton" onClick = {this.props.toggle}>Play Now</button>
                </div>
            </main>
        );
    }
}

export default Content;