import { utils } from "web3";

export async function getMediaEvents(MediaFactory, eventName, fromBlock = 0) {
  const events = await MediaFactory.getPastEvents(eventName, { fromBlock });
  return events.map(e => _formatEvent(e));
}

function _formatEvent(mediaEvent) {
  let preHash = "";
  const { blockNumber, event, returnValues } = mediaEvent;
  const {
    mediaHash,
    periodHash,
    adaptionSetHash,
    representationHash
  } = returnValues;
  if (event === "MediaCreated") {
    preHash = mediaHash;
  } else if (event === "PeriodCreated") {
    preHash = periodHash;
  } else if (event === "AdaptionSetCreated") {
    preHash = adaptionSetHash;
  } else if (event === "RepresentationSetCreated") {
    preHash = representationHash;
  } else preHash = null;
  return {
    event,
    blockNumber,
    hash: preHash
  };
}

/**
 * Formats the block number of events to the corresponding UNIX timestamps.
 * @param {object} web3 A web3 instance.
 * @param {Array} events Array of events with blocknumber attribute.
 * @returns {Promise<number[]>} Array of events with UNIX timestamps in ms.
 */
export async function blockNumberToUnix(web3, events) {
  const blocks = await Promise.all(
    events.map(e => web3.eth.getBlock(e.blockNumber, false))
  );
  return events.map((e, i) => ({
    ...e,
    // convert seconds into miliseconds
    timestamp: blocks[i].timestamp * 1000
  }));
}

/**
 * Merges two event arrays. Overwrites an event if a second event with an status change is given.
 * @param {Array} oldEvents Array of current event logs.
 * @param {Array} newEvents Array of new event lgos.
 * @returns Array of merged events where only one event exists per address.
 */
export function mergeMediaEvents(oldEvents, newEvents) {
  const mergedEvents = newEvents.concat(oldEvents);
  return Object.values(
    mergedEvents.reduce((c, { event, blockNumber, hash }) => {
      c[hash] = c[hash] || {
        hash: hash,
        blockNumber: blockNumber,
        event: event
      };
      if (c[hash].blockNumber < blockNumber) {
        c[hash].blockNumber = blockNumber;
        c[hash].event = event;
      }
      return c;
    }, {})
  );
}

/**
 * Merges two event arrays. Overwrites an event if a second event with an status change is given.
 * @param {Array} oldEvents Array of current event logs.
 * @param {Array} newEvents Array of new event lgos.
 * @returns Array of merged events where only one event exists per address.
 */
export function mergePeriodEvents(oldEvents, newEvents) {
  const mergedPeriodEvents = newEvents.concat(oldEvents);

  return Object.values(
    mergedPeriodEvents.reduce((c, { event, blockNumber, periodHash }) => {
      c[periodHash] = c[periodHash] || {
        periodHash: periodHash,
        blockNumber: blockNumber,
        event: event
      };
      if (c[periodHash].blockNumber < blockNumber) {
        c[periodHash].blockNumber = blockNumber;
        c[periodHash].event = event;
      }
      return c;
    }, {})
  );
}

//Daniels Utils
export function parseRawMedia(rawMedia) {
  return {
    preview: rawMedia[0],
    title: rawMedia[1]
  };
}

export function parseRawPeriod(rawPeriod) {
  return {
    duration: rawPeriod[0],
    baseUrl: rawPeriod[1]
  };
}

export function parseRawAdaptionSet(rawAdaptionSet) {
  return {
    segmentAlignment: rawAdaptionSet[0],
    maxWidth: rawAdaptionSet[1],
    maxHeight: rawAdaptionSet[2],
    maxFrameRate: rawAdaptionSet[3],
    par: rawAdaptionSet[4],
    lang: rawAdaptionSet[5]
  };
}

export function parseRawRepresentationSet(rawAdaptionSet) {
  const segments = rawAdaptionSet[6];
  const segmentURL = [];
  for (let i = 0; i < segments.length; i++) {
    segmentURL[i] = utils.hexToUtf8(segments[i]);
  }
  return {
    mimeType: rawAdaptionSet[0],
    codecs: rawAdaptionSet[1],
    sar: rawAdaptionSet[2],
    bandwidth: rawAdaptionSet[3],
    timescale: rawAdaptionSet[4],
    duration: rawAdaptionSet[5],
    SegmentURL: segmentURL
  };
}
