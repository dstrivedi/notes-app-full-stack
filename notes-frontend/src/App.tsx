import React, { useEffect, useState } from 'react';
import './App.css';
import AddNote from './components/AddNote/AddNote';
import NotesGrid from './components/NotesGrid/NotesGrid';

export type Note = {
    id: number;
    title: string;
    content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
          const response = await fetch('http://localhost:3000/notes');
          const data = await response.json();
          console.log(data);
          setNotes(data);
      } catch(error) {
          console.log(error);
      }
    }
    fetchData();
  }, [setNotes]);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className='main-container'>
        <AddNote notes={notes} setNotes={setNotes}/>
        <NotesGrid notes={notes} setNotes={setNotes}/>
      </div>
    </div>
  );
}

export default App;
