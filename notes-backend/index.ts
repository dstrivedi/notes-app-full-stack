import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

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

app.listen(3000, () => console.log('Server is running on port 3000'));