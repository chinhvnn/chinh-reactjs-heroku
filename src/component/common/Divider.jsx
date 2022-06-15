import React, { Component } from 'react'

export default class Divider extends Component {
  render() {
    return (
      <hr style={{width: this.props.width}}></hr>
    )
  }
}
