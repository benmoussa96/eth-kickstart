const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const interface = compiledFactory.abi;
const bytecode = compiledFactory.evm.bytecode.object;

const provider = new HDWalletProvider(
    'right sort interest profit faculty air path grant gloom cost educate multiply',
    'https://rinkeby.infura.io/v3/c2b13c12a98347e7abd7dcce9646a7b9'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying Factory contract with account address:', accounts[0]);

    const result = await new web3.eth.Contract(interface)
        .deploy({
            data: bytecode
        })
        .send({
            gas: '1500000',
            from: accounts[0]
        });

    console.log('Factory address:', result.options.address);
};
deploy();