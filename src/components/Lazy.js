import * as React from 'react'

class Lazy extends React.Component {
  state = {
    module: null,
  }

  async componentDidMount() {
    const { resolve } = this.props
    const { default: module } = await resolve()
    this.setState({ module })
  }

  render() {
    const { module } = this.state

    if (!module) return <div>Loading module...</div>
    return React.createElement(module)
  }
}

export default Lazy
