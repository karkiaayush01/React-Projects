import React from "react";
import Content from "./components/Content.jsx";
import Game from "./components/Game.jsx";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasGameStarted : false
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay(){
    this.setState(state => ({
      hasGameStarted : !(state.hasGameStarted)
    }))
  }

  render(){
    return(
      this.state.hasGameStarted? <Game /> : <Content toggle = {this.toggleDisplay}/>
    );
  }
};

export default App
