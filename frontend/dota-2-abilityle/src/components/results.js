import React from "react"

function Results(props) {
    const {resultsText, buttonAction} = props;

    const correctOrIncorrect = resultsText.winOrLoss === 'CORRECT!' ? 'correct' : 'incorrect';
    const whichReset = resultsText.winOrLoss === 'CORRECT!' ? 'successReset' : 'failReset';
 

    return (
        <div id='results-wrapper'>
            <div id='results'>
                <div id={correctOrIncorrect}>
                    <h1>{resultsText.winOrLoss}</h1>
                </div>
                <p>The answer was:</p>
                <h2>{resultsText.heroName}</h2>
                <br/>
                <br/>
                <button onClick={buttonAction} className="reset-button" id={whichReset}>Play Again?</button>
            </div>
        </div>
    )
}

export default Results;