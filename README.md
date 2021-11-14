# Shopping Cart Exercise

[![Node.js CI](https://github.com/kdblitz/shopping-cart-nodejs/actions/workflows/node.js.yml/badge.svg)](https://github.com/kdblitz/shopping-cart-nodejs/actions/workflows/node.js.yml)

This repository holds the Shopping Cart model as described on the forwarded specification.

Application has been developed on node v14.8.x under Windows. Additionally, tests have been executed using Github Actions on node 12.x and 16.x, so it should also work as well on those versions.

## Installation

This project will need [NodeJS](https://nodejs.org/en/) to be installed on your machine before code can be executed.

After checking out the code, run this command to install the test dependencies:
```
npm ci
```
This step may be skipped if you don't plan on executing the tests.

## Interactive Mode (CLI)

You may interact with the Shopping Cart model through the command line. In order to access the interface, run the command
```
npm start
```

You'll be greeted with some prompts after executing the command, which you can use to interact with the cart model.

## Executing Tests

The project also includes tests verifying the behavior of the code.

After installing the test dependencies, they may be executed via:

```
npm test
```

## Code Coverage

Assuming test dependencies are installed, coverage reports may also be generated using this command:
```
npm run coverage
```
After running, an html coverage report will be generated inside `coverage/lcov-report` directory.

## Implementation assumptions:
These were the assumptions during the implementation, should there be an corrections, let me know so that they can be adjusted:
- On `cart.add(productCode, promoCode)`, when method is called twice with the optional promoCode parameter, the last value provided will be kept
- Different promos are allowed to stack. For example, the 3 for 2 deal on Unlimited 1GB Sims may be availed along with the promo codes for additional discount.
- Multiple add calls are needed to add multiple products to simplify the method signature.
