import React from 'react'
import './button.css'
const Button = ({name,handleClick,cls}) => {
  return (
    <>
        <button onClick={handleClick} className={cls}>{name}</button>
    </>
  )
}

export default Button