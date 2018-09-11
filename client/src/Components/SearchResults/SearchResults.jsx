import React from 'react';

import classess from './SearchResults.css'


const results = ( ) => (

    <div>
        <div className={classess.Card}>
        <img src="https://cdn.cnn.com/cnnnext/dam/assets/180906215153-01-trump-rally-0906-super-tease.jpg" 
            className={classess.Image} 
            alt="Smiley face" height="150" width="270"/>
            <div className={classess.Text}>
                <h5>Tita asd asd asd asdas dasd asd asdas dasdasdaksjd lakjsdkajskd jaskl djaksdjaklsjdkalsjd kasjdlkajd ajsdka lsd jad jasdklsdasdasdas  asd asd asd asd asd asdasdasd as dasd asda sdasdle</h5>
                <a className={classess.Summary}>Get summary</a>
                <a className={classess.Sentiment}>Get sentiment</a>
            </div>            
        
        </div>
    </div>
       
 
  
)

export default results;