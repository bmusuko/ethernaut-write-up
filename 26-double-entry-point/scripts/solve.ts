// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // crypto vault
  const CRYPTO_VAULT_ADDRESS = "0xC371e30886e57a401895b60f14B4ec755dac9ae9"
  // Forta
  const FORTA_ADDRESS = "0x136bF52190e78f11e944414c3F775D47a39B1017"
  const forta = await ethers.getContractAt("Forta", FORTA_ADDRESS)

  // detection bot
  const DetectionBot = await ethers.getContractFactory("DetectionBot")
  const detectionBot = await DetectionBot.deploy(CRYPTO_VAULT_ADDRESS)
  detectionBot.deployed()

  // set detection bot
  const setDetectionBotTx = await forta.setDetectionBot(detectionBot.address)
  setDetectionBotTx.wait(2)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
