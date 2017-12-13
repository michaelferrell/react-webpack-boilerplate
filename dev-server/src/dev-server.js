import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YourApp from '../../src/js/index'
import './dev-server.css'

class Demo extends Component {
  render() {
    return <YourApp title={'Your starter React App'} />
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
