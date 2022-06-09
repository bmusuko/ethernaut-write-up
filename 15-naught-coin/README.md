# Challenge
- send erc20 token without `transfer` function

# How to solve it
- use `transferFrom`

# Takeaway
- two ways to transfer erc20 token, `transfer` and `transferFrom`
- before using `transferFrom` you need to approve the allowence first, sender -> executer with amount
- `_burn` is internal function