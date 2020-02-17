import React from 'react';
import Toggle from 'react-toggle';

interface ToggleDebugProps {
  debugMode: boolean, 
  setDebugMode(currentMode:boolean): void
}

const ToogleDebug: React.FC<ToggleDebugProps> = ({ debugMode, setDebugMode }) => {
  return (
    <>
      <div className='container'>
        <label style={{ color: 'white' }}>
          Mode selected: {debugMode ? 'debug' : 'random'}
        </label>
      </div>
      <Toggle
        icons={{
          checked: (
            <span className='toogle-emoji' role='img' aria-label='debug'>
              🔧
            </span>
          ),
          unchecked: (
            <span className='toogle-emoji' role='img' aria-label='random'>
              🎲
            </span>
          )
        }}
        onChange={() => setDebugMode(!debugMode)}
      />
    </>
  );
}

export default ToogleDebug;
