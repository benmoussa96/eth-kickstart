import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const factoryAddress = '0x20c8F96A81dc33EAd73708206C5CFea53b377E7e';
const factoryAbi = compiledFactory.abi;

export default new web3.eth.Contract(factoryAbi, factoryAddress);