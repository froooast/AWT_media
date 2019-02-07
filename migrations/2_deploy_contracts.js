const MediaFactory = artifacts.require("MediaFactory");

module.exports = function(deployer) {
  deployer.deploy(MediaFactory);
};

module.exports = async deployer => {
  deployer
    .deploy(MediaFactory)
    .then(() => MediaFactory.deployed())
    .then(instance => {
      instance.createMedia(
        "period0",
        "PT193.680S",
        "PT2.005S",
        "PT5.000S",
        "urn:mpeg:dash:profile:isoff-live:2011",
        "ipfs://QmSTi5L9VC8chZdSKt7sEBNWpi74dVJKawZs8TPoNnhdcu"
      );

      //first AdaptionSet
      instance.addAdaptionSetToMedia(
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        "video/mp4",
        1920,
        1080,
        "30000/1001"
      );

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addRepresentationToAdaptionSet(
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

      instance.addSegmentTemplateToAdationSet(
        90000,
        "$RepresentationID$/Header.m4s",
        "$RepresentationID$/$Number$.m4s",
        1,
        179704,
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        0,
        0
      );

      //second AdaptionSet
      instance.addAdaptionSetToMedia(
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        "audio/mp4",
        0,
        0,
        ""
      );

      instance.addRepresentationToAdaptionSet(
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

      instance.addSegmentTemplateToAdationSet(
        90000,
        "$RepresentationID$/Header.m4s",
        "$RepresentationID$/$Number$.m4s",
        1,
        179704,
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        1,
        0
      );

      instance.addAudioChannelConfiguration(
        "urn:mpeg:dash:23003:3:audio_channel_configuration:2011",
        2,
        "0x09b6db57b3cf77a1c01afbba9cab66dce7ea0b9e1e34bb1455b12c111c84d015",
        1
      );
    });
};
