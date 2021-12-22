import React, { useState, useEffect } from 'react';
import factory from '../ethereum/factory';

export default () => {
    useEffect(async () => {
        const campaigns = await factory.methods.getDeplyedCampaigns().call();
        console.log(campaigns);
    });

    return (
        <h1>Index pute</h1>
    );
}