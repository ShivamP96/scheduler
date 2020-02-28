import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

// the main reactDOM renderer for our react app, we render application to the root
ReactDOM.render(<Application />, document.getElementById("root"));
