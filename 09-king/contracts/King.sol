// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract King {
    address payable king;
    uint256 public prize;
    address payable public owner;

    constructor() public payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        console.log("halo halo mek");
        require(msg.value >= prize || msg.sender == owner);
        console.log("halo halo mek 2");
        king.transfer(msg.value);
        console.log("halo halo mek 3");
        king = msg.sender;
        console.log("king %s", king);
        prize = msg.value;
        console.log("prize %s", prize);
    }

    function _king() public view returns (address payable) {
        return king;
    }
}
