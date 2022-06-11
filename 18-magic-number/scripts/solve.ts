// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // deploy solver and save the address
  const [signer] = await ethers.getSigners()
  const data = "0x600a600c600039600a6000f3602A60805260206080f3"
  const tx = await signer.sendTransaction({
    from: signer.address,
    data: data
  })
  const txReceipt = await tx.wait(4)


  // change solver address
  const SOLVER_ADDRESS = txReceipt.contractAddress
  const INSTANCE_ADDRESS = "0xf2BFD3724076cE612D0ed9f13cA3dcFB2980A4F8"
  const magicNum = await ethers.getContractAt("MagicNum", INSTANCE_ADDRESS)

  const solveTx = await magicNum.setSolver(SOLVER_ADDRESS)
  solveTx.wait(4)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
