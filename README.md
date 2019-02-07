# Media on Blockchain - DApp

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

## If you are sick of typing

```
npm run magic
```
And once your done
```
./ihatemagic.sh
```
Requires bash and screen. 

## Deploying contracts to rinkeby
1. Install geth and 
1. Start local ethereum client
```
geth --rinkeby --rpc --rpcapi db,eth,net,web3,personal --unlock="0x86aFd5c660FD950200ba47a91921e8FB3d642193"
```
2. Wait for it to sync.
3. Run migrations
```
truffle migrate --network rinkeby
```