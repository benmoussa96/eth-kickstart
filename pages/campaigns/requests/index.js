import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'

function RequestsIndex({ campaignAddress, requests, requestsCount }) {
    return (
        <Layout>
            <Header as='h3'>
                Requests ({requestsCount})
                <Header.Subheader>
                    <Link route={`/campaigns/${campaignAddress}`}>
                        <a>
                            {campaignAddress}
                        </a>
                    </Link>
                </Header.Subheader>
            </Header>
            <Link route={`/campaigns/${campaignAddress}/requests/new`}>
                <a>
                    <Button primary>Create Request</Button>
                </a>
            </Link>
        </Layout>
    )
}

RequestsIndex.getInitialProps = async (props) => {
    const campaignAddress = props.query.address;
    const campaign = Campaign(campaignAddress);
    const requestsCount = await campaign.methods.requestsCount().call();
    const requests = await Promise.all(
        Array(requestsCount).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );

    return { campaignAddress, requests, requestsCount };
}

export default RequestsIndex
