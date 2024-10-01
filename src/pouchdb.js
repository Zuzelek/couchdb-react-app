import PouchDB from 'pouchdb';


const localDB = new PouchDB('my_local_db');


const remoteDB = new PouchDB('http://admin:mtu12345@localhost:5984/projectad');
  
localDB.sync(remoteDB, {
  live: true,  
  retry: true  
}).on('change', (info) => {
  console.log('Replication change:', info);
}).on('paused', (err) => {
  console.log('Replication paused. Offline?', err);
}).on('active', () => {
  console.log('Replication resumed');
}).on('denied', (err) => {
  console.error('Replication denied:', err);
}).on('complete', (info) => {
  console.log('Replication complete:', info);
}).on('error', (err) => {
  console.error('Replication error:', err);
});

export default localDB;
