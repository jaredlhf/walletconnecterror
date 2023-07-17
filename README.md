[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11200972&assignment_repo_type=AssignmentRepo)

# Crowdfund Developer Assessment

In this assessment, complete the Dapp to allow users to connect their wallet accounts and donate ALGO to a crowdfunding contract. You will also need to keep track of how much each user has donated and who has the highest donation.

## Stateful smart contracts

### Basic checks for all smart contracts

`rekey to`, `close remainder to`, `asset close to` addresses are not found in the transactions.

### ABI Compliance

All contracts are required to follow [ARC4](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0004.md) standards.

### Crowd Funding Contract

Complete the stateful smart contract `assets/CrowdfundApp.py` which allows only the contract creator to start a crowdfund, and withdraw the donated funds after a certain time. Normal users can then donate to this contract. These are the following features required for each function.

#### Init

1. Prevent double campaign creation.
2. Init the crowdfunding data (title, description, withdrawal unlock time, higest donor).

#### Withdraw

1. Owner only function
2. Enough ALGO balance to conduct asset transfer.
3. Crowdfund campaign must be initialized before calling this function.
4. Unlock time has passed.
5. Transfer ALGO to the owner.

#### Donate

1. Crowdfund campaign must be initialized before calling this function.
2. App call to call the donate function to update local state with donated amount.
3. Transfer donated amount to the contract.
4. Do 2 & 3 in a grouped txn.
5. Keep track of who is the highest donor in global state.
6. Cannot donate after unlocked time has passed.

## Frontend interaction

Complete the necessary codes in the src folder so that end users can do the following,

1. Allow user to successfully donate ALGO for the campaign.
2. Display donated ALGO.
3. Display user's donated ALGO.
4. Allow campaign owners to withdraw campaign donation after crowdfunding period ends.

## Testing

Write test cases to cover the successful contract deployment, as well as negative tests. Testing should be done on `SandNet`.

Your contracts should cover at least the following positive tests.

- Init campaign
- Donate some ALGO and compare with local state
- Donate ALGO with two accounts (one donates more), and see if the highest donor is tracked
- Withdraw donated ALGOs using creator

Your contracts should cover at least the following negative tests.

- Init campaign fails when non-creator calls
- Double campaign creation fails
- Withdrawal fails when non-creator calls
- Withdrawal fails when ALGO balance is insufficient
- Donation fails when not campaign not init
- Donating ALGO fails when transaction is not grouped
- Donating 0 ALGO fails
- Donating ALGO with insufficient ALGO

## Setup instructions

### 1. Bootstrap Algokit

Run `algokit bootstrap`

### 2. Install Packages

Run `yarn install`

### 3. Run virtual env

Run `poetry shell`

### 4. Update environement variables

1. Copy `.env.example` to `.env.local`.
2. Update deployer account credentials in `.env.local` file.

### 5. Compile Contract

1. Run `python assets/CrowdfundApp.py`
2. Copy `contract.json` from `artifacts` directory to `src`

### 6. Deploy

1. Run `yarn tsx scripts/deploy.js`
2. Update `NEXT_PUBLIC_APP_ID` in `.env.local` with `App ID` printed in the console

### 7. Launch Frontend

Run `yarn dev` and navigate to localhost

### 8. Run tests

Run `yarn test` (shortcut to run mocha tests)
