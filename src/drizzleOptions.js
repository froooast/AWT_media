import MediaFactory from "./../build/contracts/MediaFactory.json";

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [MediaFactory],
  events: {
    MediaFactory: ["MediaCreated", "PeriodCreated", "AdaptionSetCreated"]
  },
  polls: {
    accounts: 1500
  }
};

export default drizzleOptions;
