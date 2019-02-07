const Media = artifacts.require("./MediaFactory.sol");

contract("MediaFactory", async function(accounts) {
  it("can store and retrieve a period data", async function() {
    let i=0
    const instance = await Media.deployed();
    await instance.createMedia(
        "period0",
        "PT193.680S",
        "PT2.005S",
        "PT5.000S",
        "urn:mpeg:dash:profile:isoff-live:2011",
        "ipfs://QmSTi5L9VC8chZdSKt7sEBNWpi74dVJKawZs8TPoNnhdcu"
      );
      console.log("done", i++)

      //first AdaptionSet
      await instance.addAdaptionSetToMedia(
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        "video/mp4",
        1920,
        1080,
        "30000/1001"
      );
      console.log("done", i++)

      await instance.addRepresentationToAdaptionSet(
        "v1_257",
        1200000,
        "avc1.4D401E",
        768,
        432,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v2_257",
        1850000,
        "avc1.4D401E",
        1024,
        576,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v3_257",
        2850000,
        "avc1.4D401E",
        1280,
        720,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v4_257",
        200000,
        "avc1.4D401E",
        320,
        180,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v5_257",
        300000,
        "avc1.4D401E",
        320,
        180,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v6_257",
        4300000,
        "avc1.4D401E",
        1280,
        720,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v7_257",
        5300000,
        "avc1.4D401E",
        1920,
        1080,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v8_257",
        480000,
        "avc1.4D401E",
        512,
        288,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v9_257",
        750000,
        "avc1.4D401E",
        640,
        340,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        ""
      );

      console.log("done", i++)
      await instance.addSegmentTemplateToAdationSet(
        90000,
        "$RepresentationID$/Header.m4s",
        "$RepresentationID$/$Number$.m4s",
        1,
        179704,
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        0
      );

      console.log("done", i++)
      //second AdaptionSet
      await instance.addAdaptionSetToMedia(
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        "audio/mp4",
        0,
        0,
        ""
      );

      console.log("done", i++)
      await instance.addRepresentationToAdaptionSet(
        "v4_258",
        130800,
        "mp4a.40.2",
        0,
        0,
        "30000/1001",
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        1,
        "48000"
      );

      console.log("done", i++)
      await instance.addSegmentTemplateToAdationSet(
        90000,
        "$RepresentationID$/Header.m4s",
        "$RepresentationID$/$Number$.m4s",
        1,
        179704,
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        1,
        0
      );

      console.log("done", i++)
      await instance.addAudioChannelConfiguration(
        "urn:mpeg:dash:23003:3:audio_channel_configuration:2011",
        2,
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        1
      );

      console.log("done", i++)
  });
});
