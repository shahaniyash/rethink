import React, {useState} from 'react';
// import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import { loremIpsum } from 'lorem-ipsum';

import { List } from "react-virtualized";

const rowCount = 1000000;
const listHeight = 600;
const rowHeight = 50;
const rowWidth = 800;


function App (props) {

  const [input, setInput] = useState("");

  let list = Array(rowCount).fill().map((val, idx) => {
    return {
      id: idx,
      name: loremIpsum({
            count: 2,                // Number of "words", "sentences", or "paragraphs"
            format: "plain",         // "plain" or "html"
            sentenceLowerBound: 2,   // Min. number of words per sentence.
            sentenceUpperBound: 2,  // Max. number of words per sentence.
            units: "words"      // paragraph(s), "sentence(s)", or "word(s)"
          })
    }
  });


  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  if(input.length > 0){
    list = list.filter((i) => {
      return i.name.toLowerCase().match(input);
    });
  }




  const renderRow = ({ index, key, style }) => {
    return (
      <div key={key} style={style} className="row">
        <div className="content">
          <div>{list[index].name}</div>
        </div>
      </div>
    );
  }


  // const [input, setInput] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Created using React</h1>
      </header>
      <br/>
      <input
        type="text"
        placeholder="Search name here!"
        onChange={handleChange}
        value={input}
      />

      <div className="list">
        <List
          width={rowWidth}
          height={listHeight}
          rowHeight={rowHeight}
          rowRenderer={renderRow}
          rowCount={list.length}
          overscanRowCount={3} />
      </div>
    </div>
  );

}

export default App;
