import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "../../components/player/Player";
import { Box, Headline } from "grommet";
import Web3 from "web3";

import {
  mergeMediaEvents,
  getMediaEvents,
  getPeriodEvents,
  blockNumberToUnix,
  mergePeriodEvents
} from "../../util/mediaUtils";

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      // media events
      mediaEvents: [],
      periodEvents: [],
      latestBlock: 0,
      //permits
      media: []
    };
    this.contracts = context.drizzle.contracts;
    this.web3 = new Web3(this.contracts.MediaFactory.givenProvider);
    const web3 = new Web3(this.contracts.MediaFactory.givenProvider);
    const { abi, address } = this.contracts.MediaFactory;
    this.MediaFactory = new web3.eth.Contract(abi, address);
  }

  async componentDidMount() {
    await this.getMediaEvents();
    // NOTE: Initiate our own event listener because we can not use reactive event data with
    //       MetaMask and Drizzle.
    this.intervalId = setInterval(async () => {
      const blockNumber = await this.web3.eth.getBlockNumber();
      if (blockNumber > this.state.latestBlock) {
        this.getMediaEvents(blockNumber);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  async getMediaEvents(from = 0) {
    const [createdMedia, createdPeriod] = await Promise.all([
      getMediaEvents(this.MediaFactory, "MediaCreated", from),
      getMediaEvents(this.MediaFactory, "PeriodCreated", from)
    ]);

    const events = createdMedia.concat(createdPeriod);
    if (events.length > 0) {
      const newEvents = await blockNumberToUnix(this.web3, events);
      const mergedEvents = mergeMediaEvents(
        this.state.mediaEvents,
        newEvents
      ).sort((a, b) => b.blockNumber - a.blockNumber);
      this.setState({
        ...this.state,
        mediaEvents: mergedEvents,
        latestBlock: events[0].blockNumber
      });
    }
  }

  render() {
    return (
      <main>
        <Box align="center" justify="center" className="cites-box">
          <Headline className="cites-header" align="center">
            Player Example
          </Headline>
          <Player />
        </Box>
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
