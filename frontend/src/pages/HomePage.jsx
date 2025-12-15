import React, { useEffect } from 'react'
import NavBar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setRateLimited] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
        setRateLimited(false);
        console.log("notes fetched successfully");
      } 
      catch (error) {
        console.log("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("failed to fetch notes.");
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4  mt-6'>
        {loading && <p className='text-center text-primary  py-10'>Loading notes...</p>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid  grid-cols-1  md:grid-cols-2 lg-grid-cols-3 gap-6'>
            {notes.map((note)=> (
             <NoteCard key={note._id} note={note} />
            ))}
          </div>        )}
      </div>
    </div>
  );
};

export default HomePage;
