// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const SIMPLE_TOKEN_ADDRESS = "0x381080212f76c39d42ADD8379ba1cD7390055A2F"

  const simpleToken = await ethers.getContractAt("SimpleToken", SIMPLE_TOKEN_ADDRESS);
  const [player] = await ethers.getSigners()

  const selfDestructTx = await simpleToken.destroy(player.address)
  selfDestructTx.wait(4)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
