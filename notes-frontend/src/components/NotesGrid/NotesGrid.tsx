import React from 'react';
import './NotesGrid.css';
import { Note } from '../../App';

const NotesGrid = ({notes, setNotes} : {notes: Note[], setNotes: React.Dispatch<React.SetStateAction<Note[]>>}) => {

    const handleDeleteNote = async(id: string) => {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      console.log(data);
      setNotes(notes.filter(note => note._id !== id));
    }
  return (
    <div className="notes">
      {notes.map((note) => (
        <div key={note._id} className="note">
          <span className="delete" onClick={() => handleDeleteNote(note._id)}>×</span>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  )
}

export default NotesGrid