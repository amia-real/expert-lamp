import axios from 'axios'
import { useEffect, useState } from 'react'


const ApiCall = () => {
    // list of words coming from API
    const [rhymeList, setRhymeList] = useState([])

    // inputted word from searchbar
    const [searchInput, setSearchInput] = useState('')

    const [currentWord, setCurrentWord] = useState('forgetful')
    // error message if there is one
    const [error, setError] = useState('')

    
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
        
      }
    // handle axios call on submit of form
    const handleSubmit = (e) => {
    e.preventDefault();
    setError('')
    axios({
        url: `https://api.datamuse.com/words?rel_rhy=${searchInput}`

        
    }).then(response => {
        // if no words are brought back from api
        if (response.data.length === 0) {
            return setError('There are no words that rhyme with your inputed word, please try again!')
        }
        // set data from api to state variable
        setRhymeList(response.data)
        setCurrentWord(searchInput)
        setSearchInput('')
    })
    }
    // default axios call on page load
    useEffect(()=> {
        axios({
            url: `https://api.datamuse.com/words?rel_rhy=${currentWord}`
        }).then(response => {

            if (response.data.length === 0) {
                return setError('There are no words that rhyme with your inputed word, please try again!')
            }
            console.log(response.data)
            setRhymeList(response.data)
        }).catch(error => {
            setError(error)
        })
    }, [])
    return (


        <>
        <form action="submit" onSubmit={handleSubmit} role="search">
          <label htmlFor="search">Pick a Word, and Ill give you some that Rhyme with it</label>
          <div>
            <input type="search" id="search" placeholder="Type a Word" value={searchInput} onChange={handleSearchInput} required />
            <button>Search</button>
          </div>
        </form>

        {error && <h2>{error}</h2>}
        {!error && <h2>Words that Rhyme with {currentWord}</h2>}
        {!error && rhymeList.map(function (individualWord, index) {
                        return (
                            <p key={index}>{individualWord.word}</p>)
                    }) }            
        </>
    )
}

export default ApiCall