import React, { FormEvent, useState } from 'react';
import './AddNote.css';
import { Note } from '../../App';

const AddNote = ({notes, setNotes}: {notes: Note[], setNotes:React.Dispatch<React.SetStateAction<Note[]>>}) => {
    const [title,setTitle] = useState<string>('');
    const [content,setContent] = useState<string>('');
        
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(e.target.name === 'title') {
            setTitle(e.target.value);
        } else {
            setContent(e.target.value);
        }
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/api/notes', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, content})
            });
            if (!response.ok) {
                throw new Error('Failed to add note');
            }
            const data = await response.json();
            console.log(data);
            setNotes([...notes, data]);
            setTitle('');
            setContent('');
        } catch(error) {
            console.log(error);
        }
    }
    
  return (
    <div className='add-note'>
        <form onSubmit={handleSubmit}>
            <div className='note-title'><input type="text" placeholder='Note Title' name='title' value={title} onChange={handleChange}/></div>
            <div className='note-content'><textarea rows={5} placeholder='Note Content' name='content' value={content} onChange={handleChange}/></div>
            <div className='add-btn' onClick={handleSubmit}><button>Add Note</button></div>
        </form>
    </div>
  )
}

export default AddNote