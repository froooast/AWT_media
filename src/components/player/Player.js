import React, { Component } from "react";
import shaka from "shaka-player";
import virtualIPFSGateway from "../../util/virtualIPFSGateway";
import localManifestProvider from "../../util/localManifestProvider";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();
    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error("Browser not supported!");
    }
  }
  initPlayer() {
    var player = new shaka.Player(this.refs.video);
    player.addEventListener("error", this.onErrorEvent);

    shaka.net.NetworkingEngine.registerScheme("ipfs", virtualIPFSGateway);
    shaka.net.NetworkingEngine.registerScheme(
      "js",
      localManifestProvider(this.props.manifest)
    );
    const url = "js://manifest.mpd";
    player
      .load(url)
      .then(function() {
        console.log("The manifest was loaded into shaka");
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <video
          ref="video"
          width="640"
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
          autoPlay
        />
      </div>
    );
  }
}

export default Player;
