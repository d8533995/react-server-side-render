import React, { useState, useEffect } from 'react'
import { Table, Checkbox, Spin } from 'antd'
import gwRequest from '../../utils/request'
import { useParams } from 'react-router'
import moment from 'moment'
import { Link } from 'react-router-dom'

const { Column } = Table

const JS_TRACKER_ERROR_DISPLAY_MAP = [
  'JS_RUNTIME_ERROR',
  'SCRIPT_LOAD_ERROR',
  'CSS_LOAD_ERROR',
  'IMAGE_LOAD_ERROR',
  'CONSOLE_ERROR',
  'TRY_CATCH_ERROR',
  'PROMISE_ERROR'
]
const TIME_MAP={
  '过去 15 分钟':()=>({
    start:moment().subtract('minutes',15).unix(),
  }),
  '过去 30 分钟':()=>({
    start:moment().subtract('minutes',30).unix(),
  }),
  '过去 1 小时':()=>({
    start:moment().subtract('hours',1).unix(),
  }),
  '过去 4 小时':()=>({
    start:moment().subtract('hours',4).unix(),
  }),
  '过去 12 小时':()=>({
    start:moment().subtract('hours',12).unix(),
  }),
  '过去 24 小时':()=>({
    start:moment().subtract('hours',24).unix(),
  }),
  '过去 7 天':()=>({
    start:moment().subtract('days',7).unix(),
  }),
}

export default function ErrorList () {
  const [loading,setLoading]=useState(false)
  const [erorrType,setErrorType]= useState([
    '页面报错_JS_RUNTIME_ERROR',
    '页面报错_PROMISE_ERROR'
  ])
  const [errorList, setErrorList] = useState([])
  const [time, setTime] = useState('过去 30 分钟')
  const { projectId } = useParams()

  function searchErrorList () {
    setLoading(true)
    const {start,end} = TIME_MAP[time]()
    gwRequest({
      path: `/project/${projectId}/api/error/log/list`,
      qs: {
        error_name_list_json:erorrType,
        start_at:start,
        end_at:end
      }
    }).then(({ data: { data } }) => {
      setLoading(false)
      setErrorList(data.list)
    })
  }

  useEffect(() => {
    searchErrorList()
  }, [erorrType,time])

  return (
    <Spin spinning={loading}>
        <Checkbox.Group
         options={JS_TRACKER_ERROR_DISPLAY_MAP.map(i=>'页面报错_'+i)} 
         value={erorrType} 
         onChange={(value)=>setErrorType(value)}
     />
  <select
    value={time}
    onChange={(e) => { setTime(e.target.value) }}
  >
  {Object.keys(TIME_MAP).map(i=>(
  <option value={i} key={i}>{i}</option>
  ))}
  </select>
    <Table
      pagination={false}
      dataSource={errorList}
    >
      <Column
        title="错误消息描述"
        dataIndex="desc"
        key="desc"
        render={(i) =>
          <div style={{wordBreak:'break-all'}}>
            <Link to={`/error/${projectId}?desc=${i}`}>{i?.split(/\sat\s|@/)[0]}</Link>
            <p>{i?.split(/\sat\s|@/)[1]}</p>
          </div>
        }
      />
      <Column width={200}
        title="错误类型" dataIndex="error_name" key="error_name" />
      <Column width={100}
        title="发生次数" dataIndex="count" key="count" />
      <Column
        width={200}
        title="最后一次发生时间"
        dataIndex="lastTime"
        key="lastTime"
        render={(i) => {
          return moment.unix(i).format('YYYY-MM-DD HH:mm')
        }}
      />
    </Table>
    </Spin>
  )
}
