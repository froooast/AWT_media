import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "../../components/player/Player";
import Web3 from "web3";

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
    this.contracts = context.drizzle.contracts;
    this.web3 = new Web3(this.contracts.Media.givenProvider);
    const web3 = new Web3(this.contracts.Media.givenProvider);
    const { abi, address } = this.contracts.Media;
    this.Media = new web3.eth.Contract(abi, address);
  }

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Player Examples</h1>
            <Player />
          </div>
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  accounts: PropTypes.object,
  Media: PropTypes.object
};

Home.contextTypes = {
  drizzle: PropTypes.object
};

export default Home;
