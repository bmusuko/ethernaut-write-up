# Challenge
- change the owner

# How to solve it
- create dummy contract that replace the third variable slot to the owner address 

# Takeaway
- delegate contract target will replace the origin storage based on the variable slot order (not name)
- use library keyword to prevent state modification / access