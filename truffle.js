const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = process.env.mnemonic
console.log(mnemonic)
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      network_id: 4,
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/e99f3fcc570c4ce78e4250395ea8ba6a")
      },
      //gas: 400000,
      //from: "0x780586164CA6850570708426BEdd9C7496F75553"
    }
  }, 
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
