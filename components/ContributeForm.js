import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

function ContributeForm() {
    return (
        <Form>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    placeholder='Amount to contribute'
                    label="ether"
                    labelPosition="right"
                // value={minimum}
                // onChange={event => { setMinimum(event.target.value) }}
                />
            </Form.Field>

            <Button primary>Contribute</Button>
        </Form>

    )
}

export default ContributeForm
