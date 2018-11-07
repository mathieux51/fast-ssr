import React, { Fragment, PureComponent } from 'react'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle'
import Lazy from './Lazy'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: lightblue;
  border-radius: 5px;
`

const Row = styled.div`
  display: flex;
  width: 70%;
`

const Emoji = ({ className, label, symbol }) => (
  <span className={className} role="img" aria-label={label}>
    {symbol}
  </span>
)

const StyledEmoji = styled(Emoji)`
  font-size: 7em;
`

const Input = styled('input')`
  font-size: 2em;
  flex: 50px;
  padding: 5px;
  border: 0;
  outline: 0;
  &:focus {
    border-bottom: 8px solid black;
  }
  border-bottom: 8px solid ${({ touched }) => (touched ? 'red' : 'transparent')};
  &:valid {
    border-bottom: 8px solid green;
  }
`

export default class extends PureComponent {
  state = {
    // value, touched
    input: ['', false],
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target
    this.setState((state) => {
      const [, tch] = state[name]
      return {
        [name]: [value, tch],
      }
    })
  }

  handleOnBlur = ({ target: { name, value } }) => {
    this.setState((state) => {
      const [val] = state[name]
      return {
        [name]: [val, Boolean(value !== '')],
      }
    })
  }

  handleOnSubmit = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    console.log('evt', evt)
  }

  render() {
    const { input } = this.state
    return (
      <Fragment>
        <GlobalStyle />
        <Form onSubmit={this.handleOnSubmit}>
          <Row>
            <StyledEmoji symbol="🔥" label="flame" />
            <Input
              id="input"
              name="input"
              value={input[0]}
              touched={input[1]}
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              required
              pattern="^.{4,}$"
            />
          </Row>
          {/* <Button type="submit">Test</Button> */}
          <Lazy resolve={() => import('./Button')} />
        </Form>
      </Fragment>
    )
  }
}
