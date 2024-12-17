import React from 'react'

export default function Container(props) {
  return (
    <div className={`max-w-[1200px] mx-auto px-1 ${props.className}`}>
      {props.children}
    </div>
  )
}
