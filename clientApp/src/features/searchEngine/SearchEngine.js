import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchByGET, searchByPOST, selectHistory, selectResults, themeDark } from './searchEngineSlice';
import styles from './SearchEngine.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export function SearchEngine() {
  const results = useSelector(selectResults)
  const history = useSelector(selectHistory)
  const darkTheme = useSelector(themeDark)
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState('');

  const onSearchInputChanged = e => setSearchInput(e.target.value)

  const onSearchHistoryClicked = title => { 
    setSearchInput(title)
    dispatch(searchByGET(title))
  }

  const renderedSearchResults = results.map((result, index) => (
    <Card.Text as='div' className={styles.cardText} key={index}>
      <a className={styles.link} href={result.URL}>
        <p>{result.title}</p>
      </a>
    </Card.Text>
  ))

  const renderedHistoryResults = history.map((result, index) => (
    <Card.Text as='div' key={index}>
      <div onClick={() => onSearchHistoryClicked(result)}>{result}</div>
    </Card.Text>
  ))

  return (
    <div className={[styles.wrapper, darkTheme ? styles.themeDark : '']}>
      <div className={styles.row}>
        <Form.Control 
          type="text"
          className={[styles.input, darkTheme ? styles.themeDark : '']}
          value={searchInput}
          onChange={onSearchInputChanged}
        />
        <Button onClick={() => dispatch(searchByPOST(searchInput))} variant="primary">
          Search
        </Button>
      </div>
      <div className={styles.row}>
        <Card className={[styles.searchResults, darkTheme ? styles.themeDark : '']}>
          <Card.Header as="h2" className={[styles.resultsHeader, darkTheme ? styles.themeDark : '']}>Search results</Card.Header>
          <Card.Body>
            {renderedSearchResults}
          </Card.Body>
        </Card>
        <Card className={[styles.historyData, darkTheme ? styles.themeDark : '']}>
          <Card.Header as="h2" className={[styles.resultsHeader, darkTheme ? styles.themeDark : '']}>History</Card.Header>
          <Card.Body>
            {renderedHistoryResults}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
