import React, { Component } from "react";
import { Route } from "react-router";
import HomeContainer from "./layouts/home/HomeContainer";

import { App as GrommetApp } from "grommet";
import MediaHeader from "../src/MediaHeader";
import MediaFooter from "../src/MediaFooter";

class App extends Component {
  render() {
    return (
      <GrommetApp>
        <MediaHeader />
        <Route exact path="/" component={HomeContainer} />
        <MediaFooter />
      </GrommetApp>
    );
  }
}

export default App;
