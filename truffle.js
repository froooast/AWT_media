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
      host: "127.0.0.1",
      from: "0x86aFd5c660FD950200ba47a91921e8FB3d642193",
      port: 8545,   // Different than the default below
      gas: 100000
    }
  }, 
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
