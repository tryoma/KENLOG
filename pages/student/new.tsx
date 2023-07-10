import { NextPage } from 'next';
import Layout from '../../components/layout';
import { useState } from 'react';
import { useRouter } from 'next/router';

const RecordNew: NextPage<any> = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [youtubeURL, setYoutubeURL] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/record/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, place, youtubeURL }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('New record created:', data);
        router.push('/student');
      } else {
        console.error('Error creating record:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };
  return (
    <>
      <Layout>
        <h1>新規作成</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="place">Place:</label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="youtubeURL">YouTube URL:</label>
            <input
              type="text"
              id="youtubeURL"
              value={youtubeURL}
              onChange={(e) => setYoutubeURL(e.target.value)}
            />
          </div>
          <button type="submit">Create Record</button>
        </form>
      </Layout>
    </>
  );
};

export default RecordNew;
