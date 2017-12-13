import { Component } from 'react'
import AppHeader from './components/AppHeader'
import '../style/index.css'

class YourApp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    let { title } = this.props
    return (
      <div class="container">
        <AppHeader title={title} />
      </div>
    )
  }
}

export default YourApp