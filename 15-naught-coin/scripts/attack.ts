// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const naughtCoin = await ethers.getContractAt("NaughtCoin", "0x5fD904e7e40Dc415AD2353AA5D58E41e7F893ED0")
  const AMOUNT = parseEther("1000000")
  const [playerOne, playerTwo] = await ethers.getSigners();

  // approve transaction
  const approveTx = await naughtCoin.connect(playerOne).approve(playerTwo.address, AMOUNT)
  approveTx.wait(4)
  console.log("approved")

  // transferFrom tx
  const transferFrom = await naughtCoin.connect(playerTwo).transferFrom(playerOne.address, playerTwo.address, AMOUNT)
  transferFrom.wait(4)
  console.log("transfered")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
