import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("Shop", function () {
  it("Should get better price", async function () {
    // deploy shop
    const Shop = await ethers.getContractFactory("Shop");
    const shop = await Shop.deploy()
    await shop.deployed();

    // deploy attack
    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy(shop.address);
    await attack.deployed()

    // attack
    const attackTx = await attack.attack(
      {
        gasLimit: 100000
      }
    )
    await attackTx.wait(1)

    // check final price
    const finalPrice = await shop.price()
    expect(finalPrice).to.equal(BigNumber.from(0))

    // check isSold
    const isSold = await shop.isSold()
    expect(isSold).to.equal(true)

  });
});
