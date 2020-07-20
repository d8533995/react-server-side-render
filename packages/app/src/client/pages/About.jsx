import React, { useEffect } from 'react'
import styles from './About.less'

// ie9 bug
(function func (a) {
  a = Object.create(null)
  console.log(arguments[0] === a)
})()

export default function About () {
  useEffect(() => {
    setTimeout(() => {
      console.log(a.b)
    })
  }, [])

  return <div className={styles.about}>fdfgrgre</div>
}
