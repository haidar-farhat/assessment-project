const { ethers } = require("hardhat");

async function main() {
  const CardMemoryGame = await ethers.getContractFactory("CardMemoryGame");
  const game = await CardMemoryGame.deploy();
  await game.deployed();
  console.log("CardMemoryGame deployed to:", game.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 