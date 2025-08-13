import React from 'react'
import PageTitle from '../../components/PageTitle'
import { Tabs } from 'antd'

function Admin() {
    return (
        <div>
            <PageTitle title="Admin" />
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Movies" key="1">
                    Movies
                </Tabs.TabPane>
                <Tabs.TabPane tab="Theatres" key="2">
                    Theatres
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin