import React, { Component } from 'react';

import Header from './components/Header/Header'
import Tracker from './containers/Tracker/Tracker'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Tracker />
      </React.Fragment>
    )
  }
}

export default App;
