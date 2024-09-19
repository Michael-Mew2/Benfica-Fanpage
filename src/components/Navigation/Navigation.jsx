import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <div>
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
