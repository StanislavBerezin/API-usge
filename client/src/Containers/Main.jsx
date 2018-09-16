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
    loading: true,
    error: false
  };
// when it mounts get the default articles to display at least somethng
  componentDidMount() {
    axios.get("/news").then(response => {
      const defaultNews = response.data.articles.slice(0, 11);
      defaultNews.slice(0, 11);
      // setting default news and removing loading circle
      this.setState({ defaultNews, loading: false });
    }).catch(e=>{
      console.log(e)
    });
  }
  // title, urlToImage, descrsiption
// upading what is being searched
  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  // to submit the search to back end
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
      }).catch(e=>{
        console.log(e)
      });
  };

  render() {
    let cards = null;

    // if there are searched news then display it
    if (this.state.searchNews.length > 0) {
      cards = (
        <Aux>
          {/* going thorugh each */}
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
      // if somethng else then display default ones
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
        {/* intro screen */}
        <Intro />
        <div className={classess.Main}>
          <div>
            <h1>Search your news</h1>
            {/* managing the form on submission */}
            <form onSubmit={this.handleSubmit}>
              <label>
                <input type="search" name="name" onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="sweet-loading">
          {/* loading circle */}
            <ClipLoader
              className={classess.Fix}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
          {/* display the cards */}
          
          <div className={classess.Cards}>{cards}</div>
        </div>
      </div>
    );
  }
}

export default Main;
