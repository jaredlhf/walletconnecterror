# Walletconnect error

## Setup instructions

### 1. Install Packages

Run `yarn install`

### 2. Run virtual env

Run `poetry shell`

### 3. Launch Frontend

Run `yarn dev` and navigate to http://localhost:3000/

### 4. Steps to replicate error

- Clicking `Connect Wallet` on the top right hand corner and connect your Pera wallet
- Enter `0.1` in `Donation Amount` field and click `Donate`
- Go to your Pera mobile app and a transaction popup to sign should be seen

- Repeat the above steps for Defly, with Pera still connected
- transaction to sign should also be seen in Defly mobile app

- Click `Connect Wallet` and `Set Active` Pera wallet
- Enter `0.1` in `Donation Amount` field and click `Donate`
- Go to your Pera mobile app and **no** transaction to sign should be seen

- Do the same for Defly
- transaction to sign should **still** be seen in Defly mobile app

* The above can be repeated by alternating the order Pera and Defly accounts are first connected.
* It seems that the account that is connected first will not be working as expected
