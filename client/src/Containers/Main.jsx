import React, { Component } from 'react';
import classess from './Main.css'
import Intro from '../Components/Layout/Intro'
import SearchResults from '../Components/SearchResults/SearchResults'
class Main extends Component {
  state = {
    search:"",
   
  }
  



  render() {
    return (
      <div>
        <Intro></Intro>
    
        <div className={classess.Main}>
          <div clas>
            <h1>Search your news</h1>
              <form>
                <label>
                  <input type="search" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
          </div>
          <h2>Results</h2>
          <div className={classess.Cards}>
          <SearchResults></SearchResults>
          </div>


        </div>
      </div>
    );
  }
}

export default Main;
