import React, { Component } from "react";
import classess from "./Tweets.css";
import Card from "./Card";
import axios from "../../Axios";

class Tweet extends Component {
  state = {
    feedbacks: []
    //  user.screenName  user.name, profile_image_url
  };

  componentDidMount() {
    axios
      .post("/tweets", {
        specific: this.props.match.params.id
      })
      .then(response => {
        if (response.data.statuses) {
          let feedbacks = response.data.statuses;
          this.setState({ feedbacks: feedbacks });
        }
      });
  }

  render() {
    let feedback = null;

    feedback = (
      <div>
        {this.state.feedbacks.map((each, index) => {
          return (
            <Card
              key={index}
              text={each.text}
              retweet_count={each.retweet_count}
              name={each.user.name}
              img={each.user.profile_image_url}
              created={each.created_at}
            />
          );
        })}
      </div>
    );
    return (
      <div className={classess.Main}>
        {console.log(this.state.feedbacks)}
        <h1>Twitter feedback</h1>
        <p>The feedback is based on: {this.state.hashtags}</p>
        {feedback}
      </div>
    );
  }
}

export default Tweet;
