import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const factoryAddress = '0xA12225B70Da5fC481622CF5CA129e6b7be414810';
const factoryAbi = compiledFactory.abi;

export default new web3.eth.Contract(factoryAbi, factoryAddress);