import React, { PureComponent } from 'react'

export default importComponent => class extends PureComponent {
    state = {
      C: null,
    }

    async componentDidMount() {
      const { default: C } = await importComponent()

      this.setState({
        C,
      })
    }

    render() {
      const { C } = this.state

      return C ? <C {...this.props} /> : null
    }
}
