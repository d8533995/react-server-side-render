import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'

import styles from './index.less'

export default function Monitor () {
  const [urlList, setUrlList] = useState([])
  const [overview, setOverview] = useState({})
  const [startTime, setStartTime] = useState('2020-07-20 20:00')
  const [endTime, setEndTime] = useState('2020-07-20 21:00')
  const [url, setUrl] = useState()
  const [lineChart, setLineChart] = useState([])
  const {
    dns_lookup_ms, dom_parse_ms, dom_ready_ms, first_render_ms, first_response_ms,
    first_tcp_ms, load_complete_ms, load_resource_ms, response_request_ms,
    response_transfer_ms, ssl_connect_ms, tcp_connect_ms
  } = overview
  const { projectId } = useParams()
  function search () {
    if (url) {
      axios({
        url: `http://10.50.255.251:63457/project/${projectId}/api/performance/url/overview`,
        params: { summaryBy: 'minute', url, st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
      }).then(({ data: { data } }) => {
        setOverview(data)
      })
    } else {
      axios({
        url: `http://10.50.255.251:63457/project/${projectId}/api/performance/project/overview`,
        params: { summaryBy: 'minute', st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
      }).then(({ data: { data } }) => {
        setOverview(data)
      })
    }
    if (url) {
      axios({
        url: `http://10.50.255.251:63457/project/${projectId}/api/performance/url/line_chart`,
        params: { summaryBy: 'minute', url, st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
      }).then(({ data: { data } }) => {
        setLineChart(data)
      })
    }
  }
  useEffect(() => {
    axios({
      url: `http://10.50.255.251:63457/project/${projectId}/api/performance/url_list`,
      params: { summaryBy: 'minute', st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
    }).then(({ data: { data } }) => {
      setUrlList(data)
    })
  }, [])
  return (
    <div >
      开始时间
      <input value={startTime} onChange={(e) => { setStartTime(e.target.value) }}/>
      <br/>结束时间
      <input value={endTime} onChange={(e) => { setEndTime(e.target.value) }}/>
      <select value={url} onChange={(e) => { setUrl(e.target.value) }} style={{ width: 200 }}>
        <option value=''>选择url</option>
        {urlList.map(i => (<option key={i} value={i}>{i}</option>))}
      </select>
      <input type='button' value='查询' onClick={search}/>
      <p>DNS查询耗时：{dns_lookup_ms}ms</p>
      <p>TCP链接耗时：{tcp_connect_ms}ms</p>
      <p>请求响应耗时：{response_request_ms}ms</p>
      <p>内容传输耗时：{response_transfer_ms}ms</p>
      <p>DOM解析耗时：{dom_parse_ms}ms</p>
      <p>资源加载耗时：{load_resource_ms}ms</p>
      <p>SSL连接耗时：{ssl_connect_ms}ms</p>
      <p>首次渲染耗时：{first_render_ms}ms</p>
      <p>首包时间耗时：{first_tcp_ms}ms</p>
      <p>首次可交互耗时：{first_response_ms}ms</p>
      <p>DOM_READY_耗时：{dom_ready_ms}ms</p>
      <p>页面完全加载耗时：{load_complete_ms}ms</p>
      <div className={styles.chart}>
        <ReactEchartsCore
          echarts={echarts}
          notMerge={true}
          lazyUpdate={true}
          option={{
            title: {
              text: '折线图堆叠'
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: lineChart.map(i => i.index)
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'dns',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.dns_lookup_ms)
              },
              {
                name: 'DOM_READY_耗时',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.dom_ready_ms)
              },
              {
                name: '页面完全加载耗时',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.load_complete_ms)
              }
            ]
          }}
        />
      </div>
    </div>
  )
}
