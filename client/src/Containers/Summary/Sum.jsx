import React, { Component } from "react";

import classess from "./Sum.css";
import axios from "../../Axios";
import { Link } from "react-router-dom";

class Sum extends Component {
  state = {
    img: "",
    summary: "",
    title: "",
    url: ""
  };

  componentDidMount() {
    // console.log(this.props.match.params.id);

    if (this.props.match.params.id) {
      const title = this.props.match.params.id;
      this.setState({ title });
      axios
        .post("/specific", {
          specific: this.props.match.params.id
        })
        .then(response => {
          const searchNews = response.data.news.articles;
          const summary = response.data.text.join();
          this.setState({
            img: searchNews[0].urlToImage,
            title: searchNews[0].title,
            url: searchNews[0].url,
            summary
          });
        });
    }
  }
  render() {
    return (
      <div className={classess.Main}>
        <h1>{this.state.title}</h1>
        <img
          src={this.state.img}
          className={classess.Image}
          alt="Smiley face"
        />
        <div>{this.state.summary}</div>
        <div className={classess.Links}>
          <a className={classess.Source} href={this.state.url}>
            View the source
          </a>
          <Link
            to={`/polarity/${this.props.match.params.id}`}
            className={classess.Sentiment}
          >
            Get sentiment
          </Link>

          <Link
            to={`/tweets/${this.props.match.params.id}`}
            className={classess.Sentiment}
          >
            View Tweets
          </Link>
        </div>
      </div>
    );
  }
}

export default Sum;
