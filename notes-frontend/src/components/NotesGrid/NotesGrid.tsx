import React from 'react';
import './NotesGrid.css';
import { Note } from '../../App';

const NotesGrid = ({notes, setNotes} : {notes: Note[], setNotes: React.Dispatch<React.SetStateAction<Note[]>>}) => {

    const handleDeleteNote = (id: number) => {
        const newNotes = notes && notes.filter(note => note.id !== id);
        setNotes(newNotes);
    }
  return (
    <div className='notes'>
        {notes && notes.map(note => <div className='note' key={note.id}>
             <h4>{note.title}<span onClick={() => handleDeleteNote(note.id)}>X</span></h4>
             <p>{note.content}</p>
            </div>
        )}
    </div>
  )
}

export default NotesGrid