import React from 'react'
import { Header, Button, Table, Grid } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'
import BackButton from '../../../components/BackButton'

function RequestsIndex({ campaignAddress, requests, requestsCount, approversCount }) {
    const renderRows = () => {
        return requests.map((request, index) => {
            return <RequestRow key={index} id={index} request={request} address={campaignAddress} approversCount={approversCount} />
        })
    }

    const { Header: TableHeader, HeaderCell, Row, Body } = Table;
    return (
        <Layout>
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column width="2">
                        <BackButton />
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h3'>
                            Requests
                            <Header.Subheader>
                                <Link route={`/campaigns/${campaignAddress}`}>
                                    <a>
                                        {campaignAddress}
                                    </a>
                                </Link>
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Link route={`/campaigns/${campaignAddress}/requests/new`}>
                            <a><Button content="Create Request" icon="add" floated="right" primary style={{ marginBottom: '20px' }} /></a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table>
                            <TableHeader>
                                <Row>
                                    <HeaderCell>ID</HeaderCell>
                                    <HeaderCell>Description</HeaderCell>
                                    <HeaderCell>Amount</HeaderCell>
                                    <HeaderCell>Recepient</HeaderCell>
                                    <HeaderCell>Approvals</HeaderCell>
                                    <HeaderCell></HeaderCell>
                                    <HeaderCell></HeaderCell>
                                </Row>
                            </TableHeader>
                            <Body>
                                {renderRows()}
                            </Body>
                        </Table>
                        <div>Found {requestsCount} requests.</div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

RequestsIndex.getInitialProps = async (props) => {
    const campaignAddress = props.query.address;

    const campaign = Campaign(campaignAddress);

    const requestsCount = await campaign.methods.requestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestsCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );

    return { campaignAddress, requests, requestsCount, approversCount };
}

export default RequestsIndex
