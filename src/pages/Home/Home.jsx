import React from 'react'
import Hero from '../../components/Hero/Hero'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
        <Hero />
    </div>
  )
}
