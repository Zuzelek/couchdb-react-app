import React, { useState, useEffect } from 'react';
import localDB from './pouchdb';
import UpdateDocument from './UpdateDocument';

const ListDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [docToEdit, setDocToEdit] = useState(null);  

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const allDocs = await localDB.allDocs({ include_docs: true });
        setDocs(allDocs.rows.map(row => row.doc));
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };
    fetchDocs();
  }, []);

  const deleteDoc = async (doc) => {
    try {
      await localDB.remove(doc);
      setDocs(docs.filter((d) => d._id !== doc._id));
      alert('Document deleted');
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  return (
    <div>
      <h3>Documents</h3>
      <ul>
        {docs.map(doc => (
          <li key={doc._id}>
            <strong>Track:</strong> {doc.Track}<br />
            <strong>Album Name:</strong> {doc["Album Name"]}<br />
            <strong>Artist:</strong> {doc.Artist}<br />
            <strong>Release Date:</strong> {doc["Release Date"]}<br />
            <button onClick={() => setDocToEdit(doc)}>Edit</button> {/* Edit button */}
            <button onClick={() => deleteDoc(doc)}>Delete</button>
          </li>
        ))}
      </ul>

      
      {docToEdit && (
        <UpdateDocument doc={docToEdit} setDocToEdit={setDocToEdit} setDocs={setDocs} />
      )}
    </div>
  );
};

export default ListDocuments;
