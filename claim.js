// Setup: npm install @alch/alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ARB_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const claim = async () => {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
};

claim();
