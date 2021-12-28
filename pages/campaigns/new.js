import React, { useState } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import { Router } from '../../routes'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

function CampaignNew() {
    const [minimum, setMinimum] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage('');

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(minimum)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    }

    return (
        <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        placeholder='Minimum Contribution'
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

                <Button type='submit' primary loading={loading}>Create</Button>
            </Form>
        </Layout>
    )
}

export default CampaignNew