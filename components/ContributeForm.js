import React, { useState } from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

function ContributeForm({ address }) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage('');

        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${address}`);
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={value}
                    onChange={event => { setValue(event.target.value) }}
                />
            </Form.Field>

            <Message
                error
                header="Oops!"
                content={errorMessage}
            />

            <Button type="submit" primary loading={loading}>Contribute</Button>
        </Form>

    )
}

export default ContributeForm
