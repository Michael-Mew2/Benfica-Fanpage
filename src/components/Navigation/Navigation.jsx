import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./Navigation.module.css"

export default function Navigation() {
  return (
    <div className={styles.navigation}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </div>
  )
}
