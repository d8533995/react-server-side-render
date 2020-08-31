import React from 'react'
import { Tabs } from 'antd'
import qs from 'query-string'
import Performance from './Performance'
import ErrorList from './ErrorList'
import { useHistory, useLocation } from 'react-router'

const { TabPane } = Tabs

export default function Monitor () {
  const history = useHistory()
  const location = useLocation()

  const { activeKey = '1' } = qs.parse(location.search)
  return (
    <div style={{ padding: '0 20px' }}>
      <Tabs
        animated={false}
        activeKey={activeKey}
        onChange={(key) => {
          history.replace(location.pathname + `?activeKey=${key}`)
        }}>
        <TabPane tab="性能" key="1" >
          <Performance />
        </TabPane>
        <TabPane tab="错误" key="2">
          <ErrorList />
        </TabPane>
      </Tabs>
    </div>
  )
}
