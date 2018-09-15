import React, { Component } from "react";
import axios from "../../Axios";
import classess from "./Sent.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Aux from "../../Aux/Aux";
class Sum extends Component {
  state = {
    title: " ",
    polarity: "",
    confidence: "",
    url: "",
    loading: true,
    img: ""
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
          switch (this.state.polarity) {
            case "neutral":
              this.setState({
                image:
                  "https://i.pinimg.com/originals/fa/ae/07/faae07973f6bdd397b0328a267abc3b2.png",
                polarity: result.polarity,
                url: result.url,
                confidence: result.confidence,
                loading: false
              });
              break;

            case "positive":
              this.setState({
                image:
                  "https://tellmethatyoulovemefirst.files.wordpress.com/2011/12/sanguine-guy.png",
                polarity: result.polarity,
                url: result.url,
                confidence: result.confidence,
                loading: false
              });
              break;

            case "negative":
              this.setState({
                image:
                  "https://vignette.wikia.nocookie.net/ninjago/images/2/2f/Whyyy.png/revision/latest?cb=20120613232526",
                polarity: result.polarity,
                url: result.url,
                confidence: result.confidence,
                loading: false
              });
              break;

            default:
              this.setState({
                image:
                  "http://nathanbiberdorf.files.wordpress.com/2013/02/thinking-meme-face.png",
                polarity: result.polarity,
                url: result.url,
                confidence: result.confidence,
                loading: false
              });
          }
        });
    }
  }

  render() {
    let details = null;
    if (!this.state.loading) {
      details = (
        <Aux>
          <h1>Polarity: {this.state.polarity}</h1>
          <h1>Accuracy: {this.state.confidence}</h1>
          <h1>
            Aritcle:
            {this.state.title}
          </h1>
          <img
            src={this.state.image}
            className={classess.Image}
            height="150"
            width="270"
            alt="Smiley face"
          />
        </Aux>
      );
    }

    return (
      <div className={classess.Main}>
        <div className="sweet-loading">
          <ClipLoader
            className={classess.Fix}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        {details}
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
            className={classess.Summary}
          >
            View Tweets
          </Link>
        </div>
      </div>
    );
  }
}

export default Sum;
