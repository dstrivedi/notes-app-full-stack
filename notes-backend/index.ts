import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Notes from './schema/notesSchema';
// import { PrismaClient } from '@prisma/client';

const app = express();
// const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
dotenv.config();

/**
app.get('/notes', async(req, res) => {
    const notes = await prisma.notes.findMany();
    res.json(notes);
});

app.post('/api/notes', async(req, res) => {
    const {title, content} = req.body;

    if(!title || !content) {
        return res.status(400).json({error: 'Title and body are required'});
    }

    try {
        const note = await prisma.notes.create({
            data: {
                title, content
            },
        });
        res.json(note);
    } catch {
        res.status(500).json({error: 'Failed to create note'});
    } finally {
        await prisma.$disconnect();
    }
});

app.delete(`/api/notes/:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const existingNote = await prisma.notes.findUnique({
            where: {
                id: id
            }
        });
        if(!existingNote) {
            return res.status(404).json({error: 'Note not found'});
        } else {
            await prisma.notes.delete({
                where: {
                    id:id
                }
            })
            return res.status(200).json({message: 'Note deleted successfully'});
        }
    } catch (error) {
        return res.status(500).json({error: 'Failed to delete note'});
    }
})
**/


if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

app.get('/notes', async(req, res) => {
    try {
        const notes = await Notes.find();
        if(!notes) {
            return res.status(404).json({error: 'Notes not found'});
        }
        console.log(notes);
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({error: 'Failed to fetch notes'});
    }
});

app.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    try {
        const note = await Notes.create({title, content });
        return res.status(201).json(note);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create note' });
    }
})

app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid note ID' });
    }

  try {
      const deletedNote = await Notes.findByIdAndDelete(id);
      console.log("deletedNote:", deletedNote);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: 'Failed to delete note' });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));