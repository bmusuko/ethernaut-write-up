import { expect } from "chai";
import { ethers } from "hardhat";

describe("Gate Keeper Two", function () {
  it("Should Opened", async function () {
    const [_, openerAddress] = await ethers.getSigners();

    // deploy gate keeper
    const GatekeeperTwo = await ethers.getContractFactory("GatekeeperTwo");
    const gatekeeperTwo = await GatekeeperTwo.deploy();
    await gatekeeperTwo.deployed();

    // deploy open gate one
    const OpenGateTwo = await ethers.getContractFactory("OpenGateTwo");
    const openGateTwp = await OpenGateTwo.connect(openerAddress).deploy(gatekeeperTwo.address);
    await openGateTwp.deployed();

    const entrant = await gatekeeperTwo.entrant()
    expect(entrant).to.equal(openerAddress.address)
  });
});
