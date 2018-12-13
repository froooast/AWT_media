export const obj = {
  "@": {
    xmlns: "urn:mpeg:dash:schema:mpd:2011",
    minBufferTime: "PT1.500S",
    type: "static",
    mediaPresentationDuration: "PT0H0M12.500S",
    maxSegmentDuration: "PT0H0M4.000S",
    profiles: "urn:mpeg:dash:profile:full:2011"
  },
  ProgramInformation: {
    Title: "Puppy"
  },
  Period: {
    "@": {
      duration: "PT0H0M12.500S"
    },
    BaseURL: "http://localhost:4545/segment/QmSnNCfxL7R1ei8Dfk82gsEPykBZjC683iovaxaMxuE1WW/",
    AdaptationSet: {
      "@": {
        segmentAlignment: "true",
        maxWidth: "1280",
        maxHeight: "720",
        maxFrameRate: "24",
        par: "16:9",
        lang: "und"
      },
      Representation: {
        "@": {
          id: "1",
          mimeType: "video/mp4",
          codecs: "avc1.4d401f",
          width: "1280",
          height: "720",
          frameRate: "24",
          sar: "1:1",
          startWithSAP: "1",
          bandwidth: "2412988"
        },
        SegmentList: {
          "@": {
            timescale: "24000",
            duration: "96000"
          },
          Initialization: {
            "@": {
              sourceURL: "segment_init.mp4"
            }
          },
          SegmentURL: [
            {
              "@": {
                media: "segment_1.m4s"
              }
            },
            {
              "@": {
                media: "segment_2.m4s"
              }
            },
            {
              "@": {
                media: "segment_3.m4s"
              }
            },
            {
              "@": {
                media: "segment_4.m4s"
              }
            }
          ]
        }
      }
    }
  }
};

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
    ProgramInformation: {
      Title: mediaTitle
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
              },
            ]
          }
        }
      }
    }
  };
  return obj;
}
