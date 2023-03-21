import React from 'react'
import { useState, useEffect } from 'react'
import data from '../db.json'


export default function Keypad({usedKeys}) {
  const [letters, setLetters] = useState(null)

  useEffect(()=>{
    setLetters(data.letters)
  })

  return (
    <div className='keypad'>
        {letters && letters.map(l => {
            const colour = usedKeys[l.key]
            return (
                <div key={l.key} className={colour}> {l.key} </div>
            )

        })}

    </div>
  )
}
