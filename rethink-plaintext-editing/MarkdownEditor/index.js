import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Showdown from 'showdown'
import ReactMde from 'react-mde'

import css from './style.css';


const converter = new Showdown.Converter()

function MarkdownEditor({ file, write }) {
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
        type: "text/markdown",
        lastModified: new Date()
      }))
  }

  return (
    <div className={css.editor}>
      <h3>Markdown Editor</h3>
      <i>text/markdown</i>
      <ReactMde value={val} onChange={put}
        selectedTab={tab} onTabChange={setTab}
        generateMarkdownPreview={md =>
          Promise.resolve(converter.makeHtml(md))
        }
      />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
