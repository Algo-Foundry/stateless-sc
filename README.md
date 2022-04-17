# Stateless smart contract assignment

In this assignment, you will be tasked to write stateless smart contracts and use it as a contract account or a delegated signature for an account.

### Contract account
1. Complete the code in `assets/contract_account.py` so that this smart contract checks if the transaction amount is less than 1 Algo and the correct receiver address.
2. Complete the code in `scripts/contract_account.js` so that the smart contract is converted to a contract account. Use this contract account to send 1 Algo to another account.

### Delegated Signature
1. Complete the code in `assets/delegated.py` so that this smart contract checks if the transaction amount is less than 1 Algo and the correct receiver address.
2. Complete the code in `scripts/delegated.js` so that the smart contract becomes the delegated signature of a sender account. Send 1 Algo to another account using this delegated signature.

## Setup instructions

### 1. Install packages
```
yarn install
```

### 2. Update environement variables
1. Copy `.env.example` to `.env`.
2. Update Algorand Sandbox credentials in `.env` file.

### 3. Update `algob.config.js`
1. Update the master account credentials

### 4. Use .env file
```
source .env
```

### 5. Algo Builder deployment commands
```
# Compile smart contracts
yarn run algob compile

# Run all deployment scripts
yarn run algob deploy

# Cleanup artifacts folder
yarn run algob clean

# Run one deployment script
yarn run algob deploy scripts/<filename>
```
