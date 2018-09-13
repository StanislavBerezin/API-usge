import React, { Component } from "react";
import classess from "./Main.css";
import Intro from "../Components/Layout/Intro";
import axios from "../Axios";
import SearchResults from "../Components/SearchResults/SearchResults";
import Aux from "../Aux/Aux";
class Main extends Component {
  state = {
    defaultNews: [],
    search: "",
    searchNews: []
  };

  componentDidMount() {
    axios.get("/news").then(response => {
      const defaultNews = response.data.articles;
      this.setState({ defaultNews });
    });
  }
  // title, urlToImage, descrsiption

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/searchNews", {
        search: this.state.search
      })
      .then(response => {
        const searchNews = response.data.articles;
        this.setState({ searchNews });
      });
  };

  render() {
    let cards = null;

    if (this.state.searchNews.length > 0) {
      cards = (
        <Aux>
          <h2>Results</h2>
          {this.state.searchNews.map((each, index) => {
            return (
              <SearchResults
                src={each.urlToImage}
                title={each.title}
                key={index}
              />
            );
          })}
        </Aux>
      );
    } else {
      cards = (
        <Aux>
          {this.state.defaultNews.map((each, index) => {
            return (
              <SearchResults
                src={each.urlToImage}
                title={each.title}
                key={index}
              />
            );
          })}
        </Aux>
      );
    }

    return (
      <div>
        <Intro />
        <div className={classess.Main}>
          <div>
            <h1>Search your news</h1>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input type="search" name="name" onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className={classess.Cards}>{cards}</div>
        </div>
      </div>
    );
  }
}

export default Main;
