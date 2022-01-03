import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Message, Header, Popup, Grid } from 'semantic-ui-react'
import { Router } from '../../routes'
import Layout from '../../components/Layout'
import BackButton from '../../components/BackButton'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

function CampaignNew() {
    const [account, setAccount] = useState('');
    const [minimum, setMinimum] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    useEffect(async () => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setLoadingMessage('Waiting for you to confirm the transaction');
        setErrorMessage('');

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(minimum)
                .send({
                    from: accounts[0]
                })
                .on('transactionHash', () => { setLoadingMessage('Processing the transaction, it won\'t take long') })
                .on('receipt', () => { setLoadingMessage('Transaction receipt received') })
                .on('confirmation', () => { setLoadingMessage('Transaction confirmed :)') });

            Router.pushRoute('/');
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
        setLoadingMessage('');
    }

    return (
        <Layout>
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column width="2">
                        <BackButton />
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h3'>
                            Create a Campaign
                            <Header.Subheader>
                                Connected as <span style={{ fontWeight: 'bold' }}>{account}</span>
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Form onSubmit={onSubmit} error={!!errorMessage}>
                            <Form.Field>
                                <label>Minimum Contribution</label>
                                <Input
                                    label="wei"
                                    labelPosition="right"
                                    value={minimum}
                                    onChange={event => { setMinimum(event.target.value) }}
                                />
                            </Form.Field>

                            <Message
                                error
                                header="Oops!"
                                content={errorMessage}
                            />

                            <Popup
                                position='right center'
                                content={loadingMessage}
                                disabled={!loading}
                                trigger={<Button type="submit" primary loading={loading}>Create</Button>}
                                wide
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout >
    )
}

export default CampaignNew
