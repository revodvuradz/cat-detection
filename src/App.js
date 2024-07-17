import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Detection from './UploadImage';
import Home from './home'; 
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import CatBreeds from './library/catbreeds';
import CatDisease from './library/catdisease'; 

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Periksa apakah ada pengguna yang sudah login sebelumnya
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
        localStorage.setItem('user', JSON.stringify(currentUser)); // Simpan user ke localStorage
      } else {
        setUser(null);
        setToken('');
        localStorage.removeItem('user'); // Hapus user dari localStorage jika tidak ada pengguna
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* Semua halaman yang memerlukan autentikasi */}
        <Route path="/detection" element={user ? <Detection token={token} /> : <Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library/catbreeds" element={<CatBreeds />} />
        <Route path="/library/catdisease" element={<CatDisease />} />
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
