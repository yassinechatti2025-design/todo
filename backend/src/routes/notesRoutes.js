import express from 'express';
import { createNote, deleteNote, getAllNotes, updateNote , getOneNote} from '../controllers/notesController.js';
const router = express.Router();
// Get all notes
router.get('/', getAllNotes);     

// Create a new note
router.post('/', createNote);

// Update a note
router.put('/:id', updateNote);

// Delete a note
router.delete('/:id', deleteNote);

// Get one note
router.get('/:id', getOneNote);   

export default router;