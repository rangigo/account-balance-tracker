import React from 'react'
import { Doughnut } from 'react-chartjs'

const balance = (props) => {
  let income = 0, expense = 0

  const balance = props.records.reduce((acc, el) => {
    el.amount > 0 ? income += el.amount : expense -= el.amount
    return acc + el.amount
  }, 0)

  const chartData = [
    {
      value: expense,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Expense"
    },
    {
      value: balance,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Balance"
    },
  ]

  return (
    <div>
      <h2>Income: {income} €</h2>
      {balance !== 0 ? <Doughnut data={chartData} options={{animateScale: true}} height='200'/>: null}
    </div>
  )
}

export default balance
