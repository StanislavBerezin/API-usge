import React, { Component } from "react";

import classess from "./Sum.css";
import axios from "../../Axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
class Sum extends Component {
  state = {
    img: "",
    summary: "",
    title: "",
    url: "",
    loading: true
  };

  // when it mounts need to send information to back-end to find thart article and perform summarisation
  componentDidMount() {
    // console.log(this.props.match.params.id);

    if (this.props.match.params.id) {
      const title = this.props.match.params.id;
      this.setState({ title });
      axios
        .post("/specific", {
          specific: this.props.match.params.id
        })
        // saving serach news and summary
        .then(response => {
          const searchNews = response.data.news.articles;
          const summary = response.data.text.join();
          this.setState({
            img: searchNews[0].urlToImage,
            title: searchNews[0].title,
            url: searchNews[0].url,
            summary,
            loading: false
          });
        }).catch(e=>{
          console.log(e)
        });
    }
  }

  // displaying everything
  render() {
    return (
      <div className={classess.Main}>
        <h1>{this.state.title}</h1>
        <div className="sweet-loading">
          <ClipLoader
            className={classess.Fix}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        <img
          src={this.state.img}
          className={classess.Image}
          alt={this.state.title}
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
