import React from 'react'
import styles from './styles/Loader.module.css'

export default function Loader({color}) {
  return (
    <span className={`${styles.loader} ${color === 'red' && styles.loaderRed}`}></span>
  )
}
