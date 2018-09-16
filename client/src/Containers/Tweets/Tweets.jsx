import React, { Component } from "react";
import classess from "./Tweets.css";
import Card from "./Card";
import axios from "../../Axios";
import Aux from "../../Aux/Aux";
import { ClipLoader } from "react-spinners";

class Tweet extends Component {
  state = {
    feedbacks: [],
    hashtags: [],
    loading: true
    //  user.screenName  user.name, profile_image_url
  };
// when it mounts display the hashtags and tweets
  componentDidMount() {
    axios
      .post("/tweets", {
        specific: this.props.match.params.id
      })
      .then(response => {
        if (response.data.data.statuses && response.data.allHashtags) {
          let feedbacks = response.data.data.statuses;
          let hashtags = response.data.allHashtags;

          this.setState({
            feedbacks: feedbacks,
            hashtags: hashtags,
            loading: false
          });
        }
      }).catch(e=>{
        console.log(e)
      });
  }

  // whenever u press on the hashtag it will load news twees
  loadFeedbackOnHash(each, index) {
    this.setState({ loading: true, feedbacks: [] });
    axios.post("/hash", { hash: each }).then(response => {
      let feedbacks = response.data.data.statuses;
      this.setState({
        feedbacks: feedbacks,
        active: true,
        loading: false
      });
    }).catch(e=>{
      console.log(e)
    });
  }

  render() {
    let feedback = null;
    let hashtags = null;

    // display hashtags in a form of a list
    hashtags = (
      <Aux>
        {this.state.hashtags.map((each, index) => {
          return (
            <li
              key={index}
              id={index}
              onClick={() => this.loadFeedbackOnHash(each, index)}
            >
              {each}
            </li>
          );
        })}
      </Aux>
    );
    
// display tweets
    feedback = (
      <Aux>
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
      </Aux>
    );
    return (
      <div className={classess.Main}>
        <h1>Twitter feedback</h1>
        <h2>{this.props.match.params.id}</h2>
        <div className={classess.DisplayHash}>
          <h4>Select a hashtag: </h4>
          <ul>{hashtags} </ul>
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
        <div className={classess.Feedbacks}>{feedback}</div>
      </div>
    );
  }
}

export default Tweet;
