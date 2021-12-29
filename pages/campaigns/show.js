import React from 'react'
import { Card, Grid, Button, Header } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import ContributeForm from '../../components/ContributeForm'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import { Link } from '../../routes'

function CampaignhSow({ campaignAddress, minimumContribution, balance, requestsCount, approversCount, manager }) {
    const renderSummary = () => {
        const items = [
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description: 'The balance is how much money this campaign has to spend.',
                meta: 'Campaign balance (ether)'
            },
            {
                header: minimumContribution,
                description: 'You must contribute this much wei to become an approver.',
                meta: 'Minimum contribution (wei)'
            },
            {
                header: requestsCount,
                description: 'A request is for withdrawing money from the campaign. Requests must be approved by approvers.',
                meta: 'Number of requests'
            },
            {
                header: approversCount,
                description: 'Number of people who havev contributed to this campaign.',
                meta: 'Number of approvers'
            },
            {
                header: manager,
                description: 'The manager created this campaign and can create requests to withdraw money.',
                meta: 'Address of the manager',
                style: { overflowWrap: 'break-word' }
            }
        ]

        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <Header as='h3'>
                Campaign Summary
                <Header.Subheader>
                    <Link route={`/campaigns/${campaignAddress}`}>
                        <a>
                            {campaignAddress}
                        </a>
                    </Link>
                </Header.Subheader>
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        {renderSummary()}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <ContributeForm address={campaignAddress} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${campaignAddress}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

CampaignhSow.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        campaignAddress: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
}

export default CampaignhSow
