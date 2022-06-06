# Challenge
- Change owner

# How to solve it
- deploy smart contract that relay the request to the actual smart contract

# Takeaway
- msg.sender != tx.origin
- msg.sender is a direct sender (could be EOA or smart contract)
- tx.origin is EOA that trigger the request (could be a bad actor)