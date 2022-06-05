// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // get instance contract
  const instance = await ethers.getContractAt("Instance", "0x3881184d74B3d59714C34f3A95911864f0905845");

  // get password
  const password = await instance.password();

  // authenticate
  const solveTx = await instance.authenticate(password);
  solveTx.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
