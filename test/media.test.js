const Media = artifacts.require("./Media.sol");
const PeriodConnector = require("../util/connectors/period.js")
const sampleData = {
    periods: [{
        duration: "PT0H0M12.500S",
        baseUrl: "https://s3-eu-west-1.amazonaws.com/blockchain-puppies/test1/",
        adaptionSets: [{
            segmentAlignment: true,
            maxWidth: 1280,
            maxHeight: 720,
            maxFrameRate: 24,
            par: "16:9",
            lang: "und",
            representations: [
                `<Representation id="1" mimeType="video/mp4" codecs="avc1.4d401f" width="1280" height="720" frameRate="24" sar="1:1" startWithSAP="1" bandwidth="2412988">
                <SegmentList timescale="24000" duration="96000">
                 <Initialization sourceURL="segment_init.mp4"/>
                 <SegmentURL media="segment_1.m4s"/>
                 <SegmentURL media="segment_2.m4s"/>
                 <SegmentURL media="segment_3.m4s"/>
                 <SegmentURL media="segment_4.m4s"/>
                </SegmentList>
               </Representation>`
            ]
        }]
    }]
}


contract('Media', function(accounts) {
  it("can store and retrieve a period data", async function() {
    const contract = await Media.deployed()
    const period = PeriodConnector(contract);

    await period.add(sampleData.periods[0])
    const periods = await period.getAll()
    assert.deepStrictEqual(sampleData.periods, periods, "the stored data should equal the initial data");
  });
});
