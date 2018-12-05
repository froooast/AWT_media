import Media from "./../build/contracts/Media.json";

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [Media],
  // events: {
  //  SimpleStorage: ["StorageSet"]
  //},
  polls: {
    accounts: 1500
  }
};

export default drizzleOptions;
