import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Router } from '../routes'

function BackButton() {
    const style = {
        // marginTop: 'calc(2rem - 0.142857em)',
        // marginBottom: '1rem',
        marginRight: '15px'
    }

    return (
        <Button icon labelPosition='left' floated='left' onClick={() => Router.back()}>
            <Icon name='left arrow' />
            Back
        </Button>
    )
}

export default BackButton
