export function createXMLManifest(media) {
  const obj = {
    "@": {
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      xmlns: "urn:mpeg:dash:schema:mpd:2011",
      "xmlns:scte35": "http://www.scte.org/schemas/35/2014SCTE35.xsd",
      "xsi:schemaLocation": "urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd",
      profiles: media.profiles,
      type: "static",
      minBufferTime: media.minBufferTime,
      maxSegmentDuration: media.maxSegmentDuration,
      availabilityStartTime: "2016-01-20T21:10:02Z",
      mediaPresentationDuration: media.mediaPresentationDuration
    },

    Period: {
      "@": {
        id: media.periodID
      },
      BaseURL: media.baseURL,
      AdaptationSet: [
        {
          "@": {
            mimeType: media.adaptionSet[0].mimeType,
            segmentAlignment: "true",
            startWithSAP: "1",
            maxWidth: media.adaptionSet[0].maxWidth,
            maxHeight: media.adaptionSet[0].maxHeight,
            maxFrameRate: media.adaptionSet[0].maxFrameRate,
            par: "1:1"
          },
          SegmentTemplate: {
            "@": {
              timescale: media.adaptionSet[0].segmentTemplateSet[0].timescale,
              initialization:
                media.adaptionSet[0].segmentTemplateSet[0].initialization,
              media: media.adaptionSet[0].segmentTemplateSet[0].media,
              startNumber:
                media.adaptionSet[0].segmentTemplateSet[0].startNumber,
              duration: media.adaptionSet[0].segmentTemplateSet[0].duration,
              presentationTimeOffset:
                media.adaptionSet[0].segmentTemplateSet[0]
                  .presentationTimeOffset
            }
          },
          Representation: [
            {
              "@": {
                id: media.adaptionSet[0].representationSet[0].id,
                bandwidth: media.adaptionSet[0].representationSet[0].bandwidth,
                codecs: media.adaptionSet[0].representationSet[0].codecs,
                width: media.adaptionSet[0].representationSet[0].width,
                height: media.adaptionSet[0].representationSet[0].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[1].id,
                bandwidth: media.adaptionSet[0].representationSet[1].bandwidth,
                codecs: media.adaptionSet[0].representationSet[1].codecs,
                width: media.adaptionSet[0].representationSet[1].width,
                height: media.adaptionSet[0].representationSet[1].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[2].id,
                bandwidth: media.adaptionSet[0].representationSet[2].bandwidth,
                codecs: media.adaptionSet[0].representationSet[2].codecs,
                width: media.adaptionSet[0].representationSet[2].width,
                height: media.adaptionSet[0].representationSet[2].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[3].id,
                bandwidth: media.adaptionSet[0].representationSet[3].bandwidth,
                codecs: media.adaptionSet[0].representationSet[3].codecs,
                width: media.adaptionSet[0].representationSet[3].width,
                height: media.adaptionSet[0].representationSet[3].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[4].id,
                bandwidth: media.adaptionSet[0].representationSet[4].bandwidth,
                codecs: media.adaptionSet[0].representationSet[4].codecs,
                width: media.adaptionSet[0].representationSet[4].width,
                height: media.adaptionSet[0].representationSet[4].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[5].id,
                bandwidth: media.adaptionSet[0].representationSet[5].bandwidth,
                codecs: media.adaptionSet[0].representationSet[5].codecs,
                width: media.adaptionSet[0].representationSet[5].width,
                height: media.adaptionSet[0].representationSet[5].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[6].id,
                bandwidth: media.adaptionSet[0].representationSet[6].bandwidth,
                codecs: media.adaptionSet[0].representationSet[6].codecs,
                width: media.adaptionSet[0].representationSet[6].width,
                height: media.adaptionSet[0].representationSet[6].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[7].id,
                bandwidth: media.adaptionSet[0].representationSet[7].bandwidth,
                codecs: media.adaptionSet[0].representationSet[7].codecs,
                width: media.adaptionSet[0].representationSet[7].width,
                height: media.adaptionSet[0].representationSet[7].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            },
            {
              "@": {
                id: media.adaptionSet[0].representationSet[8].id,
                bandwidth: media.adaptionSet[0].representationSet[8].bandwidth,
                codecs: media.adaptionSet[0].representationSet[8].codecs,
                width: media.adaptionSet[0].representationSet[8].width,
                height: media.adaptionSet[0].representationSet[8].height,
                frameRate: "30000/1001",
                sar: "1:1",
                scanType: "progressive"
              }
            }
          ]
        },
        {
          "@": {
            mimeType: media.adaptionSet[1].mimeType,
            segmentAlignment: "true",
            startWithSAP: "1",
            lang: "qaa"
          },
          SegmentTemplate: {
            "@": {
              timescale: "90000",
              initialization: "$RepresentationID$/Header.m4s",
              media: "$RepresentationID$/$Number$.m4s",
              startNumber: "1",
              duration: "179704",
              presentationTimeOffset: "0"
            }
          },
          AudioChannelConfiguration: {
            "@": {
              schemeIdUri:
                "urn:mpeg:dash:23003:3:audio_channel_configuration:2011",
              value: "2"
            }
          },
          Representation: {
            "@": {
              id: "v4_258",
              bandwidth: "130800",
              codecs: "mp4a.40.2",
              audioSamplingRate: "48000"
            }
          }
        }
      ]
    }
  };
  return obj;
}
