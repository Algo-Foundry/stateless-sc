# Stateless smart contract assignment

In this assignment, you will be tasked to write a [hashed time lock contract (htlc)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts). You will also need to test this contract by sending transactions to withdraw funds from it.

Essentially, this is a stateless smart contract that only allows accounts to withdraw funds from it if a secret is supplied. This secret is usually given by the creator. The contract creator can also recover the funds from this contract after a certain period of time.

### Stateless contract
Complete the code in `assets/htlc.py` so that this stateless smart contract checks the following,

#### Basic checks
1. `rekey to` and `close remainder to` addresses are not found in the transaction.
2. Transaction is a payment type transaction.
3. Receiver belongs to `acc2` address.

#### Fund withdrawal checks
1. Receiver is `acc2` address.
2. Correct secret supplied. This secret is a base64 encoded sha256 hash of this set of words `secret random set of words here`.

#### Fund recovery check
1. Receiver is `acc1` address.
2. Current block round is past the `timeout` value supplied. For simplicity sake, assume `timeout` value is `current block round + 10`.

### Contract deployment
Complete the code in `scripts/htlc.js` to fund this stateless smart contract. Calculate the timeout value and update the contract's template parameters before deployment. Save the timeout as a checkpoint key value pair for later use.

The contract's template parameters are created via `scripts/withdraw/common.js`. 

To deploy the contract
```
yarn run algob deploy scripts/htlc.js
```

To clear the cache
```
yarn run algob clean
```

### Withdrawal
Complete the code in `scripts/withdraw/withdraw_htlc.js` to perform the withdrawal transaction of 1 Algo from the contract to `acc2`.

Test the following scenarios,
1. Send transaction with a wrong secret.
2. Send transaction with a corret secret.

After which, attempt to send 1 Algo to `acc1`. This transaction should be rejected unless 10 block rounds passed.

To run the withdrawal script
```
yarn run algob run scripts/withdraw/withdraw_htlc.js
```

### Hints
Refer to the following links for documentation,
[Algo Builder API](https://algobuilder.dev/api/algob/index.html)
[Algo Builder Transaction Syntax](https://github.com/scale-it/algo-builder/blob/master/docs/guide/execute-transaction.md)

## Setup instructions

### 1. Install packages
```
yarn install
```

### 2. Update environement variables
1. Copy `.env.example` to `.env`.
2. Update Algorand Sandbox credentials in `.env` file.

### 3. Use .env file
```
source .env
```
