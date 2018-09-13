import React, { Component } from "react";

import Nav from "./Components/Navigation";
import Footer from "./Components/Footer";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "./Containers/Main";
import Sum from "./Containers/Summary/Sum";
import Sent from "./Containers/Sentiment/Sent";
import Tweets from "./Containers/Tweets/Tweets";
class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/article/:id" component={Sum} />
          <Route path="/polarity/:id" component={Sent} />
          <Route path="/tweets/:id" component={Tweets} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
