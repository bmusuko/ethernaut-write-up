# Challenge
- Steal all the fund from the dex

# How to solve it
- There is a flaw in `getSwapPrice`, just keep swap all token from A to B then B to A, until the dex run out of fund

# Takeaway
- use chainlink feed data price to get price feed in a decentralized way
- the correct formula is
```
        return (
            (amount * IERC20(to).balanceOf(address(this))) /
            IERC20(from).balanceOf(address(this)) + amount);
```
- above formula keeps K constant the same
```
    x * y = (x+delta x) * (y - delta y)
```