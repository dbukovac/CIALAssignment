import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themeDark, changedTheme } from './features/searchEngine/searchEngineSlice';
import './App.css';
import { SearchEngine } from './features/searchEngine/SearchEngine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';


function App() {
  const darkTheme = useSelector(themeDark)
  const dispatch = useDispatch()
  return (
    <div className={`App ${darkTheme ? 'themeDark' : ''}`}>
      <header className="App-header">
        <div>
          DuckDuckGo API search engine
        </div>
        <div className='icon'>
          <FontAwesomeIcon icon={faSun} onClick={() => dispatch(changedTheme())} />
        </div>
      </header>
      <SearchEngine />
    </div>
  );
}

export default App;
