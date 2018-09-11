import React, { Component } from 'react';

import classess from './Sum.css'
class Sum extends Component {
  state = {
    search:"",
   
  }
  



  render() {
    return (
      <div className={classess.Main}>
          <h1>Title</h1>
          <img src="https://cdn.cnn.com/cnnnext/dam/assets/180906215153-01-trump-rally-0906-super-tease.jpg" 
            className={classess.Image} 
            alt="Smiley face" />
          <div>Article Article 
          Article Article 
          Article Article 
          Article Article 
          Article Article 
          Article Article 
          Article Article 
          Article Article 
          Article Article 
          Article Article 
          Article Article 

          Article Article 
          </div>
          <div className={classess.Links}>
              <a className={classess.Source}>View the source</a>
              <a className={classess.Sentiment}>Sentiment</a>
          </div>
      </div>
    );
  }
}

export default Sum;
