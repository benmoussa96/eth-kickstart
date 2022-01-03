import React, { useState, useEffect } from 'react'
import { Card, Button, Header, Grid } from 'semantic-ui-react'
import { Link } from '../routes'
import Layout from '../components/Layout'
import factory from '../ethereum/factory'
import web3 from '../ethereum/web3'

function CampaignIndex({ campaigns }) {
    const [account, setAccount] = useState('');

    useEffect(async () => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    });

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
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h3'>
                            Open Campaigns
                            <Header.Subheader>
                                Connected as <span style={{ fontWeight: 'bold' }}>{account}</span>
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Link route="/campaigns/new">
                            <a><Button content="Create campaign" icon="add" floated="right" primary /></a>
                        </Link>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {renderCampaigns(campaigns)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeplyedCampaigns().call()
    return { campaigns }
}

export default CampaignIndex
