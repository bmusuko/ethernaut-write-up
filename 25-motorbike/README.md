# Challenge
- self destruct implementation contract

# How to solve it
- initialized implementation contract directly (without proxy) 
- upgrade it to your own contract that has self destruct 

# Takeaway
- do not leave the implementation contract uninitialized
- UUPS very minimal, even the upgrade logic is in the implementation contract
