# Challenge
- Prevent contract to change the owner

# How to solve it
- create a contract without fallback / receive function and change the owner to target contract

# Takeaway
- try to use `sent` or `call` to send eth to other contract, because those function provide return value
- we can also use async withdrawal, so withdrawal always in a seperate function. Not in the main function logic
- `sent` and `transfer` use a very little gas. try to use `call` if possible, since it is use whatever the gas limit