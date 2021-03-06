// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // get coinflip contract
  const coinflip = await ethers.getContractAt("CoinFlip", "0xC96dB99f60e0952Ca0fE5a4C8b25d6a32415DcC1");

  // deploy attack contract
  const Attack = await ethers.getContractFactory("Attack");
  const attack = await Attack.deploy(coinflip.address);
  console.log(`ATTACK deployed`)


  await attack.deployed();
  for (let i = 0; i < 10; i++) {
    const attackTx = await attack.attack();
    attackTx.wait(4)
    console.log(`ATTACK number - ${i + 1}`)
  }
  console.log(`ATTACK finished`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
