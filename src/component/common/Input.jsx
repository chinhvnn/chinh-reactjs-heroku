import React from 'react'

function Input(props) {
  return (
      <input placeholder={props.placeholder} 
      className='input-default'
      width={props.width}
      type={props.type}
      name={props.name}
      value={props.value}
      id={props.id}
      onChange={props.handleOnChange}
      onBlur={props.handleOnBlur}
      ref={props.handleRef}
      onKeyUp={props.handlePressKey}
      readOnly={props.readOnly}
      defaultValue={props.defaultValue}
      checked={props.checked}
      ></input>
    )
  }
  export default Input;

