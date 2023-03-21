
import {useState} from 'react'



const useWordle = (solution) =>{

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) //each guess is an array
    const [history, setHistory] = useState(['ninja', 'turns']) //each guess is a string 
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) //{a:'green', b: 'yellow', c:'grey'}

    //format a guess into an array of letter objects
    //e.g. [key: 'a', color: 'yellow']
    const formatGuess = () => {
        //turn string into array
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map ((letter) => {
            return {key : letter, colour : 'grey'}
        } )

        //find green letter
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key){
                letter.colour = 'green'
                solutionArray[i] = null //Make the letter null so in the future it doens't colour double letter yellow
            }
        })

        //find yellow letter
        formattedGuess.forEach((letter, i) => {
            if (letter.colour === 'grey' && solutionArray.includes(letter.key)){
                letter.colour='yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    //add a new guess to the guesses states
    //updates the isCorrect state if the guess is correct 
    //add one to the turn state
    const addNewGuess = (formattedGuess) => {

        //checks if current guess is correct answer
        if (currentGuess === solution){
            setIsCorrect(true)
        }
        
        //add formatted guess to the an array of letter objects
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        //adds the string to history
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        //increases turn by 1
        setTurn((prevTurn) => {
            return prevTurn+1
        })

        //sets the keys that have been used in the guess
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
            
            //takes each letter from the formatted guess and puts into used keys 
            formattedGuess.forEach((l) => {
                //finds the current colour of the letter
                const currentColour = newKeys[l.key]
                if (l.colour === 'green'){
                    newKeys[l.key] = 'green'
                     return
                }
                //if we already assigned it green in a previous guess, we will keep it green and not change it
                if (l.colour === 'yellow' && currentColour !== 'green'){
                    newKeys[l.key] = 'yellow'
                    return
                }

                if (l.colour === 'grey' && currentColour !== 'green' &&  currentColour !== 'yellow'){
                    newKeys[l.key] = 'grey'
                    return
                }
            })
            return newKeys
        })

        //sets currentGuess to empty string
        setCurrentGuess('')

    }

    //handle keyup event & track current guess
    // if use presses enter, add the new guess
    // / / regex expression, ^ start of the string, [] which matches the range of character and $ start testing at the end of the list
    // test function returns boolean - true if it passes the test
    // if the current guess length is less than 5 character, we will render the new key to the String currentGuess 
    //if key is backspace, slice the previous current guess from 0 till before last chracter (-1)


    const handleKeyup = ({key}) =>{

        if (key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if (key === 'Enter'){
            if ( turn > 5 ){
                console.log("ERROR: You have used all your turns")
                return

            }else if (currentGuess.length !==5 ){
                console.log("ERROR: Word must be 5 letters long")
                return

            }else if (history.includes(currentGuess) ){
                console.log("ERROR: You have already tried this word")
                return  
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }
        
        if (/^[A-Za-z]$/.test(key)){
            if(currentGuess.length <5){
                setCurrentGuess((prev)=>{
                    return prev +key
                })
            }
        }

    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}

}


export default useWordle