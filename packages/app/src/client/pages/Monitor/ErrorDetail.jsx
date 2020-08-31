import React, { useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
import gwRequest from '../../utils/request'
import { useParams } from 'react-router'
import { unix } from 'moment'

const { Column } = Table
export default function ErrorList () {
  const [errorList, setErrorList] = useState([])
  const { projectId } = useParams()

  function searchErrorList () {
    const searchParams = new URLSearchParams(window.location.search)
    gwRequest({
      path: `/project/${projectId}/api/error/log/detail`,
      qs: {
        desc: searchParams.get('desc')
      }
    }).then(({ data: { data } }) => {
      setErrorList(data)
    })
  }

  useEffect(() => {
    searchErrorList()
  }, [])

  return (
    <div style={{padding: 20}}>
      <div>
        <div>异常消息</div>
        <h2>{errorList[0]?.desc.split(/\sat\s|@/)[0]}</h2>
        <div>原因</div>
        <h4>{errorList[0]?.desc.split(/\sat\s|@/)[1]}</h4>
      </div>
      <Table
        bordered
        pagination={false}
        rowKey='id'
        dataSource={errorList}
        expandable={{
          expandedRowRender (record) {
            return (
              <div>
                <p>{record.ua}</p>
                <p style={{ whiteSpace: 'pre-line' }}>{record.stack}</p>
              </div>
            )
          }
        }}
      >
        <Column
          title="URL"
          dataIndex="url"
          key="url"
        />
        <Column
        title="错误类型" dataIndex="error_name" key="error_name" />
        <Column
          title="设备信息"
          key="device"
          render={(text, record) =>
            <div>
              {record.device_model && <Tag color='green'>{record.device_model}{record.device_vendor}</Tag>}
              <Tag color='geekblue'>{record.os}{record.os_version}</Tag>
              <Tag color='volcano'>{record.browser}{record.browser_version}</Tag>
            </div>
          }
        />
        <Column
          title="发生时间"
          dataIndex="log_at"
          key="log_at"
          render={(i) => {
            return unix(i).format('YYYY-MM-DD HH:mm')
          }}
        />
      </Table>
    </div>
  )
}
