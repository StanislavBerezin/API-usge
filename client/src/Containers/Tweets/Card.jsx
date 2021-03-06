import React from "react";
import Aux from "../../Aux/Aux";
import classess from "./Tweets.css";

// the card for the tweet itself
const card = props => (
  <Aux>
    <div className={classess.Card}>
      <div className={classess.Credentials}>
        <h4>{props.name}</h4>
        <img src={props.img} alt={props.name} />
      </div>
      <p>{props.text}</p>
      <div className={classess.Last}>
        <p>Retweets: {props.retweet_count}</p>
        <p>Created at: {props.created}</p>
      </div>
    </div>
  </Aux>
);

export default card;
