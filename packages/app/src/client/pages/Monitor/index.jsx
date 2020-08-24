import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataZoomInside'

import styles from './index.less'
import gwRequest from '../../utils/request'

export default function Monitor () {
  const echartsInstance = useRef()
  const [urlList, setUrlList] = useState([])
  const [overview, setOverview] = useState({})
  const [errorList, setErrorList] = useState([])
  const [startTime, setStartTime] = useState(moment().subtract(30, 'minute').format('YYYY-MM-DD HH:mm'))
  const [endTime, setEndTime] = useState()
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
      gwRequest({
        path: `/project/${projectId}/api/performance/url/overview`,
        qs: { summaryBy: 'minute', url, st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
      }).then(({ data: { data } }) => {
        setOverview(data)
      })
    } else {
      gwRequest({
        path: `/project/${projectId}/api/performance/project/overview`,
        qs: { summaryBy: 'minute', st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
      }).then(({ data: { data } }) => {
        setOverview(data)
      })
    }
    if (url) {
      gwRequest({
        path: `/project/${projectId}/api/performance/url/line_chart`,
        qs: { summaryBy: 'minute', url, st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
      }).then(({ data: { data } }) => {
        setLineChart(data)
      })
    }
  }

  function searchErrorList () {
    gwRequest({
      path: `/project/${projectId}/api/error/log/list`,
      qs: {
        url,
        error_name_list_json: [
          '页面报错_JS_RUNTIME_ERROR',
          // '页面报错_SCRIPT_LOAD_ERROR',
          '页面报错_PROMISE_ERROR'
        ]
      }
    }).then(({ data: { data } }) => {
      setErrorList(data.list)
    })
  }

  useEffect(() => {
    gwRequest({
      path: `/project/${projectId}/api/performance/url_list`,
      qs: { summaryBy: 'minute', st: moment(startTime).valueOf(), et: endTime ? moment(endTime).valueOf() : undefined }
    }).then(({ data: { data } }) => {
      setUrlList(data)
    })
  }, [startTime, endTime])

  useEffect(() => {
    window.echartsInstance = echartsInstance.current.getEchartsInstance()
  }, [])

  return (
    <div >
      开始时间
      <input value={startTime} onChange={(e) => { setStartTime(e.target.value) }}/>
      <br/>结束时间
      <input value={endTime} onChange={(e) => { setEndTime(e.target.value) }}/>
      <br/>
      <select value={url} onChange={(e) => { setUrl(e.target.value) }} style={{ width: 200 }}>
        <option value=''>选择url</option>
        {urlList.map(i => (<option key={i} value={i}>{i}</option>))}
      </select>
      <select onChange={
        (e) => {
          const now = moment()
          now.clone().subtract(15, 'minute')
          switch (e.target.value) {
            case '1':
              setStartTime(now.clone().subtract(5, 'minute').format('YYYY-MM-DD HH:mm')); break
            case '2':
              setStartTime(now.clone().subtract(10, 'minute').format('YYYY-MM-DD HH:mm')); break
            case '3':
              setStartTime(now.clone().subtract(30, 'minute').format('YYYY-MM-DD HH:mm')); break
          }
        }} style={{ width: 200 }}>
        <option value='3'>最近30分钟</option>
        <option value='1'>最近5分钟</option>
        <option value='2'>最近10分钟</option>
      </select>
      <br/>
      <input type='button' value='查询' onClick={search}/>
      <br/>
      <div className={styles.times}>
        <span>DNS查询耗时：{dns_lookup_ms}ms</span>
        <span>TCP链接耗时：{tcp_connect_ms}ms</span>
        <span>请求响应耗时：{response_request_ms}ms</span>
        <span>内容传输耗时：{response_transfer_ms}ms</span>
        <span>DOM解析耗时：{dom_parse_ms}ms</span>
        <span>资源加载耗时：{load_resource_ms}ms</span>
        <span>SSL连接耗时：{ssl_connect_ms}ms</span>
        <span>开始解析HTML耗时：{first_render_ms}ms</span>
        <span>首包时间耗时：{first_tcp_ms}ms</span>
        <span>首次可操作dom耗时：{first_response_ms}ms</span>
        <span>DOM_READY_耗时：{dom_ready_ms}ms</span>
        <span>页面完全加载耗时：{load_complete_ms}ms</span>
      </div>
      <div className={styles.chart}>
        <ReactEchartsCore
          ref={echartsInstance}
          notMerge
          lazyUpdate
          echarts={echarts}
          option={{
            tooltip: {
              trigger: 'axis'
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
                name: 'DNS查询耗时(domainLookupEnd-domainLookupStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.dns_lookup_ms)
              },
              {
                name: 'TCP链接耗时(connectEnd-connectStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.tcp_connect_ms)
              },
              {
                name: '请求响应耗时(responseStart-requestStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.response_request_ms)
              },
              {
                name: '内容传输耗时(responseEnd-responseStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.response_transfer_ms)
              },
              {
                name: 'DOM解析耗时(domInteractive-responseEnd)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.dom_parse_ms)
              },
              {
                name: '资源加载耗时(loadEventStart-domContentLoadedEventEnd)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.load_resource_ms)
              },
              {
                name: '首包耗时(responseStart-domainLookupStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.first_tcp_ms)
              },
              {
                name: '开始解析HTML耗时(responseEnd-fetchStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.first_render_ms)
              },
              {
                name: 'DOM_READY_耗时(domContentLoadedEventEnd-fetchStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.dom_ready_ms)
              },
              {
                name: '页面完全加载耗时(loadEventStart-fetchStart)',
                type: 'line',
                stack: '总量',
                data: lineChart.map(i => i.load_complete_ms)
              }
            ]
          }}
        />
      </div>
      <input type='button' value='查询错误' onClick={searchErrorList}/>
      <ul className={styles.errorList}>
        {errorList.map((i, index) => (
          <li key={Number(index)}>
            {moment.unix(i.log_at).format('YYYY-MM-DD HH:mm')}
            &nbsp;
            <span style={{ color: 'red' }}>
              {i.error_name}
            </span>
            &nbsp;
            <span style={{ color: 'green' }}>
              {i.browser}{i.browser_version}
            </span>
            &nbsp;
            <span style={{ color: 'blue' }}>
              {i.os}{i.os_version}
            </span>
            <p>
              {i.ext.desc}
            </p>
            <p>
              {i.ext.stack}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
