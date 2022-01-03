import React, { useState } from 'react'
import { Header, Form, Button, Message, Input, Popup, Grid } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import BackButton from '../../../components/BackButton'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'

function RequestNew({ campaignAddress }) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setLoadingMessage('Waiting for you to confirm the transaction');
        setErrorMessage('');

        const campaign = Campaign(campaignAddress);
        try {
            const accounts = await web3.eth.getAccounts();
            const valueInWei = web3.utils.toWei(value, 'ether');
            await campaign.methods
                .createRequest(description, valueInWei, recipient)
                .send({
                    from: accounts[0]
                })
                .on('transactionHash', () => { setLoadingMessage('Processing the transaction, it won\'t take long') })
                .on('receipt', () => { setLoadingMessage('Transaction receipt received') })
                .on('confirmation', () => { setLoadingMessage('Transaction confirmed :)') });

            Router.pushRoute(`/campaigns/${campaignAddress}/requests`);
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
                            Create a Request
                            <Header.Subheader>
                                <Link route={`/campaigns/${campaignAddress}`}>
                                    <a>
                                        {campaignAddress}
                                    </a>
                                </Link>
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Form onSubmit={onSubmit} error={!!errorMessage}>
                            <Form.Field>
                                <label>Description</label>
                                <Input
                                    value={description}
                                    onChange={event => { setDescription(event.target.value) }}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Value</label>
                                <Input
                                    label="ether"
                                    labelPosition="right"
                                    value={value}
                                    onChange={event => { setValue(event.target.value) }}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Recipient</label>
                                <Input
                                    value={recipient}
                                    onChange={event => { setRecipient(event.target.value) }}
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
        </Layout>
    )
}

RequestNew.getInitialProps = async (props) => {
    const campaignAddress = props.query.address;
    return { campaignAddress };
}

export default RequestNew
