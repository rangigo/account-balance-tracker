import React, { Component } from 'react'

import classes from './Tracker.css'

import Balance from '../../components/Balance/Balance'
import Record from '../../components/Record/Record'
import swal from 'sweetalert'

export class Tracker extends Component {
  state = {
    desc: '',
    amount: '',
    records: [],
    type: 'income'
  }

  componentDidMount() {
    if (localStorage.getItem('records') !== null)
      this.setState({
      records: JSON.parse(localStorage.getItem('records'))
    })
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    localStorage.setItem('records', JSON.stringify(this.state.records))
  }

  handleSubimt = e => {
    e.preventDefault()
    const newRecords =  this.state.records.concat({
      desc: this.state.desc,
      amount:
        this.state.type === 'income'
          ? this.state.amount
          : -this.state.amount,
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    })
    if (this.state.desc === '' || this.state.amount === '') {
      swal('Do not add empty description/amounts', { icon: 'warning' })
    } else if (newRecords.reduce((acc, el) => acc + el.amount
    , 0) < 0) {
      swal(`Can not add expense, check your balance again!`, { icon: 'warning'})
    } else
      this.setState({
        records: newRecords,
        desc: '',
        amount: ''
      })
  }

  handleChange = e => {
    const value =
      (e.target.name === 'amount' && e.target.value !== '') ? Number(e.target.value) : e.target.value
    this.setState({
      [e.target.name]: value
    })
  }

  render() {
    return (
      <div className={classes.Tracker}>
        <Balance records={this.state.records} />
        <form className={classes.AddPanel} onSubmit={this.handleSubimt}>
          <input
            type="text"
            name="desc"
            onChange={this.handleChange}
            placeholder="Description"
            value={this.state.desc}
          />
          <input
            type="number"
            name="amount"
            onChange={this.handleChange}
            placeholder="Amount"
            value={this.state.amount}
          />
          <select name="type" onChange={this.handleChange} value={this.state.type}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input type="submit" value="Add" />
        </form>
        <div className={classes.Records}>
          {this.state.records.map((el, id) => (
            <Record key={id} desc={el.desc} amount={el.amount} date={el.date} />
          ))}
        </div>
      </div>
    )
  }
}

export default Tracker
