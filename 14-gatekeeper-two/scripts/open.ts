// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // deploy open gate two contract + open
  const OpenGateTwo = await ethers.getContractFactory("OpenGateTwo");
  const openGateTwo = await OpenGateTwo.deploy("0xA73b435dFb6D609Bfe567Aa769FE953e970DD0d0");

  await openGateTwo.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
