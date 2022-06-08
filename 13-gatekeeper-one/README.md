# Challenge
- pass all the gates

# How to solve it
- send attack with smart contract 
- control the gas (smart brute force using stolen code from github) 
- send a proper key (learn casting)

# Takeaway
- if we cast to smaller uint, it will take the last bytes. Unlike if we cast to smaller bytes, it will take the first bytes
- gasleft() variable to check gas left
- we can only smart between uint and bytes, if the size is the same