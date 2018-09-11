import React, { Component } from 'react';

import Nav from './Components/Navigation'
import Footer from './Components/Footer'
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Main from './Containers/Main'
import Sum from './Containers/Summary/Sum'
import Sent from './Containers/Sentiment/Sent'
class App extends Component {


  render() {
    return (
      <div>
        <Nav></Nav>
          
          <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/article/:id" component={Sum}></Route>
            <Route path="/polarity/:id" component={Sent}></Route>
          </Switch>
        <Footer></Footer>
      </div>

    );
  }
}

export default App;
