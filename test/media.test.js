const Media = artifacts.require("./MediaFactory.sol");

contract("MediaFactory", async function(accounts) {
  it("can store and retrieve a period data", async function() {
    const instance = await Media.deployed();
    await instance.createMedia("Puppy-preview.jpg", "Viona's Puppyworld");
    await instance.createPeriod(
      "PT0H0M12.500S",
      "ipfs://QmSnNCfxL7R1ei8Dfk82gsEPykBZjC683iovaxaMxuE1WW/"
    );
    await instance.createAdaptionSet(true, 1280, 720, 24, "16:9", "und");
    await instance.createRepresentationSet(
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
    );
  });
});
