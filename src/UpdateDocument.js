import React, { useState } from 'react';
import localDB from './pouchdb';

const UpdateDocument = ({ doc, setDocToEdit, setDocs }) => {
  const [track, setTrack] = useState(doc.Track);
  const [albumName, setAlbumName] = useState(doc["Album Name"]);
  const [artist, setArtist] = useState(doc.Artist);
  const [releaseDate, setReleaseDate] = useState(doc["Release Date"]);

  const updateDoc = async () => {
    const updatedDoc = {
      ...doc,  // Keeping the id and rev without changing it
      Track: track,
      "Album Name": albumName,
      Artist: artist,
      "Release Date": releaseDate,
    };

    try {
      const response = await localDB.put(updatedDoc);
      console.log('Document updated successfully:', response);
      alert('Document updated');
      setDocToEdit(null);  // Closing the form after updating
      
      // Fetching the documents
      const allDocs = await localDB.allDocs({ include_docs: true });
      setDocs(allDocs.rows.map(row => row.doc));
    } catch (err) {
      console.error('Error updating document:', err);
    }
  };

  return (
    <div>
      <h3>Update Document</h3>
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
      <button onClick={updateDoc}>Save Changes</button>
      <button onClick={() => setDocToEdit(null)}>Cancel</button>
    </div>
  );
};

export default UpdateDocument;
