import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Showdown from 'showdown'
import ReactMde from 'react-mde'

import css from './style.css';


const converter = new Showdown.Converter()

function PlaintextEditor({ file, write }) {
  console.log(file, write);

  const [val, setVal] = useState('')
  const [tab, setTab] = useState('write')

  const reader = new FileReader()

  reader.addEventListener('load', () => {
    setVal(event.target.result)
  })

  reader.addEventListener('error', () => {
    alert("Error in reading file!")
  })

  reader.readAsText(file)

  const put = (input) => {
    setVal(input)
    write(new File(
      [input],
      file.name,
      {
        type: "text/plain",
        lastModified: new Date()
      }))
  }

  return (
    <div className={css.editor}>
      <h3>Plaintext Editor</h3>
      <i>text/plain</i>
      <ReactMde value={val} onChange={put}
        selectedTab={tab} onTabChange={setTab}
        generateMarkdownPreview={md =>
          Promise.resolve(converter.makeHtml(md))
        }
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
