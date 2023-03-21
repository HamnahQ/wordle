import React from 'react'

export default function Row({guess, currentGuess}) {

  if (guess){

    return (
      <div className='row past'>
        {guess.map((letter, i) => (
            <div key={i} className={letter.colour}>{letter.key}</div>
        ))}
      </div>
    )
  }

  if (currentGuess){
    //convert string to an array of letters
    //returns non-space letters only
    let letters = currentGuess.split('')

    return (
      <div className='row current'>
        {letters.map((letter, i) => (
          <div key={i} className='filled'>{letter}</div>
        ))}
        {[...Array(5-letters.length)].map((_, i) =>(
          <div key={i}> </div>
        ))}
      </div>
    )

  }

  return (
    <div className='row'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

    </div>
  )
}
