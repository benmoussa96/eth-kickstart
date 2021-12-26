import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import factory from '../ethereum/factory'

function Index({ campaigns }) {
    return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Button content="Create campaign" icon="add" floated="right" primary />
                {renderCampaigns(campaigns)}
            </div>
        </Layout>
    )
}

const renderCampaigns = (campaigns) => {
    const items = campaigns.map(address => {
        return {
            header: address,
            description: <a>View Campaign</a>,
            fluid: true
        }
    })

    return <Card.Group items={items} />
}

Index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeplyedCampaigns().call()
    return { campaigns }
}

export default Index
