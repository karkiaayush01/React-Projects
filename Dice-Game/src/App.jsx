import React from "react";
import Content from "./components/Content.jsx";
import Game from "./components/Game.jsx";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

const TOGGLE = 'TOGGLE';

const toggle = () => ({
  type: TOGGLE
});

const displayReducer = (state = false, action) => {
  switch(action.type){
    case TOGGLE:
      return !state;
    default:
      return state;
  }
};

const store = createStore(displayReducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay() {
    this.props.toggleView();
  }

  render() {
    return (
      this.props.hasGameStarted ? <Game /> : <Content toggle={this.toggleDisplay}/>
    );
  }
}

const mapStateToProps = (state) => ({
  hasGameStarted: state
});

const mapDispatchToProps = (dispatch) => ({
  toggleView: () => {
    dispatch(toggle());
  }
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

export default AppWrapper;
