import { useState } from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';

import '../styles.css';

const Editor = ({ currentNote, updateNote }) => {
  const [selectedTab, setSelectedTab] = useState('write');

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className='pane editor'>
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        minEditorWidth={80}
        heightUnits='vh'
        widthUnits='vw'
      />
    </section>
  );
};

export default Editor;
