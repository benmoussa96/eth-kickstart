# eth-kickstart
Solidity smart contract and Next.js (React) frontend for a decentralized Kickstarter clone using the Ethereum Blockchain.

## Description

This full stack decentralized application was built in context of the Udemy course [Ethereum and Solidity The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/).
* Backend: (eth-kickstart/ethereum)
    Campaign.sol Solidity smart contract compiled with solc and deployed to the Ethereum blockchain with WEB3.
    Tested using mocha and ganache-cli.
* Frontend: (eth-kickstrat/pages)
    Next.js web application to interact with the contract thanks to WEB3.

### Built with

* [npm](https://www.npmjs.com)
* [Solidity](https://github.com/ethereum/solidity)
* [WEB3](https://web3js.readthedocs.io/en/v1.5.2/)
* [Mocha](https://mochajs.org)
* [React](https://reactjs.org)
* [Next.js](https://nextjs.org)
* [Semantics UI](https://semantic-ui.com)

## Getting Started

### Dependencies

* [Metamask](https://metamask.io) extension installed in chrome.

### Installing

1. Clone the repo

   ```sh
   git clone https://github.com/benmoussa96/eth-kickstart.git
   ```
2. Change into repo root directory

    ```
    cd eth-kickstart
    ```
3. Install dependencies

    ```
    npm install
    ```

### Compiling and deploying new contract (optional)

4. Change into ethereum directory

    ```
    cd ethereum
    ```
5. Compile the contract

    ```
    node compile.js
    ```
6. Deploy the contract

    ```
    node deploy.js
    ```
7. Copy the Factory address and paste in `/eth-kickstart/ethereum/factory.js`

![Factory address](https://github.com/benmoussa96/eth-kickstart/blob/master/images/factory.png?raw=true)

### Executing program

8. Change into repo root directory

    ```
    cd ../
    ```
9. Run the Next.js client

    ```
    npm run dev
    ```
10. Go to `localhost:3000`


* List of campaigns
![List of campaigns](https://github.com/benmoussa96/eth-kickstart/blob/master/images/campaigns-list.png?raw=true)

* Summary of a campaign
![Summary of a campaign](https://github.com/benmoussa96/eth-kickstart/blob/master/images/campaign-summary.png?raw=true)

* Requests for a campaign
![Requests for a campaign](https://github.com/benmoussa96/eth-kickstart/blob/master/images/campaign-requests.png?raw=true)

## Authors

* Ghaieth Ben Moussa
    [ghaieth96](https://github.com/benmoussa96)

## Version History

* 0.1
    * Initial Release

## Acknowledgments

* Stephen Grider
    [StephenGrider](https://github.com/StephenGrider)