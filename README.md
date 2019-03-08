# Media on Blockchain - DApp

This is a Proof of Concept application for bringing blockchain guarantees to MPEG-DASH adaptive media streaming. An MPEG-Dash video consists of a manifest file and individual video segements. In this application, the manifest file is stored in a smart contract, the individual video segments on IPFS. 

## Demo
The demo is deployed to IPFS and the public rinkeby testnet. Using the demo:
1. Installed the Browser-Addon Metamask
2. Visit https://bit.ly/2GtQd21
3. Switch to the Rinkeby Network in Metamask

IPFS (especially the local browser node) is alpha software. Fetching the initial website or the video files can be very slow and crash sometimes. In general, the application is very brittle, if it doesn't work please contact us.

## Architecture

![Architecture](/demo/architecture.png)

In this repo you find the following components:
1. The Manifest Storage Smart Contract is available [here](contracts/MediaFactory.sol).
2. It is filled with data when it is published to the blockchain (migrated). The respective code is in /migrations/2_deploy_contracts.js
3. The Frontend is a React application and uses Shaka Player. It connects to the Blockchain through Web3, which is provided by MetaMask. The frontend uses drizzle, a framework which provides a higher level API and state management when communicating with smart contracts.
4. The ManifestParser component can be found under /src/util/parser.js
5. The Manifest Provider can be found under /src/util/localManifestProvider.js
6. The Virtual IPFS Gateway can be found under /src/util/virtualIPFSGateway.js
7. Shake Player is wrapped in a react componetn under /src/components/player/Player.js

## Requirements

- NodeJS 5.0+ recommended
- Windows, Linux or MacOS X

## Installation

1. Install Truffle and Ganache CLI globally

```
npm install -g truffle
npm install -g ganache-cli
```

2. Clone repository and move into directory

```
git clone https://github.com/cites-on-blocks/cites-on-blocks_dapp
cd cites-on-blocks_dapp
```

3. Install dependencies

```
npm install
```

## Start DApp

1. Run the development blockchain. Passing in a blocktime is recommended to test things like loading indicators, etc.

```
ganache-cli -b 3
```

2. Compile and migrate contracts to development blockchain

```
// if outside truffle console
truffle compile
truffle migrate

// if inside truffle console
compile
migrate
```

3. Run the front-end webpack server with hot reloading. Serves front-end on http://localhost:3000

```
npm run start
```

## Testing

1. Test smart contracts

```
// if outside truffle console
truffle test

// if inside truffle console
test
```

2. Test React components using Jest

```
npm run test
```

## Build

1. Build application for producation in build_webpack folder

```
npm run build
```