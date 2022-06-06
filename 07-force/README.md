# Challenge
- Fill the contract with ether

# How to solve it
- fill your own contract with ether, then self destruct with the target address

# Takeaway
- Do not count on address(this).balance because anyone can change it with self destruct
- use a variable if u want to track balance