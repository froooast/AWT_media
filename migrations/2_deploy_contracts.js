const MediaFactory = artifacts.require("MediaFactory");

module.exports = deployer => {
  deployer.deploy(MediaFactory)
  .then(() => {
    console.log("await deployment of media factory")
    return MediaFactory.deployed()
  })
  /*.then(instance => {
    console.log("Media Factory deployed. Writing Data")
    const promises = [
      instance.createMedia("Puppy-preview.jpg", "Viona's Puppyworld"),
      instance.createPeriod(
        "PT0H0M12.500S",
        "ipfs://QmSnNCfxL7R1ei8Dfk82gsEPykBZjC683iovaxaMxuE1WW/"
      ),
      instance.createAdaptionSet(true, 1280, 720, 24, "16:9", "und"),
      instance.createRepresentationSet(
        "video/mp4",
        "avc1.4d401f",
        "1:1",
        1,
        2412988,
        24000,
        96000,
        [
          "segment_init.mp4",
          "segment_1.m4s",
          "segment_2.m4s",
          "segment_3.m4s",
          "segment_4.m4s"
        ],
        1,
        5
      )
    ]
    return Promise.all(promises)
  }).then(() => console.log("done!"))*/
};
