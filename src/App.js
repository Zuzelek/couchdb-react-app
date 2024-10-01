import React from 'react';
import AddDocument from './AddDocument';
import ListDocuments from './ListDocuments';

const App = () => {
  return (
    <div className="App">
      <h1>Offline-First Music Library</h1>
      <AddDocument />
      <ListDocuments />
    </div>
  );
};

export default App;
