import React, { Component } from "react";
import dash from "dashjs";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
   
      this.initPlayer();
    
  }

  initPlayer() {
    var testManifest = this.props.manifest;
    
    var player = dash.MediaPlayer().create();
    const url = "http://localhost:4545/manifest";
    player.initialize(document.querySelector("#videoPlayer"), url, false);
    fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: testManifest, // body data type must match "Content-Type" header  text/plain
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then(_ => {
      player.retrieveManifest(url, testManifest => {
        player.attachSource(testManifest);
      });
    });
  }


  render() {
    return (
      <div>
        <video id="videoPlayer" controls />
      </div>
    );
  }
}

export default Player;
