# NFT-Minting-Discord-Bot
NFT Minting Bot 
The problem statement for our idea is as follows: 
- To make a bot that automatically lazy mints photos as NFT. 
- Choose discord to listen to messages on a specific channel, if the message is an image, then mint it as
an NFT on a blockchain of our choice, then reply with the link to the NFT on the same channel or a specific channel.

# The above implementation has successfully created a discord bot that fetches the images uploaded in the specific discord channel along with it's name and description, and uses the "Pinata" IPFS to upload those images and get the TokenURI. 
For now, the NFT is minted on local Blockchain (Ganache) and returns only the transaction hash which is then returned as a message on that specific discord channel. 
