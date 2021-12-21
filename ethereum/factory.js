import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const address = '0xA12225B70Da5fC481622CF5CA129e6b7be414810';
const interface = compiledFactory.abi

export default new web3.eth.Contract(interface, address);