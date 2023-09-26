//TODO: Before comparing strings, make them both the same case and strip whitespace
//TODO: Copy the design colors etc from Dotabuff
//TODO: Wait to render stuff until info gotten from API
//TODO: Consider getting urls from package.json
//TODO: Add a header

import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, lazy, Suspense} from 'react';
import axios from 'axios';
import Results from './components/results';
import Values from './components/values';
import Hero from './components/hero';
import Description from './components/description';

//TODO: Figure out what useStates I can get rid of
function App() {
  const [numberOfGuesses, setGuesses] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [abilityData, setAbilityData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [emptyText, setEmptyText] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [resultsText, setResultsText] = useState({winOrLoss: "default", heroName: 'default'});
  const LazyHero = lazy(() => import('./components/hero'));
  const LazyDescription = lazy(() => import('./components/description'))

  useEffect(() => {
    fetch("https://dota-abilityle-django.onrender.com/api/get_hashmap/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAbilityData(result);
          setAnswer(result.name)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const answerEntered = (e) => {
    //check for victory
    e.preventDefault();

    if (!inputValue) {
      setEmptyText(true);
    }
    //TODO: Add a short wait at the end to avoid double-submitting
    else { 

      if (inputValue.toLowerCase().trim() === answer.toLowerCase().trim()) {
        setResultsText({winOrLoss: 'CORRECT!', heroName: answer});
        setShowResults(true);
      } else if (numberOfGuesses >= 3) {
        setResultsText({winOrLoss: 'INCORRECT!', heroName: answer});
        setShowResults(true);
      } else {
      setGuesses(numberOfGuesses + 1);
      }

      setEmptyText(false);
    } 
  }

  const playAgain = () => {
    setGuesses(0);
    setInputValue('');
    setEmptyText(false);
    setShowResults(false);

    fetch("https://dota-abilityle-django.onrender.com/api/get_hashmap/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAbilityData(result);
          setAnswer(result.name)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  //TODO: For Submit, make the submit button wide as the input
  //TODO: Make divs and then make their contents conditionally appear depending on numberOfGuesses
  //TODO: Figure out images
  //TODO: Figure out how to split up the ability values
  //TODO: Sort hintlist into components
  //TODO: Move header and form into their own components

  // {numberOfGuesses>=2 ? <Hero heroName={abilityData.hero ? abilityData.hero : ""}/> : null}
  // {numberOfGuesses>=3 ? <Description description={abilityData.description ? abilityData.description : ""} heroName={abilityData.hero ? abilityData.hero : ""} abilityName={answer}/> : null}


  return (
  <div className="App">
    <div id='header'>
      <div class="title-div">
        <p><strong id='game-title'>Dota 2 Abilityle</strong> by Ahad Bashir</p>
      </div>
      <nav class="image-container">
        <a className="logo" href="https://github.com/ABashir01/dota-abilityle/tree/master"><strong>Github</strong></a>
        <a className="logo" href="https://www.linkedin.com/in/ahad-bashir-b5382b1b7/"><strong>Linkedin</strong></a>
        <a className="logo" href="mailto: ahadb2020@gmail.com"><strong>Email</strong></a>
      </nav>
    </div>

    {isLoaded ? 
    
    <div className="game">
      <div id="hints-list">
        {numberOfGuesses>=0 ? <div className="hint-div"><p><strong>Mana Cost: </strong> {abilityData.mana_cost ? abilityData.mana_cost : 0} </p> <p><strong>Cooldown: </strong>{abilityData.cooldown ? abilityData.cooldown : 0}</p></div> : null}
        {numberOfGuesses>=1 ? <Values text={abilityData.ability_list ? abilityData.ability_list : ""}/> : null}
        <Suspense fallback={null}>
          {numberOfGuesses>=2 ? <LazyHero heroName={abilityData.hero ? abilityData.hero : ""}/> : null}
        </Suspense>
        <Suspense fallback={null}>
          {numberOfGuesses>=3 ? <LazyDescription description={abilityData.description ? abilityData.description : ""} heroName={abilityData.hero ? abilityData.hero : ""} abilityName={answer}/> : null}
        </Suspense>
      </div>
      <form onSubmit={answerEntered}>
        <input type="text" value={inputValue} onChange={handleChange} placeholder='Type Answer Here'></input>
        <br />
        <button type="submit" id="submit-button">Submit</button>
      </form>
      <em>{emptyText ? "Please type in an answer": ""}</em>
      {showResults ? <Results resultsText={resultsText} buttonAction={playAgain}/> : null}
      <br />
      <br />
    </div> 
    
    : <div><br /> <br /><p>Loading...</p></div>}
    
  </div>)
}

export default App;
