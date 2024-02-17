import React from "react";
import {connect, Provider} from 'react-redux';
import store, {quoteChanger} from "./ReduxStore";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    author: state.author,
    color: state.color,
    tweetLink: state.tweetLink
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuote: function () {
      dispatch(quoteChanger());
    }
  };
};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      opaque: 0
    };
    this.nextQuote = this.nextQuote.bind(this);
  }

  nextQuote(){
    this.setState({
      opaque: 0,
    });
    setTimeout(() => {
      this.props.changeQuote();
      this.setState({
        opaque: 1
      });     
    }, 500);
  }

  componentDidMount(){
    this.nextQuote();
  }


  render(){
    document.body.style.background = this.props.color;
    const element = <FontAwesomeIcon icon={faTwitter} />;
    const colored = {
      color: this.props.color,
      opacity: this.state.opaque
    }
    const linkColor = {
      backgroundColor: this.props.color,
      opacity: this.state.opaque
    }
    return(
      <div id = "content">
        <div id="quote" style = {colored}>
            <div id="text">" {this.props.quote}</div>
            <p id="author"> - {this.props.author}</p>
        </div>
        <div className="quoteButtons">
            <a style = {linkColor} id="tweet-quote" href={this.props.tweetLink} target="_blank">
              {element}
            </a>
            <button style = {linkColor} id="new-quote" onClick = {this.nextQuote}>New Quote</button>
        </div>
      </div>
    );
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

class MainApp extends React.Component{
  render(){
    return(
      <Provider store = {store}>
        <ConnectedApp />
      </Provider>
    )
  }
}

export default MainApp;
