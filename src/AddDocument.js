import React, { useState } from 'react';
import localDB from './pouchdb';

const AddDocument = () => {
  const [track, setTrack] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const addDoc = async () => {
    const doc = {
      _id: new Date().toISOString(),  
      Track: track,
      "Album Name": albumName,
      Artist: artist,
      "Release Date": releaseDate,
    };

    try {
      await localDB.put(doc);
      alert('Document added');
      setTrack('');
      setAlbumName('');
      setArtist('');
      setReleaseDate('');
    } catch (err) {
      console.error('Error adding document', err);
    }
  };

  return (
    <div>
      <h3>Add Document</h3>
      <input
        type="text"
        value={track}
        onChange={(e) => setTrack(e.target.value)}
        placeholder="Track Name"
      />
      <br />
      <input
        type="text"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        placeholder="Album Name"
      />
      <br />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
      />
      <br />
      <input
        type="date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        placeholder="Release Date"
      />
      <br />
      <button onClick={addDoc}>Add Document</button>
    </div>
  );
};

export default AddDocument;
