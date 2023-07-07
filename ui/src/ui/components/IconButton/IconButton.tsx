// Import packges
import React from 'react'

// Import react icon type
import type { IconType } from 'react-icons'

// Import css
import "./IconButton.css"

// Defining prop type
type Props = {
    Icon: IconType,
    color: string,
    onClick: () => any,
    id: string,
    borderColor: string
}

// Defining IconButton component
const IconButton = ({Icon, color, onClick, id, borderColor}: Props) => {
  return (
    <button id={id} className='iconButton-container' onClick={(e) => {e.preventDefault(); onClick();}}>
      <Icon style={{border: `0.125rem solid ${borderColor}`}} className='icon'/>
    </button>
  )
}

// Exporting IconButton
export default IconButton
