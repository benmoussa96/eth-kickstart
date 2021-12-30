import React, { useState } from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

function RequestRow({ id, request, address, approversCount }) {
    const [approveLoading, setApproveLoading] = useState(false);
    const [finalizeLoading, setFinalizeLoading] = useState(false);
    const isReadyToFinalize = request.approvalCount > (approversCount / 2);

    const onApprove = async () => {
        setApproveLoading(true);

        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(address);

            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            });
            Router.replaceRoute(`/campaigns/${address}/requests`);
        } catch (err) {

        }

        setApproveLoading(false);
    }

    const onFinalize = async () => {
        setFinalizeLoading(true);

        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(address);

            await campaign.methods.finalizeRequest(id).send({
                from: accounts[0]
            });
            Router.replaceRoute(`/campaigns/${address}/requests`);
        } catch (err) {

        }

        setFinalizeLoading(false);
    }

    const { Row, Cell } = Table;
    return (
        <Row disabled={request.complete} positive={isReadyToFinalize && !request.complete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')} ETH</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount} / {approversCount}</Cell>
            <Cell>
                {request.complete ? null : (
                    <Button color="green" basic onClick={onApprove} loading={approveLoading}>Approve</Button>
                )}
            </Cell>
            <Cell>
                {request.complete ? null : (
                    <Button color="teal" basic onClick={onFinalize} loading={finalizeLoading}>Finalize</Button>
                )}
            </Cell>
        </Row>
    )
}

export default RequestRow
