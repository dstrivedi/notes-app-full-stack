import React, { FormEvent, useState } from 'react';
import './AddNote.css';
import { Note } from '../../App';

const AddNote = ({ notes, setNotes }: { notes: Note[], setNotes: React.Dispatch<React.SetStateAction<Note[]>> }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else {
            setContent(e.target.value);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/notes', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            if (!response.ok) {
                throw new Error('Failed to add note');
            }
            const data = await response.json();
            console.log(data);
            setNotes([...notes, data]);
            setTitle('');
            setContent('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="add-note-form">
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name='title'
                    value={title}
                    onChange={handleChange}
                />

                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name='content'
                    value={content}
                    onChange={handleChange}
                />

                <button type="submit">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote