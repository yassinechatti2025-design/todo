import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import Axisos from 'axios';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const Navigate = useNavigate();  
  
  //handler for submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('All Field Are Required');
      return;
    }
    setLoading(true);
    try {
      await api.post('/notes', { title, content });
      toast.success('Note Created Successfully');
      Navigate('/');
    } catch (error) {
      console.log("Error creating note:", error);
      toast.error('Failed to create note. Please try again.');
    } finally {
      setLoading(false);
    }
   }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auo px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back To Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create new note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label htmlFor="" className="label">
                    <span className='label-text'>
                      Title
                    </span>
                  </label>
                  <input type="text" placeholder='Note Title' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='form-control mb-4'>
                  <label htmlFor="" className="label">
                    <span className='label-text'>
                      Content
                    </span>
                  </label>
                  <textarea placeholder='Write Your Note Here...' className='textarea textarea-bordered h-32' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
