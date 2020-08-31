import React, { useEffect } from 'react'
import styles from './About.less'
import styles1 from './Home.less'
// ie9 bug
(function func (a) {
  a = Object.create(null)
  console.log(arguments[0] === a)
})()

export default function About () {
  useEffect(() => {
    c.a = 1
  }, [])

  return <div className={styles.about}>fdfgr</div>
}
