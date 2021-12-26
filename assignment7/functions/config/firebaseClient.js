const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyBlR5nVGz56FjdSwrHyRpfpl5oTizwPer4',
  authDomain: 'wesopt29-4788e.firebaseapp.com',
  projectId: 'wesopt29-4788e',
  storageBucket: 'wesopt29-4788e.appspot.com',
  messagingSenderId: '673805820923',
  appId: '1:673805820923:web:d0eb9bf392bfd944e4215e',
  measurementId: 'G-R06MQFXVWL',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

module.exports = { firebaseApp, firebaseAuth, firebaseConfig };
