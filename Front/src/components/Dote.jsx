import React from 'react'

export default function Dote({className="",size="6px", color="#57534e"}) {
  return (
    <div className={`rounded-full ${className}`} style={{backgroundColor: color, width: size, height: size}}></div>
  )
}
// w-[${size}] h-[${size}] bg-${color}
// ${"bg-" + color}