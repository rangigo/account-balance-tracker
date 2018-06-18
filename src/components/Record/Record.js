import React from 'react'

import classes from './Record.css'

const record = props => {
  const amount =
    props.amount > 0 ? (
      <span style={{ color: 'green' }}>+{props.amount} €</span>
    ) : (
      <span style={{ color: 'red' }}>{props.amount} €</span>
    )
  
  const dates = props.date.split(' ')

  return (
    <div className={classes.Record}>
      <div>
        <h1>{props.desc}</h1>
        <p>{dates[0]} <br /> {dates[1] + ' ' + dates[2]}</p>
      </div>
      {amount}
    </div>
  )
}

export default record
