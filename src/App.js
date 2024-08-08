import { useState } from 'react';
import './App.css';

const chordMap = [
  null,
  '1 Major', // 1
  '2 Minor', // 2
  '3 Minor', // 3
  '4 Major', // 4
  '5 Major', // 5
  '6 Minor', // 6
  '7 Diminished', // 7
  '1 Major', // 8
  '2 Minor', // 9
  '3 Minor', // 10
  '4 Major', // 11
  '5 Major', // 12
  '6 Minor', // 13
  '7 Diminished', // 14
  '1 Minor', // 15
  '2 Major', // 16
  '3 Major', // 17
  '4 Minor', // 18
  '5 Minor', // 19
  '6 Major' // 20
]

function App() {
  const [styleWidth, setStyleWidth] = useState('0%');

  const [hasRolledForTempo, setHasRolledForTempo] = useState(false);
  const [theTempo, setTheTempo] = useState(null)

  const [hasRolledForTimeSignature, setHasRolledForTimeSignature] = useState(false)
  const [theTimeSig, setTheTimeSig] = useState(null)

  const [hasRolledForChords, setHasRolledForChords] = useState(false)
  const [theChords, setTheChords] = useState(null)

  const [showDieRolling, setShowDieRolling] = useState(false)

  const [showResultsPage, setShowResultsPage] = useState(false)

  const [sliders, setSliders] = useState([1, 0, 0, 0]);
  const totalSliderSum = sliders.reduce((sum, value) => sum + value, 0);

  const handleSliderChange = (index, event) => {
    const newValue = Number(event.target.value);
    const newSliders = [...sliders];
    newSliders[index] = newValue;
    setSliders(newSliders);
  };

  const areSlidersValid = totalSliderSum === theTimeSig;

  const rollForTempo = () => {
    rollDie()
    setTimeout(() => {
      setHasRolledForTempo(true)
      const theRoll = Math.ceil(Math.random() * 20)
      const computedTempo = theRoll * 10 + 50
      setTheTempo(computedTempo)
      setStyleWidth('33%')
    }, 1000)
  }

  const rollForTimeSignature = () => {
    rollDie()
    setTimeout(() => {
      setHasRolledForTimeSignature(true)
      const theRoll = Math.ceil(Math.random() * 20)
      const computedTimeSig = theRoll
      setTheTimeSig(computedTimeSig)
      setStyleWidth('67%')
    }, 1000)
  }

  const rollForChords = () => {
    rollDie()
    setTimeout(() => {
      setHasRolledForChords(true)
      const computedChords = []
      new Array(4).fill(0).forEach(() => {
        const theRoll = Math.ceil(Math.random() * 20)
        computedChords.push(chordMap[theRoll])
      })
      setTheChords(computedChords)
      setStyleWidth('100%')
    }, 1000)
  }

  const rollDie = () => {
    setShowDieRolling(true)
    setTimeout(() => {
      setShowDieRolling(false)
    }, 1000)
  }

  const maybeShowResults = () => {
    if (theTempo !== null && theTimeSig !== null && theChords !== null) {
      setShowResultsPage(true)
      setTimeout(() => {
        document.getElementById('results').scrollTop = 0
      }, 100)
    }
  }

  const resetState = () => {
    setStyleWidth('0%')
    setHasRolledForTempo(false)
    setTheTempo(null)
    setHasRolledForTimeSignature(false)
    setTheTimeSig(null)
    setHasRolledForChords(false)
    setTheChords(null)
    setShowResultsPage(false)
    setSliders([1, 0, 0, 0])
  }

  if (!showResultsPage) {
    return (
      <div className="App">
        <div style={{ marginBottom: '16px', fontSize: '12px' }}>@superfamousmike presents</div>
        <img alt="Dungeons and Dragons Songwriting" className="App-img" src="/dnd_songwriting_header.png" />
        <div className="App-bigText">The D&D Songwriting Game</div>
        <div style={{ marginTop: '8px'}}>by Lake Street Dive</div>
        <div className="App-footer" onClick={maybeShowResults}>
          <div className="App-footer-progress" style={{ width: styleWidth }} />
          {!hasRolledForTempo && (
            <div className="App-footer-step">Step 1 / 3</div>
          )}
          {hasRolledForTempo && !hasRolledForTimeSignature && (
            <div className="App-footer-step">Step 2 / 3</div>
          )}
          {hasRolledForTempo && hasRolledForTimeSignature && !hasRolledForChords && (
            <div className="App-footer-step">Step 3 / 3</div>
          )}
          {hasRolledForTempo && hasRolledForTimeSignature && hasRolledForChords && (
            <div className="App-footer-step App-footer-step-final">See Results!</div>
          )}
        </div>
        {!hasRolledForTempo && (
          <button className="App-cta" onClick={rollForTempo}>Roll for tempo!</button>
        )}
        {hasRolledForTempo && theTempo !== null && !hasRolledForTimeSignature && (
          <button className="App-cta" onClick={rollForTimeSignature}>Roll for time signature!</button>
        )}
        {hasRolledForTempo && theTempo !== null && hasRolledForTimeSignature && theTimeSig !== null && !hasRolledForChords && (
          <button className="App-cta" onClick={rollForChords}>Roll for chords!</button>
        )}
        {!hasRolledForChords && (
          <div className="App-die-rolling">
            <img alt="Rolling die" src="/favicon.ico" className={showDieRolling ? 'spinning' : ''}/>
            {!showDieRolling && (
              <div> </div>
            )}
            {showDieRolling && (
              <div>Rockin' & Rollin'</div>
            )}
          </div>
        )}
        {hasRolledForChords && theChords !== null && (
          <svg className="fatArrow" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <path d="M132.93848,231.39062A8,8,0,0,1,128,224V184H48a16.01833,16.01833,0,0,1-16-16V88A16.01833,16.01833,0,0,1,48,72h80V32a8.00065,8.00065,0,0,1,13.65723-5.65723l96,96a8.003,8.003,0,0,1,0,11.31446l-96,96A8.002,8.002,0,0,1,132.93848,231.39062Z"/>
          </svg>
        )}
      </div>
    )
  } else {
    return (
        <div className="App-resultsPage" id="results">
            <div className="App-bigText" style={{ marginBottom: '16px'}}>
              Results!
            </div>
            <div className="App-resultSection">
              <div className="App-resultHeader">Tempo</div>
              <div className="App-resultValue">{`${theTempo}bpm`}</div>
            </div>
            <div className="App-resultSection">
              <div className="App-resultHeader">Time Signature</div>
              <div className="App-resultValue">{`${theTimeSig} beats`}</div>
              {sliders.map((value, index) => (
                <div key={index} className="App-beat">
                  <div className="App-beat-label">Bar {index + 1}</div>
                  <div className="App-beat-input">
                    <input
                      type="range"
                      min="0"
                      max={theTimeSig}
                      value={value}
                      className="slider"
                      onChange={(event) => handleSliderChange(index, event)}
                    />
                    <span style={{ minWidth: '25px', textAlign: 'center', fontWeight: '800', marginTop: "-5px" }}>{value}</span>
                  </div>
                </div>
              ))}
              <div className={`validation-message ${areSlidersValid ? 'valid' : 'invalid'}`}>
                {areSlidersValid ? "You're ready to rock!" : `You've gotta use up exactly ${theTimeSig} beats!`}
              </div>
            </div>
            <div className="App-resultSection">
              <div className="App-resultHeader">Chords</div>
              <div className="chord-container">
                {theChords.map((chord, idx) => {
                  return (
                    <div key={idx} className="single-chord">{chord}</div>
                  )
                })}
              </div>
            </div>
            <button className="App-cta App-resultsCta" onClick={resetState}>Play again!</button>
          </div>

    )
  }
}

export default App;
