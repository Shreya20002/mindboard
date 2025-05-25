import { useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';
import api from "../lib/axios"; // Importing the axios instance
import toast from 'react-hot-toast'; // Importing Toaster for notifications
import NoteCard from '../components/NoteCard'; // Assuming you have a NoteCard component to display individual notes
import NotesNotFound from '../components/NotesNotFound'; // Assuming you have a component to show when no notes are found

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log("Fetched notes:" ,res.data);
        setNotes(res.data);
        setIsRateLimited(false); // we geting re tp req, hence not rate lim yet
        } catch(error) {
            console.log("Error fetching notes");
            if (error.response?.status === 429) {
                setIsRateLimited(true); // if we get 429 status code, we are rate limited
            } else {
                toast.error("Failed to load notes");
            }
        }
        finally {
            setLoading(false); // Set loading to false after fetching notes
        }
        
    };

    fetchNotes();
  }, []);

  return (
  <div className="min-h-screen">
    <Navbar />

    {isRateLimited && <RateLimitedUI />}

    <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
    </div>
   </div>

  );

};

export default HomePage;

