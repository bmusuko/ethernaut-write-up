# Challenge
- prevent the owner to get the money

# How to solve it
- create an infinite loop in receive() to empty the gas and revert the transaction

# Takeaway
- use gas limit if we want to use .call() to prevent this error
- use check, effect, interaction coding pattern 
    - check the condition
    - change the state
    - interact with other contract  