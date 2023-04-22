const { ethers } = require("ethers");
const { contractAddress, abi } = require("./constants");
require("dotenv").config();

const claim = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contractRead = new ethers.Contract(contractAddress, abi, provider);
  const contractWrite = new ethers.Contract(contractAddress, abi, wallet);

  const amountARB = await contractRead.claimableTokens(process.env.PUBLIC_KEY);
  // check if the address is eligible for the airdrop
  if (amountARB.toString() == "0") {
    console.log("This address isn't eligible for the Arbitrum airdrop.");
    return;
  }

  try {
    // claim ARB tokens
    const tx = await contractWrite.claim();
    console.log(`Transaction hash: ${tx.hash}`);
    await tx.wait();
    console.log("Airdrop claimed successfully!");
  } catch (error) {
    console.error(error);
  }
};

claim();
