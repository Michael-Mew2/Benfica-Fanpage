import React from 'react'
import Navigation from "../Navigation/Navigation"
import styles from "./Header.module.css"

export default function Header() {
  return (
    <div className={styles.header}>
      <Navigation />
    </div>
  )
}
