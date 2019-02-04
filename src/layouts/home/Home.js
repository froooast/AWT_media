import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "../../components/player/Player";
import { Box, Headline } from "grommet";
import Web3 from "web3";
import Spinning from "grommet/components/icons/Spinning";

import js2XMLparser from "js2xmlparser";
import { createXML } from "../../util/parser";
import { obj } from "../../util/parser";

import {
  parseRawMedia,
  parseRawPeriod,
  parseRawAdaptionSet,
  mergeMediaEvents,
  parseRawRepresentationSet,
  getMediaEvents,
  blockNumberToUnix
} from "../../util/mediaUtils";

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      // media events
      mediaEvents: [],
      latestBlock: 0,
      //permits
      adaptionSet: [],
      representationSet: [],
      manifest: null,
      isLoading: true
    };
    this.contracts = context.drizzle.contracts;
    this.web3 = new Web3(this.contracts.MediaFactory.givenProvider);
    const web3 = new Web3(this.contracts.MediaFactory.givenProvider);
    const { abi, address } = this.contracts.MediaFactory;
    this.MediaFactory = new web3.eth.Contract(abi, address);
  }

  async componentDidMount() {
    await this.getMediaEvents();
    await this.getEventItems();
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

  componentDidUpdate() {
    if (this.state.isLoading) {
      if (
        this.state.media &&
        this.state.period &&
        this.state.representationSet &&
        this.state.adaptionSet
      ) {
        console.log("received all nescessary data!");
        this.setState({ isLoading: false });
        //this.setState({ manifest: this.prepareXML() });
        const manifest = js2XMLparser.parse("MPD", obj, {
          declaration: { encoding: "UTF-8" }
        });
        this.setState({ manifest });
      }
    }
  }

  async getMediaEvents(from = 0) {
    const [
      createdMedia,
      createdPeriod,
      createdAdaption,
      createdRepresentationSet
    ] = await Promise.all([
      getMediaEvents(this.MediaFactory, "MediaCreated", from),
      getMediaEvents(this.MediaFactory, "PeriodCreated", from),
      getMediaEvents(this.MediaFactory, "AdaptionSetCreated", from),
      getMediaEvents(this.MediaFactory, "RepresentationSetCreated", from)
    ]);

    const events = createdMedia
      .concat(createdPeriod)
      .concat(createdAdaption)
      .concat(createdRepresentationSet);
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

  async getEventItems() {
    for (const event of this.state.mediaEvents) {
      if (event.event === "MediaCreated") {
        const rawMedia = await this.contracts.MediaFactory.methods
          .getMedia(event.hash)
          .call();
        const parsedMedia = parseRawMedia(rawMedia);
        report(event.event, parsedMedia);
        this.setState({
          media: parsedMedia
        });
      } else if (event.event === "PeriodCreated") {
        const rawPeriod = await this.contracts.MediaFactory.methods
          .getPeriod(event.hash)
          .call();
        const parsedPeriod = parseRawPeriod(rawPeriod);
        report(event.event, parsedPeriod);
        this.setState({
          period: parsedPeriod
        });
      } else if (event.event === "AdaptionSetCreated") {
        const rawAdaptionSet = await this.contracts.MediaFactory.methods
          .getAdaptionSet(event.hash)
          .call();
        const parsedAdaptionSet = parseRawAdaptionSet(rawAdaptionSet);
        report(event.event, parsedAdaptionSet);
        this.setState({
          adaptionSet: parsedAdaptionSet
        });
      } else if (event.event === "RepresentationSetCreated") {
        const rawRepresentationSet = await this.contracts.MediaFactory.methods
          .getRepresentationSet(event.hash)
          .call();
        const parsedRepresentationSet = parseRawRepresentationSet(
          rawRepresentationSet
        );
        report(event.event, parsedRepresentationSet);
        this.setState({
          representationSet: parsedRepresentationSet
        });
      }
    }
  }

  prepareXML() {
    console.log("Building Manifest!");
    const xml = createXML(
      this.state.media.title,
      this.state.period.duration,
      this.state.period.baseUrl,
      this.state.adaptionSet.segmentAlignment,
      this.state.adaptionSet.maxWidth,
      this.state.adaptionSet.maxHeight,
      this.state.adaptionSet.maxFrameRate,
      this.state.adaptionSet.par,
      this.state.adaptionSet.lang,
      this.state.representationSet.mimeType,
      this.state.representationSet.codecs,
      this.state.representationSet.sar,
      this.state.representationSet.bandwidth,
      this.state.representationSet.timescale,
      this.state.representationSet.duration,
      this.state.representationSet.SegmentURL
    );
    var manifest = js2XMLparser.parse("MPD", xml);
    return manifest;
  }

  render() {
    return (
      <main>
        <Box align="center" justify="center" className="cites-box">
          {this.state.isLoading ? (
            <Spinning size="large" />
          ) : (
            <div>
              <Headline align="center">{this.state.media.title}</Headline>
              <Player manifest={this.state.manifest} />
            </div>
          )}
        </Box>
      </main>
    );
  }
}

Home.propTypes = {
  accounts: PropTypes.object,
  manifest: PropTypes.string
};

Home.contextTypes = {
  drizzle: PropTypes.object
};

export default Home;

function report(event, data) {
  console.log(event + ": " + JSON.stringify(data, 0, 2));
}
