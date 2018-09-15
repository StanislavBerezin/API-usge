import React, { Component } from "react";
import classess from "./Main.css";
import Intro from "../Components/Layout/Intro";
import axios from "../Axios";
import SearchResults from "../Components/SearchResults/SearchResults";
import Aux from "../Aux/Aux";
import { ClipLoader } from "react-spinners";
class Main extends Component {
  state = {
    defaultNews: [],
    search: "",
    searchNews: [],
    loading: true
  };

  componentDidMount() {
    axios.get("/news").then(response => {
      const defaultNews = response.data.articles.slice(0, 11);
      defaultNews.slice(0, 11);
      this.setState({ defaultNews, loading: false });
    });
  }
  // title, urlToImage, descrsiption

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ defaultNews: [], searchNews: [], loading: true });
    axios
      .post("/searchNews", {
        search: this.state.search
      })
      .then(response => {
        const searchNews = response.data.articles.slice(0, 11);

        this.setState({ searchNews, loading: false });
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
          <div className="sweet-loading">
            <ClipLoader
              className={classess.Fix}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
          <div className={classess.Cards}>{cards}</div>
        </div>
      </div>
    );
  }
}

export default Main;
