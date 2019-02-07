export async function getMediaEvents(MediaFactory, eventName, fromBlock = 0) {
  const events = await MediaFactory.getPastEvents(eventName, { fromBlock });
  return events.map(e => _formatEvent(e));
}

function _formatEvent(mediaEvent) {
  const { blockNumber, event, returnValues } = mediaEvent;
  const { mediaHash } = returnValues;

  return {
    event,
    blockNumber,
    hash: mediaHash
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
    periodID: rawMedia[0],
    mediaPresentationDuration: rawMedia[1],
    maxSegmentDuration: rawMedia[2],
    minBufferTime: rawMedia[3],
    profiles: rawMedia[4],
    baseURL: rawMedia[5],
    numAdaptionSets: rawMedia[6],
    adaptionSet: []
  };
}

export function parseRawAdaptionSet(rawAdaptionSet) {
  if (rawAdaptionSet[0] === "video/mp4") {
    return {
      mimeType: rawAdaptionSet[0],
      maxWidth: rawAdaptionSet[1],
      maxHeight: rawAdaptionSet[2],
      maxFrameRate: rawAdaptionSet[3],
      numRepresentation: rawAdaptionSet[4],
      mediaHash: rawAdaptionSet[5],
      numAdaptionSet: rawAdaptionSet[6],
      representationSet: [],
      segmentTemplateSet: [],
      audioChannelConfigurationSet: []
    };
  } else {
    return {
      mimeType: rawAdaptionSet[0],
      numRepresentation: rawAdaptionSet[4],
      mediaHash: rawAdaptionSet[5],
      numAdaptionSet: rawAdaptionSet[6],
      representationSet: [],
      segmentTemplateSet: [],
      audioChannelConfigurationSet: []
    };
  }
}

export function parseRawRepresentation(rawRepresentation) {
  if (rawRepresentation[2] === "mp4a.40.2") {
    return {
      id: rawRepresentation[0],
      bandwidth: rawRepresentation[1],
      codecs: rawRepresentation[2],
      audioSamplingRate: rawRepresentation[5]
    };
  } else
    return {
      id: rawRepresentation[0],
      bandwidth: rawRepresentation[1],
      codecs: rawRepresentation[2],
      width: rawRepresentation[3],
      height: rawRepresentation[4]
    };
}

export function parseRawSegmentTemplate(rawSegmentTemplate) {
  return {
    timescale: rawSegmentTemplate[0],
    initialization: rawSegmentTemplate[1],
    media: rawSegmentTemplate[2],
    startNumber: rawSegmentTemplate[3],
    duration: rawSegmentTemplate[4],
    presentationTimeOffset: rawSegmentTemplate[5]
  };
}

export function parseRawAudioChannelConfiguration(
  rawAudioChannelConfiguration
) {
  return {
    schemeIdUri: rawAudioChannelConfiguration[0],
    value: rawAudioChannelConfiguration[1]
  };
}
