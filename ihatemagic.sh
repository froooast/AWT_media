echo "killing all the services"
screen -S ganache -X kill
screen -S ipfs-daemon -X kill
screen -S local-backend -X kill