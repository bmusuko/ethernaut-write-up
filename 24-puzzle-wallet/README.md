# Challenge
- Steal all the fund from the dex

# How to solve it
- exploit deletegatecall storage like previous challenge
- call nested multicall two times, to execute double deposit

# Takeaway
- it is really challenging to build the right data array in array function call to the function in low level form
- do not loop over msg.value, because the value will be the same. store it in a variable
