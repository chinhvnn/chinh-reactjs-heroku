import React, { Component } from 'react'

export default class Input extends Component {

  render() {
    return (
      <input placeholder={this.props.placeholder} 
      className='input-default'
      type={this.props.type}
      name={this.props.name}
      value={this.props.value}
      id={this.props.id}
      checked={this.props.checked}
      onChange={this.props.handleOnChange}
      onBlur={this.props.handleOnBlur}
      ref={this.props.handleRef}
      onKeyUp={this.props.handlePressKey}
      ></input>
    )
  }
}
