import React, { Component } from "react";
import axios from "../../Axios";
import classess from "./Sent.css";
import { Link } from "react-router-dom";

class Sum extends Component {
  state = {
    title: " Trump did something",
    polarity: "",
    confidence: "",
    url: ""
  };

  componentDidMount() {
    // console.log(this.props.match.params.id);

    if (this.props.match.params.id) {
      const title = this.props.match.params.id;
      this.setState({ title });
      axios
        .post("/polarity", {
          title: this.props.match.params.id
        })
        .then(response => {
          let result = response.data;

          this.setState({
            polarity: result.polarity,
            url: result.url,
            confidence: result.confidence
          });
        });
    }
  }

  render() {
    return (
      <div className={classess.Main}>
        <h1>Polarity: {this.state.polarity}</h1>
        <h1>Accuracy: {this.state.confidence}</h1>
        <h1>
          Aritcle:
          {this.state.title}
        </h1>
        <img
          src="https://steamuserimages-a.akamaihd.net/ugc/644375363413049722/15E9C96391B85A114E17B9DB8914F2E34DDECA88/"
          className={classess.Image}
          alt="Smiley face"
        />
        <div className={classess.Links}>
          <Link
            to={`/article/${this.props.match.params.id}`}
            className={classess.Summary}
          >
            Get summary
          </Link>
          <a className={classess.Source} href={this.state.url}>
            View the source
          </a>

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
