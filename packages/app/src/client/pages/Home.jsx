import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Home.less'
import { actionSetTitle } from '../reducers/html'

export default function Home () {
  const [text, setText] = useState('123')
  const dispatch = useDispatch()
  useEffect(() => {
    Home.inistallData(dispatch)
  }, [])
  return <Link to='/about' className={styles.link}>{text}</Link>
}

Home.inistallData = async (dispatch) => {
  dispatch(actionSetTitle('home'))
}
