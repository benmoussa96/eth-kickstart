import React from 'react'
import { Card, Button, Header } from 'semantic-ui-react'
import { Link } from '../routes'
import Layout from '../components/Layout'
import factory from '../ethereum/factory'

function CampaignIndex({ campaigns }) {
    const renderCampaigns = (campaigns) => {
        const items = campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <Header as='h3'>
                Open Campaigns
            </Header>
            <Link route="/campaigns/new">
                <a><Button content="Create campaign" icon="add" floated="right" primary /></a>
            </Link>
            {renderCampaigns(campaigns)}
        </Layout>
    )
}

CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeplyedCampaigns().call()
    return { campaigns }
}

export default CampaignIndex
