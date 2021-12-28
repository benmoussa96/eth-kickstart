import React from 'react'

function RequestsIndex({ address }) {
    return (
        <h1>
            Requests for {address}
        </h1>
    )
}

RequestsIndex.getInitialProps = async (props) => {
    const address = props.query.address;
    return { address };
}

export default RequestsIndex
