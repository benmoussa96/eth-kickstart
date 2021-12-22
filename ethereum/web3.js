import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // We are in the browser and metamask is running
    web3 = new Web3(window.ethereum);
} else {
    // We are in the server OR metamask is not running
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/c2b13c12a98347e7abd7dcce9646a7b9'
    );
    web3 = new Web3(provider);
}

export default web3;