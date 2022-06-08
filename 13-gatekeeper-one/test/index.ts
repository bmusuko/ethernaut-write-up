import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("Gate Keeper One", function () {
  it("Open", async function () {
    const [_, openerAddress] = await ethers.getSigners();

    // deploy gate keeper
    const GatekeeperOne = await ethers.getContractFactory("GatekeeperOne");
    const gatekeeperOne = await GatekeeperOne.deploy();
    await gatekeeperOne.deployed();

    // deploy open gate one
    const OpenGateOne = await ethers.getContractFactory("OpenGateOne");
    const openGateOne = await OpenGateOne.deploy(gatekeeperOne.address);
    await openGateOne.deployed();

    console.log("OPENER ADDRESS %s", openerAddress.address)

    const open = await openGateOne.connect(openerAddress).open("0x100079C8000079C8")

    await open.wait(1)

    const entrant = await gatekeeperOne.entrant()
    expect(entrant).to.equal(openerAddress.address)

  });
});
