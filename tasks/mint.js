require("@nomicfoundation/hardhat-toolbox");

// Mint Scope
const MINT_SCOPE = scope("mint", "Mint NFTs");

// Mint all NFTs to the specified address
MINT_SCOPE.task("all", "Mint all NFTs to the specified address")
  .addParam("to", "Address to mint NFTs to")
  .addParam("contract", "Contract address of the RadiantRides contract")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const RadiantRides = await hre.ethers.getContractFactory("RadiantRides");
    const radiantRides = RadiantRides.attach(taskArgs.contract);

    const tx = await radiantRides.mintAll(taskArgs.to);
    const txReceipt = await tx.wait(1);
    console.log("NFTs minted to address: ", taskArgs.to);
    console.log("Tx ID: ", txReceipt.hash);
  });

// Mint single NFT
MINT_SCOPE.task("single", "Mint single NFT")
  .addParam("to", "Address to mint NFT to")
  .addParam("contract", "Contract address of the RadiantRides contract")
  .addParam("tokenId", "Token ID to mint")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const RadiantRides = await hre.ethers.getContractFactory("RadiantRides");
    const radiantRides = RadiantRides.attach(taskArgs.contract);

    const tx = await radiantRides.mint(taskArgs.to, taskArgs.tokenId);
    const txReceipt = await tx.wait(1);
    console.log("NFT minted to address: ", taskArgs.to);
    console.log("Tx ID: ", txReceipt.hash);
  });

module.exports = {};
