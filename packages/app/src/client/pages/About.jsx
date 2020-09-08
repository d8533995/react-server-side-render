import React from 'react'
import styles from './About.less'
import SwiperCore, { Lazy, Pagination, Zoom } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper.less'
import 'swiper/components/lazy/lazy.less'

SwiperCore.use([Lazy, Pagination, Zoom]);
// ie9 bug
(function func (a) {
  a = Object.create(null)
  console.log(arguments[0] === a)
})()

export default function About () {
  return <div className={styles.about}><div className={styles.text}> fdfgrsad</div></div>
}
