import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'

function Header() {
    const [activeItem, setActiveItem] = useState('crowdcoin')
    return (
        <Menu style={{ marginTop: '20px' }}>
            <Menu.Item
                name='crowdcoin'
                active={activeItem === 'crowdcoin'}
                onClick={event => { setActiveItem('crowdcoin') }}
            >
                Crowdcoin
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item
                    name='campaigns'
                    active={activeItem === 'campaigns'}
                    onClick={event => { setActiveItem('campaigns') }}
                >
                    Campaigns
                </Menu.Item>

                <Menu.Item
                    name='add'
                    active={activeItem === 'add'}
                    onClick={event => { setActiveItem('add') }}
                >
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Header
