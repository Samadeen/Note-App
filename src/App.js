import { useState, useEffect } from 'react';
import Sidebar from './components/SideBar';
import Editor from './components/Editor';
import { Data } from './Data';
import Split from 'react-split';
import { nanoid } from 'nanoid';

import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([
    () => JSON.parse(localStorage.getIte("notes")) || []
  ]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
  

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  const updateNote = (text) => {
    //Try to rearrange the most recent-modified to be at the top
    setNotes(oldNotes => {
      const newArray = []
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({...oldNote, body: text})
        } else {
          newArray.push(oldNote)
        }
        
      }
      return newArray
    })

    // setNotes((oldNotes) =>
    //   oldNotes.map((oldNote) => {
    //     return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote;
    //   })
    // );
  };

  const deleteNote = (e, noteId) => {
    e.stopPropagation()
  }

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction='horizontal' className='split'>
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button className='first-note' onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
