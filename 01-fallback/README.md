# Challenge
- Change the owner

# How to solve it
- trigger receive() function in the contract

# Takeaway
- receive() is a fallback function (without msg.data), same as fallback() (with msg.data). use sendTransaction() to trigger this. 