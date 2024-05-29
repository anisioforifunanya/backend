import React from 'react'
import styles from './styles/Spinner.module.css'
import Image from 'next/image'

export default function Spinner({type, centered}) {
  return (
    <div className={`h-full flex justify-center items-center ${centered? "w-full" : null}`}>
        { type == "default"
        ? <div className={styles.loader}></div>
        : <div className={styles.ameboSpinner}>
             <Image priority={true} height={100} width={100} src="/logo.png" alt='Amebo Connect Logo'/>
          </div>}
    </div>
  )
}
