import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Navbar from './component/navbar';
import Loader from './component/loader/loader';

const Detection = ({ token }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(''); // State untuk menyimpan nama file yang dipilih
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true); // State untuk menunjukkan/menyembunyikan form
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name); // Set nama file saat file dipilih
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('File belum dipilih.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true); // Set loading true sebelum mulai upload
    setShowForm(false); // Sembunyikan form saat proses upload dimulai

    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Token not found in localStorage');
      }

      const response = await axios.post('https://main-api-2ca5j5e3vq-et.a.run.app/api/upload-image', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response);
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading image: ', error);
    } finally {
      setLoading(false); // Set loading false setelah selesai upload atau terjadi error
      setShowForm(true); // Tampilkan kembali form setelah upload selesai
    }
  };

  const handleBackToForm = () => {
    setResult(null); // Set result kembali menjadi null untuk menampilkan form
    setShowForm(true); // Tampilkan kembali form setelah menghapus result
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 min-h-screen flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-7 text-center text-xl max-w-2xl">
          <h2 className="text-2xl md:text-4xl mt-2 text-center">Cat Detection</h2>
          <h2 className="text-yellow-400 text-2xl md:text-2xl mt-2 text-center">Find your cat breed here</h2>
          
          {!result ? ( // Tampilkan form jika result belum ada
            <div>
              {showForm && (
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              )}
              <h2 className="text-yellow-400 text-2xl md:text-2xl mt-2 text-center">Note : This is only 70% - 80% correct detections</h2>
              {!loading ? (
                <button onClick={handleUpload} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Upload
                </button>
              ) : (
                <div className="mt-4 flex justify-center">
                  <Loader />
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8">
              {result.classificationResult === 'Bukan Kucing' ? (
                <div className="text-center">
                  <img src="https://storage.googleapis.com/pawpal/Kucing/anime-no-manga-Favim.com-6189353.png" alt="Bukan Kucing" className="max-w-full h-auto mx-auto" style={{ maxWidth: '500px' }} />
                  <p className="text-xl mt-4 font-semibold">Gambar Bukan Kucing</p>
                  <button onClick={handleBackToForm} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back to Form
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold">Result</h2>
                  <div className="mt-4">
                    <img src={result.imageUrl} alt="Detected Cat" className="max-w-full h-auto mx-auto" style={{ maxWidth: '500px' }} />
                  </div>
                  <div className="mt-4 text-left">
                    <p><strong>Cat Breed:</strong> {result.classificationResult.cat_breed}</p>
                    <p><strong>Description:</strong> {result.classificationResult.description}</p>
                    <p><strong>Diseases:</strong> {result.classificationResult.diseases}</p>
                  </div>
                  <button onClick={handleBackToForm} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back to Form
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detection;
