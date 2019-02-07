export const obj = {
  "@": {
    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
    xmlns: "urn:mpeg:dash:schema:mpd:2011",
    "xmlns:scte35": "http://www.scte.org/schemas/35/2014SCTE35.xsd",
    "xsi:schemaLocation": "urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd",
    profiles: "urn:mpeg:dash:profile:isoff-live:2011",
    type: "static",
    minBufferTime: "PT5.000S",
    maxSegmentDuration: "PT2.005S",
    availabilityStartTime: "2016-01-20T21:10:02Z",
    mediaPresentationDuration: "PT193.680S"
  },
  Period: {
    "@": {
      id: "period0"
    },
    BaseURL: "ipfs://QmSTi5L9VC8chZdSKt7sEBNWpi74dVJKawZs8TPoNnhdcu",
    AdaptationSet: [
      {
        "@": {
          mimeType: "video/mp4",
          segmentAlignment: "true",
          startWithSAP: "1",
          maxWidth: "1920",
          maxHeight: "1080",
          maxFrameRate: "30000/1001",
          par: "1:1"
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
        Representation: [
          {
            "@": {
              id: "v1_257",
              bandwidth: "1200000",
              codecs: "avc1.4D401E",
              width: "768",
              height: "432",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v2_257",
              bandwidth: "1850000",
              codecs: "avc1.4D401E",
              width: "1024",
              height: "576",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v3_257",
              bandwidth: "2850000",
              codecs: "avc1.4D401E",
              width: "1280",
              height: "720",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v4_257",
              bandwidth: "200000",
              codecs: "avc1.4D401E",
              width: "320",
              height: "180",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v5_257",
              bandwidth: "300000",
              codecs: "avc1.4D401E",
              width: "320",
              height: "180",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v6_257",
              bandwidth: "4300000",
              codecs: "avc1.4D401E",
              width: "1280",
              height: "720",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v7_257",
              bandwidth: "5300000",
              codecs: "avc1.4D401E",
              width: "1920",
              height: "1080",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v8_257",
              bandwidth: "480000",
              codecs: "avc1.4D401E",
              width: "512",
              height: "288",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          },
          {
            "@": {
              id: "v9_257",
              bandwidth: "750000",
              codecs: "avc1.4D401E",
              width: "640",
              height: "360",
              frameRate: "30000/1001",
              sar: "1:1",
              scanType: "progressive"
            }
          }
        ]
      },
      {
        "@": {
          mimeType: "audio/mp4",
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
/*
export function createXML(
  mediaTitle,
  duration,
  baseUrl,
  segmentAlignment,
  maxWidth,
  maxHeight,
  maxFrameRate,
  par,
  lang,
  mimeType,
  codecs,
  sar,
  bandwidth,
  timescale,
  representationDuration,
  SegmentURL
) {
  var obj = {
    "@": {
      xmlns: "urn:mpeg:dash:schema:mpd:2011",
      minBufferTime: "PT1.500S",
      type: "static",
      mediaPresentationDuration: "PT0H0M12.500S",
      maxSegmentDuration: "PT0H0M4.000S",
      profiles: "urn:mpeg:dash:profile:full:2011"
    },
    Period: {
      "@": {
        duration: duration
      },
      BaseURL: baseUrl,
      AdaptationSet: {
        "@": {
          segmentAlignment: segmentAlignment,
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          maxFrameRate: maxFrameRate,
          par: par,
          lang: lang
        },
        Representation: {
          "@": {
            id: "1",
            mimeType: mimeType,
            codecs: codecs,
            width: "1280",
            height: "720",
            frameRate: "24",
            sar: sar,
            startWithSAP: "1",
            bandwidth: bandwidth
          },
          SegmentList: {
            "@": {
              timescale: timescale,
              duration: representationDuration
            },
            Initialization: {
              "@": {
                sourceURL: SegmentURL[0]
              }
            },
            SegmentURL: [
              {
                "@": {
                  media: SegmentURL[1]
                }
              },
              {
                "@": {
                  media: SegmentURL[2]
                }
              },
              {
                "@": {
                  media: SegmentURL[3]
                }
              },
              {
                "@": {
                  media: SegmentURL[4]
                }
              }
            ]
          }
        }
      }
    }
  };
  return obj;
}
*/
export function createXMLManifest(media) {
  var obj = {
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
          /*
          SegmentTemplate: {
            "@": {
              timescale: media.adaptionSet[1].segmentTemplateSet[0].timescale,
              initialization:
                media.adaptionSet[1].segmentTemplateSet[0].initialization,
              media: media.adaptionSet[1].segmentTemplateSet[0].media,
              startNumber:
                media.adaptionSet[1].segmentTemplateSet[0].startNumber,
              duration: media.adaptionSet[1].segmentTemplateSet[0].duration,
              presentationTimeOffset:
                media.adaptionSet[1].segmentTemplateSet[0]
                  .presentationTimeOffset
            }
          },
          AudioChannelConfiguration: {
            "@": {
              schemeIdUri:
                media.adaptionSet[1].audioChannelConfigurationSet[0]
                  .schemeIdUri,
              value: media.adaptionSet[1].audioChannelConfigurationSet[0].value
            }
          },
          
          Representation: {
            "@": {
              id: media.adaptionSet[1].representationSet[0].id,
              bandwidth: media.adaptionSet[1].representationSet[0].bandwidth,
              codecs: media.adaptionSet[1].representationSet[0].codecs,
              audioSamplingRate:
                media.adaptionSet[1].representationSet[0].audioSamplingRate
            }
          }*/
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
