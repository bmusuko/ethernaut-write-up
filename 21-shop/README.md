# Challenge
- set price less than 100

# How to solve it
- send different result for the same function call with view modifier
    - we can utilize gasleft to set the condition, since this variable is change all the time
    - we can also used `isSold` from Shop contract

# Takeaway
- Do not trust external contract
- just use library or pure modifier to do calculation only
- save the price in variable first rather than call it multiple times