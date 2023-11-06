import React from 'react'
import styles from './button.css'

export default function Button({title}) {
  const job = useDataSubscription({ JobSchema })

  const job = useDataSubscription<
JobSchema,
any,
UpdateJobPayloadProps,
RemoveJobPayloadProps
>({})
  return <div className={`${styles.wrapper}`}>button</div>
}

