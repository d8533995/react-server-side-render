import React, { useEffect } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { actionSetTitle } from '../reducers/html'

export default function Home () {
  const dispatch = useDispatch()
  useEffect(() => {
    Home.inistallData(dispatch);
    (async function () {
      await Axios({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/post/json',
        data: { a: 1, b: 1 }
      })
      await Axios({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/post/urlencode',
        data: new URLSearchParams({ a: 1, b: 1 })
      })
    })()
  }, [])
  return (
    <>
      <form
        action='http://127.0.0.1:8080/api/post/form'
        // encType='multipart/form-data'
        method='POST'
        target='formTarget'
      >
        <input name='username'/>
        <br />
        <input name='password' type='password'/>
        <br />
        <input type='submit' value='提交'/>
      </form>
      <iframe name='formTarget' />
    </>
  )
}

Home.inistallData = async (dispatch = () => {}) => {
  dispatch(actionSetTitle('home'))
  await Axios({
    url: 'http://127.0.0.1:8080/api/haha',
    withCredentials: true,
    params: { a: 1 }
  })
}
