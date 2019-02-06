echo "starting ganache"
screen -S ganache -dm ganache-cli -b 3

echo "truffle compile"
truffle compile

echo "truffle migrate"
truffle migrate

echo "starting ipfs daemon!"
screen -S ipfs-daemon -dm ipfs daemon

echo "adding files to ipfs"
ipfs add -r ipfs/files/puppies

echo "starting frontend"
npm run start

