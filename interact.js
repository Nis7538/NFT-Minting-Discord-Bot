import { pinJSONToIPFS } from './pinata.js';
require('dotenv').config();
const alchemyKey = process.env.ALCHEMY_KEY;
const contractABI = require('./contract-abi.json');
import { ethers } from 'ethers';
const contractAddress = '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(
    `https://eth-mainnet.alchemyapi.io/${alchemyKey}`
);

export const mintNFT = async (url, name, description) => {
    if (url.trim() == '' || name.trim() == '' || description.trim() == '') {
        return {
            success: false,
            status: '❗Please make sure all fields are completed before minting.',
        };
    }

    //make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: 'Something went wrong while uploading your tokenURI.',
        };
    }
    const tokenURI = pinataResponse.pinataUrl;

    let contract = await new web3.eth.Contract(contractABI, contractAddress);

    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: process.env.MINT_ACCOUNT, // must match user's active address.
        data: contract.methods
            .mintNFT(process.env.MINT_ACCOUNT, tokenURI)
            .encodeABI(),
    };

    try {
        const provider = new ethers.providers.JsonRpcProvider(
            'http://127.0.0.1:7545'
        );
        const signer = provider.getSigner();
        const txHash = await signer.sendUncheckedTransaction(
            transactionParameters
        );
        return {
            success: false,
            status: 'Transaction Hash: ' + txHash,
        };
    } catch (error) {
        return {
            success: false,
            status: 'Something went wrong: ' + error.message,
        };
    }
};
