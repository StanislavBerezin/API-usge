import React from "react";

import classess from "./SearchResults.css";
import { Link } from "react-router-dom";

const results = props => (
  <div className={classess.Card}>
    <img
      src={props.src}
      className={classess.Image}
      alt="Smiley face"
      height="150"
      width="270"
    />
    <h5>{props.title}</h5>
    <div className={classess.Text}>
      <Link to={`/article/${props.title}`} className={classess.Summary}>
        Get summary
      </Link>
      <Link to={`/polarity/${props.title}`} className={classess.Sentiment}>
        Get sentiment
      </Link>
      <Link to={`/tweets/${props.title}`} className={classess.Sentiment}>
        View tweets
      </Link>
    </div>
  </div>
);

export default results;
