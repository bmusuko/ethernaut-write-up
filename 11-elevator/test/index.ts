import { expect } from "chai";
import { ethers } from "hardhat";

describe("Elevator", function () {
  it("Attack", async function () {
    // deploy elevator
    const Elevator = await ethers.getContractFactory("Elevator");
    const elevator = await Elevator.deploy();
    await elevator.deployed();

    // deploy attack
    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy(elevator.address);
    await attack.deployed();


    // execute attack
    const attackTx = await attack.attack();
    attackTx.wait(1)

    // assert if elevator top is true
    const top = await elevator.top()
    expect(top).to.equal(true)

  });
});
