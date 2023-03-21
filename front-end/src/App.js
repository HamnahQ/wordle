import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import './App.css';
import Wordle from './components/Wordle';
import data from './db.json'

function App() {

  const [solution, setSolution] = useState(null)

  useEffect(() =>{
    const randomSolution = data.solutions[Math.floor(Math.random()*data.solutions.length)]
    setSolution(randomSolution.word)
  }, [setSolution])

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution = {solution} />}
    </div>
  );
}

export default App;

/*
    Solution to the wordle 
      --> 5 letter string 
    Past guesses 
      --> An array 
      --> Each past guess is an array of letter objects
      --> Each object represents a letter in the guess word {key and color}
    Current guess 
      --> A string 
    Keypad letter 
      --> An array of letter objects (key and color)
    Number of turns 
      --> Integer: 0-6

    Entering words:
      --> User enters a letter and is filled with that letter
      --> User hits deletes, deletes the letter
      --> User hits enter, submit word
    Submitted word: 
      --> Make sure all letters are filled
      --> Is not  a repeated word 
    Checks submitted word:
      --> Each letter is checked to see if it matches the solution
      --> Each letter is assigned based on the solution 
      --> guess is added to the grid with correct colours
      --> current guess moves next row
      --> keypad colours are updated
    Ending the game:
      --> Solution matches up and prints out "Good job"
      --> If user runs out of guesses "next time"
    
    */