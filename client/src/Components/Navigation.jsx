import React from "react";

import { Link } from "react-router-dom";
import classess from "./Nav.css";

const navBar = () => (
  <div className={classess.Nav}>
    <Link to={"/"} tag="a">
      Search news
    </Link>
  </div>
);

export default navBar;
