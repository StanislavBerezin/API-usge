import React, { Component } from 'react';

import classess from './Sent.css'
class Sum extends Component {
  state = {
    articleName:" Trump did something",
    polarity: "negative"
  }
  



  render() {
    return (
      <div className={classess.Main}>
          <h1>Polarity: {this.state.polarity}</h1>
          <h1>Aritcle:{this.state.articleName} </h1>
          <img src="https://steamuserimages-a.akamaihd.net/ugc/644375363413049722/15E9C96391B85A114E17B9DB8914F2E34DDECA88/" 
            className={classess.Image} 
            alt="Smiley face" />
          <div className={classess.Links}>
          <a className={classess.Summary}>Get summary</a>
              <a className={classess.Source}>View the source</a>
             
          </div>
      </div>
    );
  }
}

export default Sum;
