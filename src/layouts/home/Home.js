import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "../../components/player/Player";
import { Box, Headline } from "grommet";
import Web3 from "web3";
import Spinning from "grommet/components/icons/Spinning";

import js2XMLparser from "js2xmlparser";
import { createXMLManifest } from "../../util/parser";

import {
  parseRawMedia,
  parseRawAdaptionSet,
  parseRawRepresentation,
  parseRawSegmentTemplate,
  parseRawAudioChannelConfiguration,
  mergeMediaEvents,
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
      loadingAdaptionSetDone: false,
      loadingRepresentationSetDone: false,
      loadingSegmentTemplateDone: false,
      loadingaudioChannelConfigurationSetDone: false,
      manifest: null,
      isLoading: true
    };
    this.contracts = context.drizzle.contracts;
    this.web3 = new Web3(this.contracts.MediaFactory.givenProvider);
    const web3 = new Web3(this.contracts.MediaFactory.givenProvider);
    const { abi } = this.contracts.MediaFactory;
    // TODO: if you want to use this in develop change this line!
    const rightAddress = "0x37b4b0b29d52904bf1f7defbbb831bf67adfacb3";
    this.MediaFactory = new web3.eth.Contract(abi, rightAddress);
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
        this.state.loadingAdaptionSetDone &&
        this.state.loadingRepresentationSetDone &&
        this.state.loadingSegmentTemplateDone &&
        this.state.loadingaudioChannelConfigurationSetDone
      ) {
        console.log("received all nescessary data. Building Manifest");
        this.setState({ isLoading: false });

        this.setState({ manifest: this.prepareXML(this.state.media) });
        //const manifest = js2XMLparser.parse("MPD", obj, {
        //   declaration: { encoding: "UTF-8" }
        // });
        //  this.setState({ manifest });
      }
    }
  }

  async getMediaEvents(from = 0) {
    const [createdMedia] = await Promise.all([
      getMediaEvents(this.MediaFactory, "MediaCreated", from)
    ]);

    const events = createdMedia;
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
      const rawMedia = await this.MediaFactory.methods
        .getMedia(event.hash)
        .call();
      const parsedMedia = parseRawMedia(rawMedia);
      this.getAdaptionSet(parsedMedia, event.hash);
      console.log(`Media Period ${event.periodId} found at event ${event.hash}`)
      console.log("fetching manifest raw data...")
      this.setState({
        media: parsedMedia
      });
    }
  }

  async getAdaptionSet(media, hash) {
    var promises = [];
    for (var i = 0; i < media.numAdaptionSets; i++) {
      promises.push(this.MediaFactory.methods.getAdaptionSet(hash, i).call());
    }

    const results = await Promise.all(promises);
    const subPromises = []
    for (const rawAdaptionSet of results) {
      const parsedAdaptionSet = parseRawAdaptionSet(rawAdaptionSet);
      console.log(` - Found AdationSet ${parsedAdaptionSet.mimeType}`)
      this.state.media.adaptionSet.push(parsedAdaptionSet);
      subPromises.push(...[this.getRepresentations(
        parsedAdaptionSet.mediaHash,
        parsedAdaptionSet.numAdaptionSet,
        parsedAdaptionSet.numRepresentation
      ),
      this.getSegmentTemplate(
        parsedAdaptionSet.mediaHash,
        parsedAdaptionSet.numAdaptionSet
      ),
      this.getAudioChannelConfiguration(
        parsedAdaptionSet.mediaHash,
        parsedAdaptionSet.numAdaptionSet
      )])
    }
    await Promise.all(subPromises)
    this.setState({ loadingAdaptionSetDone: true });
  }

  async getRepresentations(mediaHash, numAdaptionSet, numRepresentation) {
    var promises = [];
    for (var i = 0; i < numRepresentation; i++) {
      promises.push(
        this.MediaFactory.methods
          .getRepresentationSet(mediaHash, numAdaptionSet, i)
          .call()
      );
    }
    const results = await Promise.all(promises);
    for (const rawRepresentation of results) {

      const parsedRepresentation = parseRawRepresentation(rawRepresentation);
      console.log(`   - Found Representation ${parsedRepresentation.id}`)
      this.state.media.adaptionSet[numAdaptionSet].representationSet.push(
        parsedRepresentation
      );
    }
    this.setState({ loadingRepresentationSetDone: true });
  }

  async getSegmentTemplate(mediaHash, numAdaptionSet) {
    const rawSegmentTemplate = await this.MediaFactory.methods
      .getSegmentTemplate(mediaHash, numAdaptionSet)
      .call();
    const parsedSegmentTemplate = parseRawSegmentTemplate(rawSegmentTemplate);

    console.log(`   - Found SegmentTemplate ${parsedSegmentTemplate.media} ${parsedSegmentTemplate.initialization}`)
    this.state.media.adaptionSet[numAdaptionSet].segmentTemplateSet.push(
      parsedSegmentTemplate
    );
    this.setState({ loadingSegmentTemplateDone: true });
  }

  async getAudioChannelConfiguration(mediaHash, numAdaptionSet) {
    const rawAudioChannelConfiguration = await this.MediaFactory.methods
      .getAudioChannelConfiguration(mediaHash, numAdaptionSet)
      .call();
    const parsedAudioChannelConfiguration = parseRawAudioChannelConfiguration(
      rawAudioChannelConfiguration
    );
    console.log(`   - Found AudioChannel ${parsedAudioChannelConfiguration.schemeIdUri}`)


    this.state.media.adaptionSet[
      numAdaptionSet
    ].audioChannelConfigurationSet.push(parsedAudioChannelConfiguration);

    this.setState({ loadingaudioChannelConfigurationSetDone: true });
  }

  prepareXML(object) {
    const xml = createXMLManifest(object);
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

