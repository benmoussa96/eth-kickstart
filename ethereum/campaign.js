import web3 from './web3';
import compiledCampaign from './build/Campaign.json';

export default (campaignAddress) => {
    return new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
}